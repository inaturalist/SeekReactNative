import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { BackHandler, Platform } from "react-native";

import { checkIfCardShown } from "../../utility/helpers";
import { deleteDebugLogAfter7Days } from "../../utility/photoHelpers";
import { checkForNumSuccessfulUploads, checkForUploads, markUploadsAsSeen } from "../../utility/uploadHelpers";
import GetStarted from "../Modals/GetStarted";
import DonateCard from "../UIComponents/Cards/DonateCard";
import RNModal from "../UIComponents/Modals/Modal";
import ScrollNoHeader from "../UIComponents/Screens/ScrollNoHeader";
import Announcements from "./Announcements/Announcements";
import ChallengeCard from "./Challenges/ChallengeCard";
import INatCard from "./INatCard/iNatCard";
import SeekYearInReviewCard from "./SeekYearInReview/SeekYearInReviewCard";
import SpeciesNearby from "./SpeciesNearby/SpeciesNearby";
import Updates from "./Updates/Updates";
import UploadStatus from "./UploadStatus";

const HomeScreen = ( ) => {
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
        // Do not react to back button press => let react-navigation handle it, i.e. since we are on home srceen it closes the app
        return false;
      };

      const backHandler = BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return ( ) => backHandler.remove();
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
        if ( pendingUploads > 0 ) {
          setShowUploadCard( true );
          setNumPendingUploads( pendingUploads );
        }
      }
    };

    const unsubscribe = navigation.addListener( "focus", ( ) => {
      checkUploads( );
    } );

    return unsubscribe;
  }, [navigation] );

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
      <Announcements />
      <SeekYearInReviewCard />
      <Updates />
      <ChallengeCard />
      <INatCard />
      <DonateCard />
    </ScrollNoHeader>
  );
};

export default HomeScreen;
