import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
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

  const showChallengeToast = useCallback( () => {
    if ( !challenge ) {
      return;
    }
    const challengeIdentifier =
      challenge.startedDate.toString() + challenge.percentComplete.toString();
    if ( challengesShown.has( challengeIdentifier ) ) {
      return;
    }

    animatedChallenge.set(
      withSequence(
        withTiming( 0, { duration: ENTRANCE_SPEED } ),
        withDelay(
          DISPLAY_TIME,
          withTiming( height > 570 ? -170 : -120, { duration: EXIT_SPEED } ),
        ),
      ),
    );

    setChallengesShown( new Set( challengesShown ).add( challengeIdentifier ) );
  }, [challenge, challengesShown, animatedChallenge] );

  const showBadgeToast = useCallback( () => {
    if ( !badge ) {
      return;
    }
    if ( badgesShown.has( badge.earnedDate.toString() ) ) {
      return;
    }

    animatedBadge.set(
      withSequence(
        withTiming( 0, { duration: ENTRANCE_SPEED } ),
        withDelay(
          DISPLAY_TIME,
          withTiming(
            height > 570 ? -170 : -120,
            { duration: EXIT_SPEED },
          ),
        ),
      ),
    );
    setBadgesShown( new Set( badgesShown ).add( badge?.earnedDate.toString() ) );
    if ( challenge ) {
      setTimeout( () => {
        showChallengeToast();
      }, ENTRANCE_SPEED + DISPLAY_TIME / 2 );
    }
  }, [badge, challenge, badgesShown, animatedBadge, showChallengeToast] );

  // First, if we have a badge to show, we show it.
  useEffect( ( ) => {
    if ( badge ) {
      showBadgeToast();
      return;
    }
  }, [badge, showBadgeToast] );

  useEffect( ( ) => {
    if ( !badge && challenge ) {
      showChallengeToast();
    }
  }, [badge, challenge, showChallengeToast] );

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
