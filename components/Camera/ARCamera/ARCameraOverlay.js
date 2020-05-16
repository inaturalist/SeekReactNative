// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

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
  takePicture: Function,
  ranks: Object,
  pictureTaken: boolean,
  cameraLoaded: boolean, 
  error: ?string
}

const ARCameraOverlay = ( {
  takePicture,
  ranks,
  pictureTaken,
  cameraLoaded,
  error
}: Props ) => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const rankToRender = Object.keys( ranks )[0] || null;
  const helpText = setCameraHelpText( rankToRender );
  const [showModal, setModal] = useState( false );

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  console.log( params, "params in overlay" );

  useEffect( () => {
    if ( params.showWarning === "true" ) {
      openModal();
    }
  }, [params] );

  useEffect( () => {
    const checkForFirstCameraLaunch = async () => {
      const isFirstLaunch = await checkIfCameraLaunched();
      if ( isFirstLaunch ) {
        openModal();
      }
    };
    checkForFirstCameraLaunch();
  }, [] );

  return (
    <>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<WarningModal closeModal={closeModal} />}
      />
      {!error && (
        <>
          {( pictureTaken || !cameraLoaded ) && (
            <View style={styles.loading}>
              <LoadingWheel color="white" />
            </View>
          )}
          <ARCameraHeader ranks={ranks} />
          <Text style={styles.scanText}>{helpText}</Text>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.take_photo" )}
            accessible
            onPress={() => takePicture()}
            style={styles.shutter}
            disabled={pictureTaken}
          >
            <Image source={ranks && ranks.species ? icons.arCameraGreen : icons.arCameraButton} />
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
      )}
    </>
  );
};

export default ARCameraOverlay;
