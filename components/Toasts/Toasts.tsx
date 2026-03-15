import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

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
  const animatedBadge = useSharedValue( -120 );
  const animatedBadgeStyle = useAnimatedStyle( () => ( {
    transform: [{ translateY: animatedBadge.value }],
  } ) );
  const animatedChallenge = useSharedValue( -120 );
  const animatedChallengeStyle = useAnimatedStyle( () => ( {
    transform: [{ translateY: animatedChallenge.value }],
  } ) );


  const [badgesShown, setBadgesShown] = useState<Set<string>>( new Set() )
  const [challengesShown, setChallengesShown] = useState<Set<string>>( new Set() )
  const [badgeIsShowing, setBadgeIsShowing] = useState<boolean>( false )

  // componentDidUpdate( prevProps: Props ) {
  //   if ( prevProps.badge !== badge ) {
  //     this.showBadgeToast();
  //   }
  //   if ( prevProps.challenge !== challenge ) {
  //     // If a badge is showing, wait until it's done before showing the challenge toast
  //     if ( this.state.badgeIsShowing ) {
  //       setTimeout( ( ) => this.showChallengeToast(), ENTRANCE_SPEED + EXIT_SPEED + DISPLAY_TIME + 200 );
  //     } else {
  //       this.showChallengeToast();
  //     }
  //   }
  // }  

  const entrance = {
    toValue: 0,
    duration: ENTRANCE_SPEED,
    useNativeDriver: true,
  };

  const exit = {
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
      Animated.timing( this.animatedBadge, entrance ),
      Animated.timing( this.animatedBadge, exit ),
    ];

    const badgeSequence = [badgeToast[0], badgeToast[1]];
    Animated.sequence( badgeSequence ).start();
    // this.setState( {
    //   badgesShown: new Set( badgesShown ).add( badge?.earnedDate.toString() ),
    //   badgeIsShowing: true,
    // }, ( ) => {
    //   setTimeout( ( ) => {
    //     this.setState( { badgeIsShowing: false } );
    //   }, ENTRANCE_SPEED + EXIT_SPEED + DISPLAY_TIME );
    // } );
  };

  const showChallengeToast = ( ) => {
    if ( !challenge ) {return;}
    const challengeIdentifier =
      challenge.startedDate.toString() +
      challenge.percentComplete.toString();
    if ( challengesShown.has( challengeIdentifier ) ) {return;}

    const challengeToast = [
      Animated.timing( this.animatedChallenge, entrance ),
      Animated.timing( this.animatedChallenge, exit ),
    ];

    const challengeSequence = [challengeToast[0], challengeToast[1]];
    Animated.sequence( challengeSequence ).start();

    setChallengesShown( new Set( challengesShown ).add( challengeIdentifier ) );
  };

  return (
    <View style={viewStyles.topContainer}>
      {badge && (
        <Animated.View style={[viewStyles.animatedStyle, animatedBadgeStyle]}>
          <BadgeToast badge={badge} />
        </Animated.View>
      )}
      {challenge && (
        <Animated.View
          style={[viewStyles.animatedStyle, animatedChallengeStyle]}
        >
          <ChallengeToast challenge={challenge} />
        </Animated.View>
      )}
    </View>
  );
}

export default Toasts;
