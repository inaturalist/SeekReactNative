// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
  FlatList,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";
import inatjs from "inaturalistjs";

import styles from "../styles/iNatStats";
import i18n from "../i18n";
import icons from "../assets/icons";
import backgrounds from "../assets/backgrounds";
import logos from "../assets/logos";
import Padding from "./UIComponents/Padding";
import { capitalizeNames, shuffleList, seti18nNumber } from "../utility/helpers";
import { localizeAttributions } from "../utility/photoHelpers";
import LoadingWheel from "./UIComponents/LoadingWheel";
import LoginCard from "./UIComponents/LoginCard";
import BackArrow from "./UIComponents/BackArrow";
import GreenText from "./UIComponents/GreenText";
import { getiNatStats } from "../utility/iNatStatsHelpers";
import { dimensions } from "../styles/global";
import createUserAgent from "../utility/userAgent";

type Props = {}

type State = {
  observations: number,
  observers: number,
  photos: Array<Object>,
  scrollIndex: number,
  scrollOffset: number
};

class iNatStatsScreen extends Component<Props, State> {
  scrollView: ?any

  flatList: ?any

  constructor() {
    super();

    this.state = {
      observations: seti18nNumber( 25000000 ),
      observers: seti18nNumber( 700000 ),
      photos: [],
      scrollIndex: 0,
      scrollOffset: 0
    };
  }

  setIndex( scrollIndex: number, scrollOffset: number ) {
    this.setState( {
      scrollIndex,
      scrollOffset
    } );
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

    this.setState( {
      observations: seti18nNumber( observations ),
      observers: seti18nNumber( observers )
    } );
  }

  scrollRight() {
    const { scrollIndex, scrollOffset } = this.state;

    const nextIndex = scrollIndex < 8 ? scrollIndex + 1 : 8;
    const nextOffset = scrollOffset + dimensions.width;

    if ( this.flatList ) {
      this.flatList.scrollToIndex( {
        index: nextIndex, animated: true
      } );
      this.setIndex( nextIndex, nextOffset );
    }
  }

  scrollLeft() {
    const { scrollIndex, scrollOffset } = this.state;

    const prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;
    const prevOffset = scrollOffset - dimensions.width;

    if ( this.flatList ) {
      this.flatList.scrollToIndex( {
        index: prevIndex, animated: true
      } );
      this.setIndex( prevIndex, prevOffset );
    }
  }

  calculateScrollIndex( e: Object ) {
    const { scrollOffset, scrollIndex } = this.state;
    const { contentOffset } = e.nativeEvent;

    let nextIndex;
    let prevIndex;

    if ( contentOffset.x > scrollOffset ) {
      nextIndex = scrollIndex < 8 ? scrollIndex + 1 : 8;
      this.setIndex( nextIndex, contentOffset.x );
    } else {
      prevIndex = scrollIndex > 0 ? scrollIndex - 1 : 0;
      this.setIndex( prevIndex, contentOffset.x );
    }
  }

  render() {
    const {
      observations,
      observers,
      photos
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
          <BackArrow green />
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
          ) : (
            <View>
              <FlatList
                ref={( ref ) => { this.flatList = ref; }}
                bounces={false}
                contentContainerStyle={styles.photoContainer}
                data={photoList}
                getItemLayout={( data, index ) => (
                  // skips measurement of dynamic content for faster loading
                  {
                    length: ( dimensions.width ),
                    offset: ( dimensions.width ) * index,
                    index
                  }
                )}
                horizontal
                indicatorStyle="white"
                initialNumToRender={1}
                onScrollEndDrag={( e ) => this.calculateScrollIndex( e )}
                pagingEnabled
                renderItem={( { item } ) => item}
                showsHorizontalScrollIndicator
              />
              <TouchableOpacity
                accessibilityLabel={i18n.t( "accessibility.scroll_left" )}
                accessible
                onPress={() => this.scrollLeft()}
                style={styles.leftArrow}
              >
                <Image source={icons.swipeLeft} />
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityLabel={i18n.t( "accessibility.scroll_right" )}
                accessible
                onPress={() => this.scrollRight()}
                style={styles.rightArrow}
              >
                <Image source={icons.swipeRight} />
              </TouchableOpacity>
            </View>
          )}
          <LoginCard screen="iNatStats" />
          <Padding />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default iNatStatsScreen;
