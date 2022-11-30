// @flow

import React, { useContext, useState, useCallback } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import type { Node } from "react";

import {
  viewStyles,
  textStyles,
  imageStyles
} from "../../styles/seekYearInReview/seekYearInReview";
import { colors } from "../../styles/global";
import { AppOrientationContext, UserContext } from "../UserContext";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import {
  useFetchStats,
  useCountObservationsForYear,
  useFetchChallengesForYear
} from "./hooks/seekYearInReviewHooks";
import {
  useUploadedObservationCount
} from "../../utility/customHooks";

import badgeImages from "../../assets/badges";
import i18n from "../../i18n";
// TODO: refactor into component folder
import SpeciesBadges from "../Achievements/SpeciesBadges";
import SeekYearInReviewMap from "./SeekYearInReviewMap";
// TODO: this a copy from SpeciesChart. Could be refactored into dumb component with onl styling, and data as prop
import SeekYearInReviewChart from "./SeekYearInReviewChart";
// TODO: this a copy from ChallengeBadges, with only the data fetching hook swaped out. Could be refactored into dumb component with only styling, and data as prop
import SeekYearInReviewChallengeBadges from "./SeekYearInReviewChallengeBadges";
import StyledText from "../UIComponents/StyledText";
import BannerHeader from "../UIComponents/BannerHeader";
import GreenText from "../UIComponents/GreenText";
import SeekYearInReviewPhotos from "./SeekYearInReviewPhotos";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import Modal from "../UIComponents/Modals/Modal";
import LevelModal from "../Modals/LevelModal";

const SubstringStyledText = ( { text, greenText } ) => {
  // Split the text into an array using whitespace
  if ( typeof text !== "string" ) {
    return null;
  }
  const substringsArray = text.split( " " );
  return (
    <StyledText style={textStyles.bigText}>
      {substringsArray.map( ( t, index ) => {
        if ( greenText && t === greenText.toString() ) {
          return <GreenText key={`${t}_${index}`} noTranslation text={`${t} `} />;
        }
        return (
          <StyledText key={`${t}_${index}`} style={textStyles.bigText}>
            {index === substringsArray.length ? t : `${t} `}
          </StyledText>
        );
      } )}
    </StyledText>
  );
};

