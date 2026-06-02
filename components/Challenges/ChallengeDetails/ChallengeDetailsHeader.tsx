import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, ImageBackground, View } from "react-native";

import backgrounds from "../../../assets/backgrounds";
import logos from "../../../assets/logos";
import { imageStyles, viewStyles } from "../../../styles/challenges/challengeDetails";
import { colors } from "../../../styles/global";
import { startChallenge } from "../../../utility/challengeHelpers";
import { setChallengeDetailsButtonText } from "../../../utility/textHelpers";
import ChallengeEarnedModal from "../../Modals/ChallengeEarnedModal";
import BackArrow from "../../UIComponents/Buttons/BackArrow";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ChallengeBadgeRow from "../../UIComponents/Challenges/ChallengeBadgeRow";
import ChallengeTitle from "../../UIComponents/Challenges/ChallengeTitle";
import Modal from "../../UIComponents/Modals/Modal";

interface Props {
  challenge: {
    index: number;
    percentComplete: number;
    startedDate: Date;
    availableDate: Date;
    backgroundName: string;
    name: string;
    logo: string;
    sponsorName: string;
    secondLogo: string;
    earnedIconName: string;
    badgeName: string;
  };
  showMission: ( number: number ) => void;
}

const ChallengeDetailsHeader = ( { challenge, showMission }: Props ) => {
  const navigation = useNavigation( );
  const [showModal, setModal] = useState( false );

  const openModal = ( ) => setModal( true );
  const closeModal = ( ) => setModal( false );

  const handlePress = ( ) => {
    if ( !challenge.startedDate ) {
      startChallenge( challenge.index );
      showMission( challenge.index );
    } else if ( challenge.startedDate && challenge.percentComplete < 100 ) {
      navigation.navigate( "Camera" );
    } else if ( challenge.startedDate && challenge.percentComplete === 100 ) {
      openModal( );
    }
  };

  const renderButton = ( ) => {
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
        style={viewStyles.challengeBackground}
      >
        <BackArrow />
        <Image
          source={logos[challenge.logo]}
          style={[
            imageStyles.logo,
            challenge.logo === "iNatWhite" && imageStyles.iNatLogo,
            challenge.logo === "natGeo" && imageStyles.natGeoLogo,
            challenge.logo === "BeesChallengeTopLogo" && imageStyles.myGardenLogo,
          ]}
        />
        {challenge && <ChallengeTitle challenge={challenge} />}
        <View style={viewStyles.marginSmall} />
        <ChallengeBadgeRow challenge={challenge} large />
        <View style={viewStyles.marginMedium} />
        {challenge && renderButton( )}
        <View style={viewStyles.marginLarge} />
      </ImageBackground>
    </>
  );
};

export default ChallengeDetailsHeader;
