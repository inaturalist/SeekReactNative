// @flow

import React, { useContext } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { Node } from "react";

import {
  viewStyles,
  textStyles,
  imageStyles
} from "../../styles/seekYearInReview/seekYearInReview";
import { AppOrientationContext, UserContext } from "../UserContext";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import { useFetchObservationCount, useFetchStats, useCountObservationsForYear } from "./hooks/seekYearInReviewHooks";
import badgeImages from "../../assets/badges";
import i18n from "../../i18n";
// TODO: refactor into component folder
import SpeciesBadges from "../Achievements/SpeciesBadges";
import HorizontalScroll from "../UIComponents/HorizontalScroll";
import SeekYearInReviewMap from "./SeekYearInReviewMap";
// TODO: this a copy from SpeciesChart. Could be refactored into dumb component with onl styling, and data as prop
import SeekYearInReviewChart from "./SeekYearInReviewChart";

const SeekYearInReviewScreen = (): Node => {
  const { setId } = React.useContext( SpeciesDetailContext );
  const navigation = useNavigation();
  const { isTablet } = useContext( AppOrientationContext );
  const { userProfile, login } = useContext( UserContext );
  const count = useFetchObservationCount( login, userProfile?.login );
  // TODO: replace with real year
  const state = useFetchStats( 2022 );
  const countObservationsThisYear = useCountObservationsForYear( 2022 );

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
    <ScrollWithHeader header="seek_year_in_review.header" footer={false}>
      <View
        style={[
          viewStyles.textContainer,
          isTablet && viewStyles.tabletContainer
        ]}
      />
      {/* TODO: replace all instances of text with StyledText after v2.14.5 is merged */}
      {/* {countObservationsThisYear > 0 && ( */}
      {
        <Text style={textStyles.text}>
          {countObservationsThisYear} observations made this year
        </Text>
      }
      {login && (
        <Text style={textStyles.text}>
          {count} observations posted to iNaturalist this year
        </Text>
      )}
      {state.level && (
        <>
          <Image
            source={badgeImages[state.level.earnedIconName]}
            style={imageStyles.levelImage}
          />
          <View style={viewStyles.textContainer}>
            <Text style={textStyles.headerText}>
              {i18n.t( state.level.intlName ).toLocaleUpperCase()}
            </Text>
          </View>
        </>
      )}
      {state.topThreeIconicTaxonIds && (
        <Text style={textStyles.text}>
          [{state.topThreeIconicTaxonIds}] top three taxa IDs
        </Text>
      )}
      <SpeciesBadges speciesBadges={state.topThreeSpeciesBadges} />
      {state.countBadgesThisYear && (
        <Text style={textStyles.text}>
          {state.countBadgesThisYear} badges earned this year
        </Text>
      )}
      {state.randomObservations &&
        state.randomObservations.map( ( obs ) => (
          <Text style={textStyles.text}>
            {obs.uuidString} is a random observation
          </Text>
        ) )}
      <View style={viewStyles.photoMargins}>
        <HorizontalScroll photoList={photoList} />
      </View>
      <SeekYearInReviewMap observations={state.observationsThisYear} />
      <SeekYearInReviewChart data={state.histogram} />
    </ScrollWithHeader>
  );
};

export default SeekYearInReviewScreen;
