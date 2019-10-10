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

const { height } = Dimensions.get( "window" );

type Props = {
  +navigation: any,
  +badge: ?Object,
  +incompleteChallenge: ?Object
}

class Toasts extends Component<Props> {
  constructor() {
    super();

    this.animatedBadge = new Animated.Value( -120 );
    this.animatedChallenge = new Animated.Value( -130 );
  }

  componentDidUpdate( prevProps ) {
    const { badge, incompleteChallenge } = this.props;
    if ( prevProps.badge !== badge ) {
      this.showToasts();
    }
    if ( prevProps.incompleteChallenge !== incompleteChallenge ) {
      this.showToasts();
    }
  }

  showToasts() {
    const { badge, incompleteChallenge } = this.props;

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
    const { navigation, badge, incompleteChallenge } = this.props;

    return (
      <View style={Platform.OS === "ios" ? styles.topContainer : null}>
        {badge ? (
          <Animated.View style={[
            styles.animatedStyle, {
              transform: [{ translateY: this.animatedBadge }]
            }
          ]}
          >
            <BadgeToast
              badge={badge}
              navigation={navigation}
            />
          </Animated.View>
        ) : null}
        {incompleteChallenge ? (
          <Animated.View style={[
            styles.animatedStyle, {
              transform: [{ translateY: this.animatedChallenge }]
            }
          ]}
          >
            <ChallengeToast
              challenge={incompleteChallenge}
              navigation={navigation}
            />
          </Animated.View>
        ) : null}
      </View>
    );
  }
}

export default Toasts;
