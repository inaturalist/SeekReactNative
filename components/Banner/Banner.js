// @flow
import React, { Component } from "react";
import { Animated, View, Text } from "react-native";
import Realm from "realm";

import BadgeToast from "./BadgeToast";
import styles from "../../styles/banner/badgeToast";
import { recalculateBadges, getBadgesEarned } from "../../utility/badgeHelpers";
import realmConfig from "../../models/index";

type Props = {
  navigation: any
}

class Banner extends Component<Props> {
  constructor() {
    super();

    this.state = {
      badgesEarned: 0,
      badge: null
    };

    this.animatedValue = new Animated.Value( -120 );
  }

  async componentWillMount() {
    const badgesEarned = await getBadgesEarned();
    this.setBadgesEarned( badgesEarned );
    this.checkForNewBadges();
  }

  setBadgesEarned( badgesEarned ) {
    this.setState( { badgesEarned } );
  }

  showToast() {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 950
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

  checkForNewBadges() {
    const { badgesEarned } = this.state;

    recalculateBadges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true" );
        const badges = earnedBadges.sorted( "earnedDate", true );

        if ( badgesEarned < earnedBadges.length ) {
          this.setState( {
            badge: badges[0]
          }, () => this.showToast() );
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
  }

  render() {
    const { navigation } = this.props;
    const { badge } = this.state;

    let toast;

    if ( badge ) {
      toast = (
        <View style={styles.topContainer}>
          <Animated.View style={[
            styles.animatedStyle,
            {
              transform: [{ translateY: this.animatedValue }]
            }
          ]}
          >
            <BadgeToast
              navigation={navigation}
              badge={badge}
            />
          </Animated.View>
        </View>
      );
    } else {
      toast = (
        <View style={{ zIndex: 1 }}>
          <Animated.View style={[
            styles.animatedStyle,
            {
              transform: [{ translateY: this.animatedValue }]
            }
          ]}
          >
            <Text>this is a toast</Text>
          </Animated.View>
        </View>
      );
      // toast = null;
    }

    return (
      <View>
        {toast}
      </View>
    );
  }
}

export default Banner;
