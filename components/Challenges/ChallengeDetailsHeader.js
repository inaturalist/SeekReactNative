// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground
} from "react-native";

import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import badges from "../../assets/badges";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import logos from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { colors } from "../../styles/global";
import Modal from "../UIComponents/Modal";
import { setChallengeDetailsButtonText } from "../../utility/textHelpers";
import { getRoute } from "../../utility/helpers";

type Props = {
  +navigation: any,
  challenge: Object,
  showMission: Function
}

const ChallengeDetailsHeader = ( {
  challenge,
  navigation,
  showMission
}: Props ) => {
  const [showModal, setModal] = useState( false );
  const [route, setRoute] = useState( null );

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  const fetchRoute = async () => {
    const r = await getRoute();
    setRoute( r );
  };

  const renderButton = () => {
    const buttonText = setChallengeDetailsButtonText( challenge, challenge.started );

    const button = (
      <GreenButton
        color={colors.seekGreen}
        handlePress={() => {
          if ( !challenge.started ) {
            showMission();
          } else if ( challenge.started && challenge.percentComplete < 100 ) {
            navigation.navigate( "Camera" );
          } else if ( challenge.started && challenge.percentComplete === 100 ) {
            openModal();
          }
        }}
        text={buttonText}
      />
    );

    return button;
  };

  useEffect( () => {
    fetchRoute();
  }, [] );

  return (
    <>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={(
          <ChallengeEarnedModal
            challenge={challenge}
            closeModal={closeModal}
          />
        )}
      />
      {challenge && (
        <ImageBackground
          source={backgrounds[challenge.backgroundName]}
          style={styles.challengeBackground}
        >
          <CustomBackArrow route={route} />
          <View style={styles.margin} />
          <View style={styles.logoContainer}>
            <Image source={logos.op} style={styles.logo} />
          </View>
          <Text style={styles.challengeHeader}>
            {i18n.t( challenge.month ).toLocaleUpperCase()}
          </Text>
          <Text style={styles.challengeName}>
            {i18n.t( challenge.name ).toLocaleUpperCase()}
          </Text>
          <View style={[styles.row, styles.marginHorizontal]}>
            {challenge.percentComplete === 100
              ? <Image source={badges[challenge.earnedIconName]} style={styles.badge} />
              : <Image source={badges["badge-empty-white"]} style={styles.badge} />}
            <Text style={styles.text}>{i18n.t( "challenges_card.join" )}</Text>
          </View>
          <View style={styles.marginHorizontal}>
            {renderButton()}
          </View>
        </ImageBackground>
      )}
    </>
  );
};

export default ChallengeDetailsHeader;
