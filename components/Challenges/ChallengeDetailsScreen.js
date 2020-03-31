// @flow

import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import {
  ScrollView,
  View,
  StatusBar,
  Platform
} from "react-native";
import Realm from "realm";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";

import realmConfig from "../../models";
import styles from "../../styles/challenges/challengeDetails";
import ChallengeDetailsHeader from "./ChallengeDetailsHeader";
import { getChallengeIndex, recalculateChallenges } from "../../utility/challengeHelpers";
import Spacer from "../UIComponents/iOSSpacer";
import ChallengeDetailsContainer from "./ChallengeDetailsContainer";
import { useScrollToTop } from "../../utility/customHooks";
import BottomSpacer from "../UIComponents/BottomSpacer";

const ChallengeDetailsScreen = () => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const scrollView = useRef( null );
  const [challenge, setChallenge] = useState( null );

  useScrollToTop( scrollView, navigation ); // custom, reusable hook

  const fetchChallenge = ( index ) => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).filtered( `index == ${String( index )}` );
        setChallenge( challenges[0] );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  const setupScreen = useCallback( async () => {
    recalculateChallenges();
    const index = await getChallengeIndex();

    if ( !challenge || challenge.index !== index ) {
      fetchChallenge( index );
    }
  }, [challenge] );

  useEffect( () => {
    if ( isFocused ) { // need this for screens where challenge index must change
      setupScreen();
    } else {
      setChallenge( null ); // reset necessary for race condition on iOS
    }
  }, [setupScreen, isFocused] );

  return (
    <View style={[styles.safeView, { paddingTop: insets.top }]}>
      <ScrollView ref={scrollView}>
        <StatusBar barStyle="light-content" />
        {Platform.OS === "ios" && <Spacer backgroundColor="#000000" />}
        <ChallengeDetailsHeader
          challenge={challenge}
          showMission={fetchChallenge}
        />
        <ChallengeDetailsContainer
          challenge={challenge}
        />
        <BottomSpacer />
      </ScrollView>
    </View>
  );
};

export default ChallengeDetailsScreen;
