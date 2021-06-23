// @flow

import React, {
  useState,
  useEffect,
  useCallback
} from "react";
import { BackHandler, Platform } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import SpeciesNearby from "./SpeciesNearby/SpeciesNearby";
import GetStarted from "../Modals/GetStarted";
import ChallengeCard from "./Challenges/ChallengeCard";
import { checkIfCardShown } from "../../utility/helpers";
import RNModal from "../UIComponents/Modals/Modal";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import UploadStatus from "./UploadStatus";
import { checkForUploads, checkForNumSuccessfulUploads, markUploadsAsSeen } from "../../utility/uploadHelpers";
import { deleteDebugLogAfter7Days } from "../../utility/photoHelpers";
// import { LOG } from "../../utility/debugHelpers";
import INatCard from "./INatCard/iNatCard";

const HomeScreen = ( ): Node => {
  const navigation = useNavigation( );
  const [showModal, setModal] = useState( false );
  const [showUploadCard, setShowUploadCard] = useState( false );
  const [successfulUploads, setSuccessfulUploads] = useState( 0 );
  const [numPendingUploads, setNumPendingUploads] = useState( 0 );

  const openModal = ( ) => setModal( true );
  const closeModal = ( ) => setModal( false );
  const closeCard = useCallback( ( ) => setShowUploadCard( false ), [] );

  const updateSuccessfulUploads = num => setSuccessfulUploads( num );

  useEffect( ( ) => {
    const checkForFirstLaunch = async ( ) => {
      // also adding some other app startup type things in here
      // that don't need to run in App.js or Splash.js
      if ( Platform.OS === "android" ) {
        deleteDebugLogAfter7Days( ); // delete debug logs on Android
      }
      const isFirstLaunch = await checkIfCardShown( );
      if ( isFirstLaunch ) {
        openModal( );
      }
    };
    checkForFirstLaunch( );
  }, [] );

  useFocusEffect(
    useCallback( ( ) => {
      const onBackPress = ( ) => {
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return ( ) => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [] )
  );

  useEffect( ( ) => {
    // need to do this on home screen since it changes the styling of SpeciesNearby and status bar
    const checkUploads = async ( ) => {
      const numUnseenUploads = await checkForNumSuccessfulUploads( );

      if ( numUnseenUploads > 0 ) {
        setShowUploadCard( true );
        setSuccessfulUploads( numUnseenUploads );
      } else {
        const allUploads = await checkForUploads( );
        const pendingUploads = allUploads.filtered( "photo.uploadSucceeded == false AND photo.uploadFailed == false" ).length;
        // LOG.info( `number of pending uploads: ${pendingUploads}` );
        if ( pendingUploads > 0 ) {
          setShowUploadCard( true );
          setNumPendingUploads( pendingUploads );
        }
      }
    };

    navigation.addListener( "focus", ( ) => {
      checkUploads( );
    } );
  } );

  useEffect( ( ) => {
    if ( successfulUploads > 0 ) {
      markUploadsAsSeen( );
    }
  }, [successfulUploads] );

  return (
    <ScrollNoHeader showUploadCard={showUploadCard}>
      <RNModal
        showModal={showModal}
        closeModal={closeModal}
        modal={<GetStarted closeModal={closeModal} />}
      />
        {showUploadCard && (
          <UploadStatus
            successfulUploads={successfulUploads}
            numPendingUploads={numPendingUploads}
            updateSuccessfulUploads={updateSuccessfulUploads}
            closeCard={closeCard}
          />
        )}
        <SpeciesNearby />
        <ChallengeCard />
        <INatCard />
    </ScrollNoHeader>
  );
};

export default HomeScreen;
