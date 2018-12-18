// @flow
import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Animated
} from "react-native";
import Realm from "realm";

import styles from "../styles/banner";
import speciesImages from "../assets/species";
import badgeImages from "../assets/badges";
import { recalculateBadges } from "../utility/helpers";
import realmConfig from "../models/index";

type Props = {
  bannerText: string,
  badgeEarned: boolean,
  taxaName: string,
  id: number,
  main: boolean
}

class Banner extends Component {
  constructor( {
    bannerText,
    badgeEarned,
    taxaName,
    id,
    main
  }: Props ) {
    super();

    this.state = {
      bannerText,
      badgeEarned,
      secondBannerText: "Badge earned!",
      taxaName,
      id,
      iconicTaxonId: 0,
      main,
      lastEarnedBadgeIcon: null
    };

    this.animatedValue = new Animated.Value( -120 );
    this.secondAnimatedValue = new Animated.Value( -200 );
  }

  componentDidMount() {
    this.showToast();
    this.showSecondToast();
  }

  fetchTaxonId() {
    const { taxaName, id } = this.state;

    recalculateBadges();

    if ( taxaName ) {
      Realm.open( realmConfig )
        .then( ( realm ) => {
          const observations = realm.objects( "ObservationRealm" );
          const seenTaxa = observations.filtered( `taxon.id == ${id}` );
          const { iconicTaxonId } = seenTaxa[0].taxon;
          const badges = realm.objects( "BadgeRealm" ).sorted( [["earnedDate", true], ["index", false]] );
          const lastEarnedBadge = badges.slice( 0, 1 );
          const lastEarnedBadgeIcon = lastEarnedBadge[0].earnedIconName;
          this.setState( {
            iconicTaxonId,
            lastEarnedBadgeIcon
          } );
        } ).catch( ( err ) => {
          console.log( "[DEBUG] Failed to fetch taxon id, error: ", err );
        } );
    }
  }


  showToast() {
    this.fetchTaxonId();

    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 750
      }
    ).start( this.hideToast() );
  }

  hideToast() {
    setTimeout( () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: -120,
          duration: 350
        }
      ).start();
    }, 2000 );
  }

  showSecondToast() {
    Animated.timing(
      this.secondAnimatedValue,
      {
        toValue: 0,
        duration: 750
      }
    ).start( this.hideSecondToast() );
  }

  hideSecondToast() {
    setTimeout( () => {
      Animated.timing(
        this.secondAnimatedValue,
        {
          toValue: -200,
          duration: 350
        }
      ).start();
    }, 2000 );
  }

  render() {
    const {
      bannerText,
      badgeEarned,
      secondBannerText,
      iconicTaxonId,
      main,
      lastEarnedBadgeIcon
    } = this.state;

    let banner;

    if ( main ) {
      banner = (
        <Animated.View style={[
          styles.animatedStyle,
          {
            transform: [{ translateY: this.animatedValue }]
          }
        ]}
        >
          <View style={[styles.row, styles.animatedRow]}>
            <Image
              source={speciesImages[iconicTaxonId.toString()]}
              style={styles.mainBannerImage}
            />
            <Text style={[styles.text, styles.mainText]}>{bannerText}</Text>
          </View>
        </Animated.View>
      );
    } else {
      banner = (
        <View style={styles.banner}>
          <View style={styles.row}>
            <Image
              source={require( "../assets/results/icn-results-match.png" )}
              style={styles.speciesBannerImage}
            />
            <Text style={styles.text}>{bannerText}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {banner}
        { badgeEarned ? (
          <Animated.View style={[
            styles.animatedStyle,
            styles.secondAnimatedStyle,
            {
              transform: [{ translateY: this.secondAnimatedValue }]
            }
          ]}
          >
            <View style={[styles.row, styles.animatedRow]}>
              <Image
                source={badgeImages[lastEarnedBadgeIcon]}
                style={styles.badgeBannerImage}
              />
              <Text style={[styles.text, styles.mainText]}>{secondBannerText}</Text>
            </View>
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

export default Banner;
