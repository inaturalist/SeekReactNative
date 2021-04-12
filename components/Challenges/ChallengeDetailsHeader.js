// @flow

import React, { useState } from "react";
import { View, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import styles from "../../styles/challenges/challengeDetails";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import logos from "../../assets/logos";
import backgrounds from "../../assets/backgrounds";
import ChallengeEarnedModal from "../Modals/ChallengeEarnedModal";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { colors } from "../../styles/global";
import Modal from "../UIComponents/Modals/Modal";
import { setChallengeDetailsButtonText } from "../../utility/textHelpers";
import { startChallenge } from "../../utility/challengeHelpers";
import ChallengeTitle from "../UIComponents/Challenges/ChallengeTitle";
import ChallengeBadgeRow from "../UIComponents/Challenges/ChallengeBadgeRow";

type Props = {
  challenge: {
    index: number,
    percentComplete: number,
    startedDate: Date,
    availableDate: Date,
    backgroundName: string,
    name: string,
    logo: string,
    sponsorName: string,
    secondLogo: string,
    earnedIconName: string,
    badgeName: string
  },
  showMission: ( number ) => void
}

const ChallengeDetailsHeader = ( { challenge, showMission }: Props ): Node => {
  const navigation = useNavigation();
  const [showModal, setModal] = useState( false );

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  const handlePress = () => {
    if ( !challenge.startedDate ) {
      startChallenge( challenge.index );
      showMission( challenge.index );
    } else if ( challenge.startedDate && challenge.percentComplete < 100 ) {
      navigation.navigate( "Camera" );
    } else if ( challenge.startedDate && challenge.percentComplete === 100 ) {
      openModal();
    }
  };

  const renderButton = () => {
    const buttonText = setChallengeDetailsButtonText( challenge, challenge.startedDate );

    const button = (
      <GreenButton
        color={colors.seekGreen}
        handlePress={handlePress}
        text={buttonText}
      />
    );

    return button;
  };

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
        source={backgrounds[challenge.backgroundName]}
        style={styles.challengeBackground}
      >
        <BackArrow />
        <Image
          source={logos[challenge.logo]}
          style={[
            styles.logo,
            challenge.logo === "iNatWhite" && styles.iNatLogo,
            challenge.logo === "natGeo" && styles.natGeoLogo
          ]}
        />
        {challenge && <ChallengeTitle challenge={challenge} />}
        <View style={styles.marginSmall} />
        <ChallengeBadgeRow challenge={challenge} large />
        <View style={styles.marginMedium} />
        {challenge && renderButton()}
        <View style={styles.marginLarge} />
      </ImageBackground>
    </>
  );
};

export default ChallengeDetailsHeader;
