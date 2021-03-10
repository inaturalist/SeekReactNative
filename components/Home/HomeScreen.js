// @flow

import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SpeciesNearby from "./SpeciesNearby/SpeciesNearby";
import GetStarted from "../Modals/GetStarted";
import ChallengeCard from "./Challenges/ChallengeCard";
import { checkIfCardShown } from "../../utility/helpers";
import RNModal from "../UIComponents/Modals/Modal";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import UploadStatus from "./UploadStatus";

const HomeScreen = () => {
  const [showModal, setModal] = useState( false );
  const [showUploadCard, setShowUploadCard] = useState( true );

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

  useEffect( ( ) => {
    // check for observations to upload || unviewed observations
    // if either, setShowUploadCard( true )
  }, [] );

  return (
    <ScrollNoHeader showUploadCard={showUploadCard}>
      <RNModal
        showModal={showModal}
        closeModal={closeModal}
        modal={<GetStarted closeModal={closeModal} />}
      />
        {showUploadCard && <UploadStatus />}
        <SpeciesNearby />
        <ChallengeCard />
    </ScrollNoHeader>
  );
};

export default HomeScreen;
