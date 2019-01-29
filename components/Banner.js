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
import { recalculateBadges } from "../utility/badgeHelpers";
import realmConfig from "../models/index";

type Props = {
  bannerText: string,
  id: number,
  main: boolean
}

class Banner extends Component<Props> {
  constructor( {
    bannerText,
    id,
    main
  }: Props ) {
    super();

    this.state = {
      bannerText,
      id,
      iconicTaxonId: 0,
      main,
      badgeIcon: null
    };

    this.animatedValue = new Animated.Value( -120 );
    this.secondAnimatedValue = new Animated.Value( -200 );
  }

  componentDidMount() {
    this.resetBadgeIcon();
    this.fetchBadgeCount();
    this.fetchTaxonId();
    this.showToast();
  }

  fetchBadgeCount() {
    let lastBadgeEarned;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" ).sorted( [["earnedDate", true], ["index", false]] );
        const lastBadge = badges.slice( 0, 1 );
        const { earnedIconName } = lastBadge[0];

        lastBadgeEarned = earnedIconName;
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to fetch taxon id, error: ", err );
      } );

    recalculateBadges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" ).sorted( [["earnedDate", true], ["index", false]] );
        const lastBadge = badges.slice( 0, 1 );
        const { earnedIconName } = lastBadge[0];

        if ( lastBadgeEarned !== earnedIconName ) {
          this.setState( {
            badgeIcon: earnedIconName
          }, () => this.showSecondToast() );
        }
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to fetch taxon id, error: ", err );
      } );
  }

  fetchTaxonId() {
    const { id } = this.state;

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = realm.objects( "ObservationRealm" );
        const seenTaxa = observations.filtered( `taxon.id == ${id}` );
        const { iconicTaxonId } = seenTaxa[0].taxon;
        this.setState( {
          iconicTaxonId
        } );
      } ).catch( ( err ) => {
        // console.log( "[DEBUG] Failed to fetch taxon id, error: ", err );
      } );
  }

  showToast() {
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

  resetBadgeIcon() {
    this.setState( {
      badgeIcon: null
    } );
  }

  render() {
    const {
      bannerText,
      iconicTaxonId,
      main,
      badgeIcon
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
            <Text style={styles.text}>{bannerText}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {banner}
        { badgeIcon ? (
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
                source={badgeImages[badgeIcon]}
                style={styles.badgeBannerImage}
              />
              <Text style={[styles.text, styles.mainText]}>Badge earned!</Text>
            </View>
          </Animated.View>
        ) : null }
      </View>
    );
  }
}

export default Banner;
