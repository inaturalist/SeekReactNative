// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import { NavigationEvents } from "react-navigation";
import inatjs from "inaturalistjs";

import styles from "../styles/iNatStats";
import i18n from "../i18n";
import icons from "../assets/icons";
import backgrounds from "../assets/backgrounds";
import logos from "../assets/logos";
import Padding from "./UIComponents/Padding";
import {
  capitalizeNames,
  shuffleList,
  seti18nNumber,
  getRoute
} from "../utility/helpers";
import { localizeAttributions } from "../utility/photoHelpers";
import LoadingWheel from "./UIComponents/LoadingWheel";
import LoginCard from "./UIComponents/LoginCard";
import CustomBackArrow from "./UIComponents/CustomBackArrow";
import GreenText from "./UIComponents/GreenText";
import { getiNatStats } from "../utility/iNatStatsHelpers";
import createUserAgent from "../utility/userAgent";
import HorizontalScroll from "./UIComponents/HorizontalScroll";

type Props = {}

type State = {
  observations: number,
  observers: number,
  photos: Array<Object>,
  route: ?string
};

class iNatStatsScreen extends Component<Props, State> {
  scrollView: ?any

  constructor() {
    super();

    this.state = {
      observations: seti18nNumber( 25000000 ),
      observers: seti18nNumber( 700000 ),
      photos: [],
      route: null
    };
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  fetchProjectPhotos() {
    const params = {
      project_id: 29905,
      photos: true,
      quality_grade: "research",
      lrank: "species",
      hrank: "species",
      locale: i18n.currentLocale()
    };

    const options = { user_agent: createUserAgent() };

    inatjs.observations.search( params, options ).then( ( { results } ) => {
      const taxa = results.map( ( r ) => r.taxon );
      const photos = [];

      taxa.forEach( ( photo ) => {
        const { defaultPhoto } = photo;

        if ( defaultPhoto.license_code && defaultPhoto.license_code !== "cc0" ) {
          if ( defaultPhoto.original_dimensions.width > defaultPhoto.original_dimensions.height ) {
            photos.push( {
              photoUrl: defaultPhoto.medium_url,
              commonName: photo.preferred_common_name
                ? capitalizeNames( photo.preferred_common_name )
                : capitalizeNames( photo.iconic_taxon_name ),
              attribution: localizeAttributions(
                defaultPhoto.attribution,
                defaultPhoto.license_code,
                "iNatStats"
              )
            } );
          }
        }
      } );

      this.setState( {
        photos: shuffleList( photos )
      } );
    } ).catch( ( error ) => {
      console.log( error, "couldn't fetch project photos" );
    } );
  }

  async fetchiNatStats() {
    const { observations, observers } = await getiNatStats();
    const route = await getRoute();

    this.setState( {
      observations: seti18nNumber( observations ),
      observers: seti18nNumber( observers ),
      route
    } );
  }

  render() {
    const {
      observations,
      observers,
      photos,
      route
    } = this.state;

    const photoList = [];

    photos.forEach( ( photo, i ) => {
      if ( i <= 8 ) {
        const image = (
          <View
            key={`image${photo.photoUrl}`}
            style={styles.center}
          >
            <Image
              source={{ uri: photo.photoUrl }}
              style={styles.image}
            />
            <Text style={[styles.missionText, styles.caption]}>
              {photo.commonName}
              {" "}
              {i18n.t( "inat_stats.by" )}
              {" "}
              {photo.attribution}
            </Text>
          </View>
        );
        photoList.push( image );
      }
    } );

    return (
      <SafeAreaView style={styles.safeView}>
        <ScrollView
          ref={( ref ) => { this.scrollView = ref; }}
        >
          <NavigationEvents
            onWillFocus={() => {
              this.fetchiNatStats();
              this.scrollToTop();
              this.fetchProjectPhotos();
            }}
          />
          <StatusBar barStyle="dark-content" />
          <CustomBackArrow green route={route} />
          <View style={styles.logoContainer}>
            <Image source={logos.wordmark} style={styles.logo} />
          </View>
          <View style={styles.headerMargin} />
          <Image source={backgrounds.heatMap} style={styles.heatMap} />
          <View style={styles.missionContainer}>
            <GreenText smaller text="inat_stats.global_observations" />
            <Image source={logos.bird} style={styles.bird} />
            <Text style={styles.numberText}>
              {observations}
              {"+"}
            </Text>
            <GreenText smaller text="inat_stats.naturalists_worldwide" />
            <Text style={styles.numberText}>
              {observers}
              {"+"}
            </Text>
            <Image
              source={icons.iNatExplanation}
              style={styles.explainImage}
            />
            <Text style={styles.missionHeaderText}>
              {i18n.t( "inat_stats.seek_data" )}
            </Text>
            <Text style={styles.missionText}>
              {i18n.t( "inat_stats.about_inat" )}
            </Text>
          </View>
          {photoList.length === 0 ? (
            <View style={[styles.center, styles.photoContainer]}>
              <LoadingWheel color="black" />
            </View>
          ) : <HorizontalScroll photoList={photoList} screen="iNatStats" />}
          <LoginCard screen="iNatStats" />
          <Padding />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default iNatStatsScreen;
