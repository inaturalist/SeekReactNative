// @flow

import React, { useContext } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import type { Node } from "react";

import {
  viewStyles,
  textStyles,
  imageStyles
} from "../../styles/seekYearInReview/seekYearInReview";
import { colors } from "../../styles/global";
import { AppOrientationContext, UserContext } from "../UserContext";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import { useUploadedObservationCount, useFetchStats, useCountObservationsForYear } from "./hooks/seekYearInReviewHooks";
import badgeImages from "../../assets/badges";
import i18n from "../../i18n";
// TODO: refactor into component folder
import SpeciesBadges from "../Achievements/SpeciesBadges";
import HorizontalScroll from "../UIComponents/HorizontalScroll";
import SeekYearInReviewMap from "./SeekYearInReviewMap";
// TODO: this a copy from SpeciesChart. Could be refactored into dumb component with onl styling, and data as prop
import SeekYearInReviewChart from "./SeekYearInReviewChart";
// TODO: this a copy from ChallengeBadges, with only the data fetching hook swaped out. Could be refactored into dumb component with only styling, and data as prop
import SeekYearInReviewChallengeBadges from "./SeekYearInReviewChallengeBadges";
import { SpeciesDetailContext } from "../UserContext";
import StyledText from "../UIComponents/StyledText";
import BannerHeader from "../UIComponents/BannerHeader";
import GreenText from "../UIComponents/GreenText";

const SeekYearInReviewScreen = (): Node => {
  // TODO: replace with real year
  const year = 2022;

  const { setId } = React.useContext( SpeciesDetailContext );
  const navigation = useNavigation();
  const { isTablet } = useContext( AppOrientationContext );
  const { userProfile, login } = useContext( UserContext );
  const count = useUploadedObservationCount( login, userProfile?.login, year );
  // TODO: replace with real year
  const state = useFetchStats( year );
  const countObservationsThisYear = useCountObservationsForYear( year );


  const navToSpecies = ( obs ) => {
    if ( !obs?.taxon?.id ) {return;}
    setId( obs.taxon.id );
      navigation.push( "Drawer", { screen: "Species" } );
  };

  // TODO: replace the photo url from realm with the one given by the useUserPhoto hook
  const renderPhotos = () =>
    state.randomObservations.map( ( obs ) => (
      <Pressable
        key={`image${obs.taxon.defaultPhoto.mediumUrl}`}
        style={viewStyles.center}
        onPress={() => navToSpecies( obs )}
      >
        <Image
          source={{ uri: obs.taxon.defaultPhoto.mediumUrl }}
          style={imageStyles.image}
        />
        {console.log( obs.taxon.defaultPhoto.mediumUrl ) ? null : null}
      </Pressable>
    ) );

  const photoList = renderPhotos();
  return (
    <ScrollWithHeader
      testID="seek-yir-screen-container"
      header="seek_year_in_review.header"
      footer={false}
    >
      {/* TODO: replace all instances of text with StyledText after v2.14.5 is merged */}
      <LinearGradient
        colors={[colors.greenGradientDark, colors.greenGradientLight]}
        style={[viewStyles.header, viewStyles.center, viewStyles.row]}
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
              <GreenText
                style={viewStyles.badgeTextContainer}
                center
                smaller
                noTranslation
                text={state.topThreeSpeciesBadges[1].observationsThisYear}
              />
              <GreenText
                style={viewStyles.badgeTextContainer}
                center
                smaller
                noTranslation
                text={state.topThreeSpeciesBadges[2].observationsThisYear}
              />
            </View>
            <View style={[viewStyles.badgesTextContainer]}>
              <StyledText
                style={[viewStyles.badgeTextContainer, textStyles.bigText]}
              >
                {i18n.t( state.topThreeSpeciesBadges[0].iconicTaxonName )}
              </StyledText>
              <StyledText
                style={[viewStyles.badgeTextContainer, textStyles.bigText]}
              >
                {i18n.t( state.topThreeSpeciesBadges[1].iconicTaxonName )}
              </StyledText>
              <StyledText
                style={[viewStyles.badgeTextContainer, textStyles.bigText]}
              >
                {i18n.t( state.topThreeSpeciesBadges[2].iconicTaxonName )}
              </StyledText>
            </View>
          </>
        )}
            />
          </>
        )}
      </LinearGradient>
      {state.topThreeSpeciesBadges.length > 0 && (
        <>
          <BannerHeader
            text={"top species"}
            // text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()}
          />
          <SpeciesBadges speciesBadges={state.topThreeSpeciesBadges} />
          <View style={[viewStyles.badgesTextContainer]}>
            <GreenText
              style={viewStyles.badgeTextContainer}
              center
              smaller
              noTranslation
              text={state.topThreeSpeciesBadges[0].count}
            />
            <GreenText
              style={viewStyles.badgeTextContainer}
              center
              smaller
              noTranslation
              text={state.topThreeSpeciesBadges[1].count}
            />
            <GreenText
              style={viewStyles.badgeTextContainer}
              center
              smaller
              noTranslation
              text={state.topThreeSpeciesBadges[2].count}
            />
          </View>
          <View style={[viewStyles.badgesTextContainer]}>
            <StyledText
              style={[
                viewStyles.badgeTextContainer,
                textStyles.iconicTaxaNameText
              ]}
            >
              {i18n
                .t( state.topThreeSpeciesBadges[0].iconicTaxonName )
                .toLocaleUpperCase()}
            </StyledText>
            <StyledText
              style={[
                viewStyles.badgeTextContainer,
                textStyles.iconicTaxaNameText
              ]}
            >
              {i18n
                .t( state.topThreeSpeciesBadges[1].iconicTaxonName )
                .toLocaleUpperCase()}
            </StyledText>
            <StyledText
              style={[
                viewStyles.badgeTextContainer,
                textStyles.iconicTaxaNameText
              ]}
            >
              {i18n
                .t( state.topThreeSpeciesBadges[2].iconicTaxonName )
                .toLocaleUpperCase()}
            </StyledText>
          </View>
        </>
      )}
      <BannerHeader
        text={"observations"}
        // text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()}
      />
      <GreenText text="observations by month" />
      <SeekYearInReviewChart data={state.histogram} />
      <GreenText text="observations map" />
      {/* TODO: map needs to have an optimal initial region to show based on the distribution of observation coords */}
      <SeekYearInReviewMap observations={state.observationsThisYear} />
      <GreenText text="iNaturalist" />
      {login && (
        <Text style={textStyles.text}>
          You posted {count} observations to iNaturalist using Seek in {year}.
          Thank you for contributing to our community!
        </Text>
      )}
      <View style={viewStyles.photoMargins}>
        <HorizontalScroll photoList={photoList} />
      </View>
      <BannerHeader
        text={"badges"}
        // text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()}
      />
      {state.countBadgesThisYear && (
        <Text style={textStyles.text}>
          You earned {state.countBadgesThisYear} species and challenge badges
          this year
        </Text>
      )}

      <SeekYearInReviewChallengeBadges />
    </ScrollWithHeader>
  );
};

export default SeekYearInReviewScreen;
