// @flow

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles/home/home";
import SpeciesNearby from "./SpeciesNearby/SpeciesNearby";
import GetStarted from "../Modals/GetStarted";
import ChallengeCard from "./Challenges/ChallengeCard";
import Padding from "../UIComponents/Padding";
import { checkIfCardShown } from "../../utility/helpers";
import Spacer from "../UIComponents/iOSSpacer";
import SafeAreaView from "../UIComponents/SafeAreaView";
import RNModal from "../UIComponents/Modal";
import { useScrollToTop } from "../../utility/customHooks";

const HomeScreen = () => {
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView />
      <RNModal
        showModal={showModal}
        closeModal={closeModal}
        modal={<GetStarted closeModal={closeModal} />}
      />
      <ScrollView ref={scrollView}>
        {Platform.OS === "ios" && <Spacer />}
        <SpeciesNearby />
        <ChallengeCard />
        <Padding />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
