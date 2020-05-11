// @flow

import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import {
  View,
  ScrollView,
  StatusBar,
  BackHandler
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";

import styles from "../../styles/home/home";
import SpeciesNearby from "./SpeciesNearby/SpeciesNearby";
import GetStarted from "../Modals/GetStarted";
import ChallengeCard from "./Challenges/ChallengeCard";
import Padding from "../UIComponents/Padding";
import { checkIfCardShown } from "../../utility/helpers";
import Spacer from "../UIComponents/TopSpacer";
import RNModal from "../UIComponents/Modal";
import { useScrollToTop } from "../../utility/customHooks";
import BottomSpacer from "../UIComponents/BottomSpacer";


const HomeScreen = () => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const scrollView = useRef( null );
  const [showModal, setModal] = useState( false );

  useScrollToTop( scrollView, navigation ); // custom, reusable hook

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  useEffect( () => {
    const checkForFirstLaunch = async () => {
      const isFirstLaunch = await checkIfCardShown();
      if ( isFirstLaunch ) {
        openModal();
      }
    };
    checkForFirstLaunch();
  }, [] );

  useFocusEffect(
    useCallback( () => {
      const onBackPress = () => {
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return () => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [] )
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <RNModal
        showModal={showModal}
        closeModal={closeModal}
        modal={<GetStarted closeModal={closeModal} />}
      />
      <ScrollView ref={scrollView}>
        <Spacer />
        <SpeciesNearby />
        <ChallengeCard />
        <Padding />
        <BottomSpacer />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
