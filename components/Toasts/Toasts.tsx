import React, { useEffect, useState } from "react";
import {
  Animated,
  View,
  Dimensions,
} from "react-native";

import BadgeToast from "./BadgeToast";
import ChallengeToast from "./ChallengeToast";
import { viewStyles } from "../../styles/toasts/badgeToast";

const { height } = Dimensions.get( "window" );

interface Props {
  badge?: {
    earnedDate: Date;
    intlName: string;
    infoText: string;
    earnedIconName: string;
  };
  challenge?: {
    startedDate: Date;
    percentComplete: number;
    index: number;
    name: string;
  };
}

const ENTRANCE_SPEED = 700;
const EXIT_SPEED = 1000;
const DISPLAY_TIME = 3000;

const Toasts = ( {
  badge,
  challenge,
}: Props ) => {
  animatedBadge: Animated.Value;
  animatedChallenge: Animated.Value;


  constructor( props: Props ) {
    super( props );
    this.state = this.INITIAL_STATE;
    this.animatedBadge = new Animated.Value( -120 );
    this.animatedChallenge = new Animated.Value( -120 );
  }

  componentDidUpdate( prevProps: Props ) {
    const { badge, challenge } = this.props;
    if ( prevProps.badge !== badge ) {
      this.showBadgeToast();
    }
    if ( prevProps.challenge !== challenge ) {
      // If a badge is showing, wait until it's done before showing the challenge toast
      if ( this.state.badgeIsShowing ) {
        setTimeout( ( ) => this.showChallengeToast(), this.entranceSpeed + this.exitSpeed + this.displayTime + 200 );
      } else {
        this.showChallengeToast();
      }
    }
  }


  entrance = {
  const [badgesShown, setBadgesShown] = useState<Set<string>>( new Set() )
  const [challengesShown, setChallengesShown] = useState<Set<string>>( new Set() )
  const [badgeIsShowing, setBadgeIsShowing] = useState<boolean>( false )
    toValue: 0,
    duration: ENTRANCE_SPEED,
    useNativeDriver: true,
  };

  exit = {
    toValue: height > 570 ? -170 : -120,
    delay: DISPLAY_TIME,
    duration: EXIT_SPEED,
    useNativeDriver: true,
  };

  const showBadgeToast = ( ) => {
    if ( !badge ) {return;}
    if ( badgesShown.has( badge.earnedDate.toString() ) ) {
      return;
    }

    const badgeToast = [
      Animated.timing( this.animatedBadge, this.entrance ),
      Animated.timing( this.animatedBadge, this.exit ),
    ];

    const badgeSequence = [badgeToast[0], badgeToast[1]];
    Animated.sequence( badgeSequence ).start();
    this.setState( {
      badgesShown: new Set( badgesShown ).add( badge?.earnedDate.toString() ),
      badgeIsShowing: true,
    }, ( ) => {
      setTimeout( ( ) => {
        this.setState( { badgeIsShowing: false } );
      }, this.entranceSpeed + this.exitSpeed + this.displayTime );
    } );
  };

  const showChallengeToast = ( ) => {
    if ( !challenge ) {return;}
    const challengeIdentifier =
      challenge.startedDate.toString() +
      challenge.percentComplete.toString();
    if ( challengesShown.has( challengeIdentifier ) ) {return;}

    const challengeToast = [
      Animated.timing( this.animatedChallenge, this.entrance ),
      Animated.timing( this.animatedChallenge, this.exit ),
    ];

    const challengeSequence = [challengeToast[0], challengeToast[1]];
    Animated.sequence( challengeSequence ).start();

    this.setState( {
      challengesShown: new Set( challengesShown ).add( challengeIdentifier ),
    } );
  };

  return (
    <View
      style={viewStyles.topContainer}
    >
      {badge && (
        <Animated.View
          style={[
            viewStyles.animatedStyle,
            {
              transform: [{ translateY: this.animatedBadge }],
            },
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
              transform: [{ translateY: this.animatedChallenge }],
            },
          ]}
        >
          <ChallengeToast challenge={challenge} />
        </Animated.View>
      )}
    </View>
  );
}

export default Toasts;
