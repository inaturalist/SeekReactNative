// @flow

import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import { BackHandler } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import SpeciesNearby from "./SpeciesNearby/SpeciesNearby";
import GetStarted from "../Modals/GetStarted";
import ChallengeCard from "./Challenges/ChallengeCard";
import { checkIfCardShown } from "../../utility/helpers";
import RNModal from "../UIComponents/Modals/Modal";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import UploadStatus from "./UploadStatus";
import { checkForPendingUploads, checkForSuccessfulUploads, markUploadsAsSeen } from "../../utility/uploadHelpers";

const HomeScreen = () => {
  const navigation = useNavigation( );
  const [showModal, setModal] = useState( false );
  const [showUploadCard, setShowUploadCard] = useState( false );
  const [uploads, setUploads] = useState( 0 );
  const [pendingUploads, setPendingUploads] = useState( [] );
  const [numPendingUploads, setNumPendingUploads] = useState( 0 );

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
    // need to do this on home screen since it changes the styling of SpeciesNearby and status bar
    const checkUploads = async ( ) => {
      const newUploads = await checkForSuccessfulUploads( );

      if ( newUploads.length > 0 ) {
        setShowUploadCard( true );
        setUploads( newUploads.length );
      } else {
        const pendingUploads = await checkForPendingUploads( );
        if ( pendingUploads.length > 0 ) {
          setShowUploadCard( true );
          setPendingUploads( pendingUploads );
          setNumPendingUploads( pendingUploads.length );
        }
      }
    };

    navigation.addListener( "focus", ( ) => {
      checkUploads( );
    } );
  } );

  useEffect( ( ) => {
    if ( uploads > 0 ) {
      markUploadsAsSeen( );
    }
  }, [uploads] );

  return (
    <ScrollNoHeader showUploadCard={showUploadCard}>
      <RNModal
        showModal={showModal}
        closeModal={closeModal}
        modal={<GetStarted closeModal={closeModal} />}
      />
        {showUploadCard && <UploadStatus uploads={uploads} pendingUploads={pendingUploads} numPendingUploads={numPendingUploads} />}
        <SpeciesNearby />
        <ChallengeCard />
    </ScrollNoHeader>
  );
};

export default HomeScreen;
