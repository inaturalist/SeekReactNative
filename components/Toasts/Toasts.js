// @flow
import React, { Component } from "react";
import {
  Animated,
  View,
  Dimensions,
  Platform
} from "react-native";
import type { Node } from "react";

import BadgeToast from "./BadgeToast";
import ChallengeToast from "./ChallengeToast";
import { viewStyles } from "../../styles/toasts/badgeToast";

const { height } = Dimensions.get( "window" );

type Props = {
  +badge: ?Object,
  +challenge: ?Object
}

class Toasts extends Component<Props> {
  animatedBadge: any;
  animatedChallenge: any;

  INITIAL_STATE = {
    // Array that signifies which badge toasts have already been shown, stores the earnedDate prop
    badgesShown: new Set(),
    challengesShown: new Set(),
    badgeIsShowing: false
  };

  constructor() {
    super();
    this.state = this.INITIAL_STATE;
    this.animatedBadge = new Animated.Value( -120 );
    this.animatedChallenge = new Animated.Value( -120 );
  }

  componentDidUpdate( prevProps: Object ) {
    const { badge, challenge } = this.props;
    if ( prevProps.badge !== badge ) {
      this.showBadgeToast();
    }
    if ( prevProps.challenge !== challenge ) {
      // If a badge is showing, wait until it's done before showing the challenge toast
      if ( this.state.badgeIsShowing ) {
        setTimeout( () => this.showChallengeToast(), this.entranceSpeed + this.exitSpeed + this.displayTime + 200 );
      } else {
        this.showChallengeToast();
      }
    }
  }

  entranceSpeed = 700;
  exitSpeed = 1000;
  displayTime = 3000;

  entrance = {
    toValue: 0,
    duration: this.entranceSpeed,
    useNativeDriver: true
  };

  exit = {
    toValue: height > 570 ? -170 : -120,
    delay: this.displayTime,
    duration: this.exitSpeed,
    useNativeDriver: true
  };

  showBadgeToast = () => {
    const { badge } = this.props;
    const { badgesShown } = this.state;
    if ( !badge ) {return;}
    if ( badgesShown.has( badge.earnedDate.toString() ) ) {
      return;
    }

    const badgeToast = [
      Animated.timing( this.animatedBadge, this.entrance ),
      Animated.timing( this.animatedBadge, this.exit )
    ];

    const badgeSequence = [badgeToast[0], badgeToast[1]];
    Animated.sequence( badgeSequence ).start();
    this.setState( {
      badgesShown: new Set( badgesShown ).add( badge?.earnedDate.toString() ),
      badgeIsShowing: true
    }, () => {
      setTimeout( () => {
        this.setState( { badgeIsShowing: false } );
      }, this.entranceSpeed + this.exitSpeed + this.displayTime );
    } );
  };

  showChallengeToast = () => {
    const { challenge } = this.props;
    const { challengesShown } = this.state;

    if ( !challenge ) {return;}
    const challengeIdentifier =
      challenge.startedDate.toString() +
      challenge.percentComplete.toString();
    if ( challengesShown.has( challengeIdentifier ) ) {return;}

    const challengeToast = [
      Animated.timing( this.animatedChallenge, this.entrance ),
      Animated.timing( this.animatedChallenge, this.exit )
    ];

    const challengeSequence = [challengeToast[0], challengeToast[1]];
    Animated.sequence( challengeSequence ).start();

    this.setState( {
      challengesShown: new Set( challengesShown ).add( challengeIdentifier )
    } );
  };

  render(): Node {
    const { badge, challenge } = this.props;

    return (
      <View
        style={viewStyles.topContainer}
      >
        {badge && (
          <Animated.View
            style={[
              viewStyles.animatedStyle,
              {
                transform: [{ translateY: this.animatedBadge }]
              }
            ]}
          >
            <BadgeToast badge={badge} />
          </Animated.View>
        )}
        {challenge && (
          <Animated.View
            style={[
              viewStyles.animatedStyle,
              {
                transform: [{ translateY: this.animatedChallenge }]
              }
            ]}
          >
            <ChallengeToast challenge={challenge} />
          </Animated.View>
        )}
      </View>
    );
  }
}

export default Toasts;
