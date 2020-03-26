// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "react-navigation-hooks";

import i18n from "../../../i18n";
import styles from "../../../styles/camera/arCamera";
import icons from "../../../assets/icons";
import { setCameraHelpText } from "../../../utility/textHelpers";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import Modal from "../../UIComponents/Modal";
import WarningModal from "../../Modals/WarningModal";
import ARCameraHeader from "./ARCameraHeader";
import { checkIfCameraLaunched } from "../../../utility/helpers";

type Props = {
  setPictureTaken: Function,
  takePicture: Function,
  ranks: Object,
  pictureTaken: boolean,
  cameraLoaded: boolean
}

const ARCameraOverlay = ( {
  setPictureTaken,
  takePicture,
  ranks,
  pictureTaken,
  cameraLoaded
}: Props ) => {
  const navigation = useNavigation();
  const rankToRender = Object.keys( ranks )[0] || null;
  const helpText = setCameraHelpText( rankToRender );
  const [showModal, setModal] = useState( false );
  const [loading, setLoading] = useState( true );

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  useEffect( () => {
    const checkForFirstCameraLaunch = async () => {
      const isFirstLaunch = await checkIfCameraLaunched();
      if ( isFirstLaunch ) {
        openModal();
      }
    };
    checkForFirstCameraLaunch();
  }, [] );

  useEffect( () => {
    if ( cameraLoaded ) {
      setLoading( false );
    }

    if ( pictureTaken ) {
      setLoading( true );
    }
  }, [cameraLoaded, pictureTaken] );

  return (
    <>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<WarningModal closeModal={closeModal} />}
      />
      {loading && (
        <View style={styles.loading}>
          <LoadingWheel color="white" />
        </View>
      )}
      <ARCameraHeader ranks={ranks} />
      <Text style={styles.scanText}>{helpText}</Text>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.take_photo" )}
        accessible
        onPress={() => {
          setPictureTaken();
          takePicture();
        }}
        style={styles.shutter}
        disabled={pictureTaken}
      >
        {ranks && ranks.species
          ? <Image source={icons.arCameraGreen} />
          : <Image source={icons.arCameraButton} />}
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.help" )}
        accessible
        onPress={() => navigation.navigate( "CameraHelp" )}
        style={styles.help}
      >
        <Image source={icons.cameraHelp} />
      </TouchableOpacity>
    </>
  );
};

export default ARCameraOverlay;
