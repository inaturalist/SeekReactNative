// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ImageBackground
} from "react-native";
import { withNavigation } from "@react-navigation/compat";
import { isAfter } from "date-fns";

import styles from "../../styles/challenges/challengeDetails";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import logos from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { colors } from "../../styles/global";
import Modal from "../UIComponents/Modal";
import { setChallengeDetailsButtonText } from "../../utility/textHelpers";
import { getRoute } from "../../utility/helpers";
import { startChallenge } from "../../utility/challengeHelpers";
import ChallengeTitle from "../UIComponents/Challenges/ChallengeTitle";
import ChallengeBadgeRow from "../UIComponents/Challenges/ChallengeBadgeRow";

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
  const is2020Challenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  const fetchRoute = async () => {
    const r = await getRoute();
    setRoute( r );
  };

  const renderButton = () => {
    const buttonText = setChallengeDetailsButtonText( challenge, challenge.startedDate );

    const button = (
      <GreenButton
        color={colors.seekGreen}
        handlePress={() => {
          if ( !challenge.startedDate ) {
            startChallenge( challenge.index );
            showMission( challenge.index );
          } else if ( challenge.startedDate && challenge.percentComplete < 100 ) {
            navigation.navigate( "Camera" );
          } else if ( challenge.startedDate && challenge.percentComplete === 100 ) {
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
      <ImageBackground
        source={challenge ? backgrounds[challenge.backgroundName] : null}
        style={styles.challengeBackground}
      >
        <CustomBackArrow route={route} />
        <View style={is2020Challenge ? styles.iNatMargin : styles.margin} />
        {is2020Challenge
          ? <Image source={logos.iNatWhite} style={[styles.logo, styles.iNatLogo]} />
          : <Image source={logos.op} style={styles.logo} />}
        {challenge && <ChallengeTitle challenge={challenge} />}
        <View style={styles.marginSmall} />
        <ChallengeBadgeRow challenge={challenge} large />
        <View style={styles.marginMedium} />
        {challenge && renderButton()}
      </ImageBackground>
    </>
  );
};

export default withNavigation( ChallengeDetailsHeader );
