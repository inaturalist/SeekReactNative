// @flow
import React, { Component } from "react";
import { Animated, View } from "react-native";
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

  // showToast() {
  //   console.log( "showing toast" );
  //   Animated.timing(
  //     this.animatedValue,
  //     {
  //       toValue: 0,
  //       duration: 750
  //     }
  //   ).start( this.hideToast() );
  // }

  // hideToast() {
  //   console.log( "hiding toast" );
  //   setTimeout( () => {
  //     Animated.timing(
  //       this.animatedValue,
  //       {
  //         toValue: -120,
  //         duration: 350
  //       }
  //     ).start();
  //   }, 2000 );
  // }

  checkForNewBadges() {
    const { badgesEarned } = this.state;

    recalculateBadges();

    Realm.open( realmConfig )
      .then( ( realm ) => {
        const earnedBadges = realm.objects( "BadgeRealm" ).filtered( "earned == true" );
        const badges = earnedBadges.sorted( "earnedDate", true );
        console.log( badges, "badges" );
        console.log( badgesEarned, earnedBadges.length, "second calculation of badges" );

        if ( badgesEarned < earnedBadges.length ) {
          this.setState( {
            badge: badges[0]
          } );
        }
      } ).catch( ( e ) => {
        console.log( e, "error" );
      } );
  }

  render() {
    const { navigation } = this.props;
    const { badge } = this.state;

    console.log( badge, "badge in banner" );

    let toast;

    if ( badge ) {
      toast = (
        <BadgeToast
          navigation={navigation}
          badge={badge}
        />
      );
    } else {
      toast = null;
    }

    return (
      // <Animated.View style={[
      //   styles.animatedStyle,
      //   {
      //     transform: [{ translateY: this.animatedValue }]
      //   }
      // ]}
      // >
      <View>
        {toast}
      </View>
      // </Animated.View>
    );
  }
}

export default Banner;
