// @flow
import React, { Component } from "react";
import {
  Animated,
  View,
  Dimensions,
  Platform
} from "react-native";

import BadgeToast from "./BadgeToast";
import ChallengeToast from "./ChallengeToast";
import styles from "../../styles/toasts/badgeToast";
import { checkForNewBadges } from "../../utility/badgeHelpers";
import { checkForChallengesCompleted } from "../../utility/challengeHelpers";

const { height } = Dimensions.get( "window" );

// type Props = {
//   +badge: ?Object,
//   +incompleteChallenge: ?Object
// }

class Toasts extends Component {
  animatedBadge: ?any

  animatedChallenge: ?any

  constructor() {
    super();

    this.state = {
      badge: null,
      incompleteChallenge: null
    };

    this.animatedBadge = new Animated.Value( -120 );
    this.animatedChallenge = new Animated.Value( -130 );
  }

  componentDidMount() {
    this.checkForBadge();
  }
  // componentDidUpdate( prevProps: Object ) {
  //   const { badge, incompleteChallenge } = this.props;
  //   if ( prevProps.badge !== badge ) {
  //     this.showToasts();
  //   }
  //   if ( prevProps.incompleteChallenge !== incompleteChallenge ) {
  //     this.showToasts();
  //   }
  // }

  checkForBadge() {
    checkForNewBadges().then( ( { latestBadge } ) => {
      if ( latestBadge ) {
        this.setState( { badge: latestBadge }, () => this.checkForChallenge() );
      } else {
        this.checkForChallenge();
      }
    } ).catch( () => console.log( "could not check for badges" ) );
  }

  checkForChallenge() {
    const { badge, incompleteChallenge } = this.state;
    checkForChallengesCompleted().then( ( { challengeInProgress } ) => {
      if ( challengeInProgress ) {
        this.setState( { incompleteChallenge: challengeInProgress }, () => {
          if ( badge || incompleteChallenge ) {
            this.showToasts();
          }
        } );
      } else {
        this.showToasts();
      }
    } ).catch( () => console.log( "could not check for challenges" ) );
  }

  showToasts() {
    const { badge, incompleteChallenge } = this.state;
    console.log( "showing toasts badge", badge );
    console.log( "showing challenge progress", incompleteChallenge );

    const entranceSpeed = 700;
    const exitSpeed = 1000;
    const displayTime = 3000;

    const badgeToast = [
      Animated.timing(
        this.animatedBadge, {
          toValue: 0,
          duration: entranceSpeed
        }
      ),
      Animated.timing(
        this.animatedBadge, {
          toValue: height > 570 ? -170 : -120,
          delay: displayTime,
          duration: exitSpeed
        }
      )];

    const challengeToast = [
      Animated.timing(
        this.animatedChallenge, {
          toValue: 0,
          duration: entranceSpeed
        }
      ),
      Animated.timing(
        this.animatedChallenge, {
          toValue: height > 570 ? -180 : -130,
          delay: displayTime,
          duration: exitSpeed
        }
      )
    ];

    if ( incompleteChallenge && !badge ) {
      Animated.sequence( [
        challengeToast[0],
        challengeToast[1]
      ] ).start();
    } else {
      Animated.sequence( [
        badgeToast[0],
        badgeToast[1],
        challengeToast[0],
        challengeToast[1]
      ] ).start();
    }
  }

  render() {
    const { badge, incompleteChallenge } = this.state;

    return (
      <View style={Platform.OS === "ios" ? styles.topContainer : null}>
        {badge && (
          <Animated.View style={[
            styles.animatedStyle, {
              transform: [{ translateY: this.animatedBadge }]
            }
          ]}
          >
            <BadgeToast
              badge={badge}
            />
          </Animated.View>
        )}
        {incompleteChallenge && (
          <Animated.View style={[
            styles.animatedStyle, {
              transform: [{ translateY: this.animatedChallenge }]
            }
          ]}
          >
            <ChallengeToast
              challenge={incompleteChallenge}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

export default Toasts;
