// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
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
import Padding from "./Padding";
import { capitalizeNames, shuffleList } from "../utility/helpers";
import LoadingWheel from "./LoadingWheel";
import { fetchAccessToken, removeAccessToken } from "../utility/loginHelpers";

type Props = {
  navigation: any
}

class iNatStatsScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      observations: i18n.toNumber( 23000000, { precision: 0 } ),
      observers: i18n.toNumber( 660000, { precision: 0 } ),
      photos: [],
      loading: true,
      isLoggedIn: false
    };
  }

  async getLoggedIn() {
    const login = await fetchAccessToken();
    if ( login ) {
      this.setLoggedIn( true );
    }
  }

  setLoggedIn( isLoggedIn ) {
    this.setState( { isLoggedIn } );
  }

  async logUserOut() {
    const loggedOut = await removeAccessToken();
    if ( loggedOut === null ) {
      this.setLoggedIn( false );
    }
  }

  scrollToTop() {
    this.scrollView.scrollTo( {
      x: 0, y: 0, animated: Platform.OS === "android"
    } );
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

    inatjs.observations.search( params ).then( ( { results } ) => {
      const taxa = results.map( r => r.taxon );
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
              attribution: defaultPhoto.attribution
            } );
          }
        }
      } );

      this.setState( {
        photos: shuffleList( photos ),
        loading: false
      } );
    } ).catch( ( error ) => {
      console.log( error, "couldn't fetch project photos" );
    } );
  }

  render() {
    const {
      observations,
      observers,
      photos,
      loading,
      isLoggedIn
    } = this.state;
    const { navigation } = this.props;

    const photoList = [];

    photos.forEach( ( photo, i ) => {
      if ( i <= 8 ) {
        const image = (
          <View
            key={`image${photo.photoUrl}${i}`}
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
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.scrollToTop();
            this.getLoggedIn();
            this.fetchProjectPhotos();
          }}
        />
        <SafeAreaView style={styles.safeView}>
          <StatusBar barStyle="dark-content" />
          <ScrollView
            ref={( ref ) => { this.scrollView = ref; }}
          >
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={styles.touchable}
                onPress={() => navigation.goBack()}
                style={{ padding: 5 }}
              >
                <Image
                  source={icons.backButtonGreen}
                  style={styles.backButton}
                />
              </TouchableOpacity>
              <Image style={styles.logo} source={logos.iNat} />
              <View />
            </View>
            <Image source={backgrounds.heatMap} style={styles.heatMap} />
            <View style={styles.missionContainer}>
              <Text style={styles.forestGreenText}>
                {i18n.t( "inat_stats.global_observations" ).toLocaleUpperCase()}
              </Text>
              <Image source={logos.bird} style={styles.iNatLogo} />
              <Text style={styles.numberText}>
                {observations}
                {"+"}
              </Text>
              <Text style={styles.forestGreenText}>
                {i18n.t( "inat_stats.naturalists_worldwide" ).toLocaleUpperCase()}
              </Text>
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
            {loading ? (
              <View style={[styles.center, styles.photoContainer]}>
                <LoadingWheel color="black" />
              </View>
            ) : (
              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator
                  pagingEnabled
                  indicatorStyle="white"
                  contentContainerStyle={styles.photoContainer}
                >
                  {photoList}
                </ScrollView>
                <Image source={icons.swipeLeft} style={styles.leftArrow} />
                <Image source={icons.swipeRight} style={styles.rightArrow} />
              </View>
            )}
            <Text style={styles.italicText}>
              {isLoggedIn
                ? i18n.t( "inat_stats.logged_in" )
                : i18n.t( "inat_stats.thanks" )
              }
            </Text>
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <TouchableOpacity
                style={styles.greenButton}
                onPress={() => {
                  if ( isLoggedIn ) {
                    this.logUserOut();
                  } else {
                    navigation.navigate( "LoginOrSignup" );
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  {isLoggedIn
                    ? i18n.t( "inat_stats.sign_out" ).toLocaleUpperCase()
                    : i18n.t( "inat_stats.join" ).toLocaleUpperCase()
                  }
                </Text>
              </TouchableOpacity>
            </View>
            <Padding />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default iNatStatsScreen;