const SeekYearInReviewScreen = (): Node => {
  // The year to show stats for
  const now = new Date();
  let year = now.getFullYear();
  // If it's January, show stats for the previous year
  if ( now.getMonth() === 0 ) {
    year -= 1;
  }

  const { navigate } = useNavigation();

  const [showModal, setModal] = useState( false );

  const openModal = useCallback( () => setModal( true ), [] );
  const closeModal = useCallback( () => setModal( false ), [] );

  const { isTablet } = useContext( AppOrientationContext );
  const { userProfile, login } = useContext( UserContext );

  const count = useUploadedObservationCount( login, userProfile?.login, year );
  const state = useFetchStats( year );
  const countObservationsThisYear = useCountObservationsForYear( year );
  const {challengeBadges, challengeCount} = useFetchChallengesForYear( year );

  const navToDonation = () =>
    navigate( "Donation", { utmCampaign: `${year}-year-in-review` } );

  const observationsWithLocation = state?.observationsThisYear.filter(
    ( observation ) => observation.latitude && observation.longitude
  );

  const renderModalContent = (
    <LevelModal
      level={state.level}
      screen="achievements"
      speciesCount={state.speciesCount}
      closeModal={closeModal}
    />
  );

  return (
    <ScrollWithHeader
      testID="seek-yir-screen-container"
      header="seek_year_in_review.header"
      footer
    >
      {!!state.level && countObservationsThisYear !== null && (
        <TouchableOpacity onPress={openModal}>
          <Modal
            showModal={showModal}
            closeModal={closeModal}
            modal={renderModalContent}
          />

          <LinearGradient
            colors={[colors.greenGradientDark, colors.greenGradientLight]}
            style={[viewStyles.header, viewStyles.center, viewStyles.row]}
          >
            <View style={viewStyles.levelTextContainer}>
              <StyledText style={textStyles.lightText}>
                {i18n
                  .t( "seek_year_in_review.in_year_observed", { year } )
                  .toLocaleUpperCase()}
              </StyledText>
              <StyledText style={textStyles.headerText}>
                {i18n
                  .t( "seek_year_in_review.x_new_species", {
                    count: countObservationsThisYear
                  } )
                  .toLocaleUpperCase()}
              </StyledText>
            </View>
            <Image
              source={badgeImages[state.level.earnedIconName]}
              style={imageStyles.levelImage}
            />
          </LinearGradient>
        </TouchableOpacity>
      )}
      <View
        style={[
          viewStyles.textContainer,
          isTablet && viewStyles.tabletContainer
        ]}
      >
        {state.topThreeSpeciesBadges.length > 0 && (
          <>
            <BannerHeader
              text={i18n
                .t( "seek_year_in_review.top_species" )
                .toLocaleUpperCase()}
            />
            <SpeciesBadges speciesBadges={state.topThreeSpeciesBadges} />
            <View style={[viewStyles.badgesTextContainer]}>
              <GreenText
                style={viewStyles.badgeTextContainer}
                center
                smaller
                noTranslation
                text={state.topThreeSpeciesBadges[0].observationsThisYear}
              />
              {state.topThreeSpeciesBadges[1] && (
                <GreenText
                  style={viewStyles.badgeTextContainer}
                  center
                  smaller
                  noTranslation
                  text={state.topThreeSpeciesBadges[1].observationsThisYear}
                />
              )}
              {state.topThreeSpeciesBadges[2] && (
                <GreenText
                  style={viewStyles.badgeTextContainer}
                  center
                  smaller
                  noTranslation
                  text={state.topThreeSpeciesBadges[2].observationsThisYear}
                />
              )}
            </View>
            <View style={[viewStyles.badgesTextContainer]}>
              <StyledText
                style={[viewStyles.badgeTextContainer, textStyles.bigText]}
              >
                {i18n.t( state.topThreeSpeciesBadges[0].iconicTaxonName )}
              </StyledText>
              {state.topThreeSpeciesBadges[1] && (
                <StyledText
                  style={[viewStyles.badgeTextContainer, textStyles.bigText]}
                >
                  {i18n.t( state.topThreeSpeciesBadges[1].iconicTaxonName )}
                </StyledText>
              )}
              {state.topThreeSpeciesBadges[2] && (
                <StyledText
                  style={[viewStyles.badgeTextContainer, textStyles.bigText]}
                >
                  {i18n.t( state.topThreeSpeciesBadges[2].iconicTaxonName )}
                </StyledText>
              )}
            </View>
          </>
        )}
        <BannerHeader
          text={i18n.t( "seek_year_in_review.observations" ).toLocaleUpperCase()}
        />
        <GreenText text="seek_year_in_review.observations_by_month" />
        <View style={viewStyles.smallDivider} />
        <SeekYearInReviewChart data={state.histogram} />
        <View style={viewStyles.divider} />
        {observationsWithLocation.length > 0 && (
          <>
            <GreenText text="seek_year_in_review.observations_map" />
            <View style={viewStyles.smallDivider} />
            <SeekYearInReviewMap
              year={year}
              observations={observationsWithLocation}
            />
            <View style={viewStyles.divider} />
          </>
        )}
        {login && (
          <>
            <GreenText text="seek_year_in_review.iNaturalist" />
            <View style={viewStyles.smallDivider} />
            <SubstringStyledText
              text={i18n.t(
                "seek_year_in_review.x_uploaded_observations_text_1",
                {
                  count,
                  year
                }
              )}
              greenText={count}
            />
            {!!count && (
              <>
                <View style={viewStyles.smallDivider} />
                <StyledText style={textStyles.bigText}>
                  {i18n.t( "seek_year_in_review.uploaded_observations_text_2" )}
                </StyledText>
              </>
            )}
          </>
        )}
      </View>
      <View style={viewStyles.divider} />
      <SeekYearInReviewPhotos observations={state.randomObservations} />
      <View
        style={[
          viewStyles.textContainer,
          isTablet && viewStyles.tabletContainer
        ]}
      >
        {challengeCount > 0 ? (
          <>
            <BannerHeader
              text={i18n
                .t( "seek_year_in_review.challenges" )
                .toLocaleUpperCase()}
            />
            <SubstringStyledText
              text={i18n.t( "seek_year_in_review.x_challenges_earned_text", {
                count: challengeCount,
                year
              } )}
              greenText={challengeCount}
            />
            <View style={viewStyles.divider} />
            <SeekYearInReviewChallengeBadges
              challengeBadges={challengeBadges}
            />
          </>
        ) : (
          <View style={viewStyles.divider} />
        )}
        <StyledText style={textStyles.text}>
          {i18n.t( "seek_year_in_review.thank_you" )}
        </StyledText>
        <View style={viewStyles.smallDivider} />
        <StyledText style={textStyles.text}>
          {i18n.t( "seek_year_in_review.consider_donation" )}
        </StyledText>
        <View style={viewStyles.divider} />
        <GreenButton text="settings.donate" handlePress={navToDonation} />
      </View>
    </ScrollWithHeader>
  );
};

export default SeekYearInReviewScreen;
