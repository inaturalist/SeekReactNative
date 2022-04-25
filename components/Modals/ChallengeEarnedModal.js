// @flow

import * as React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground
} from "react-native";
import { isAfter } from "date-fns";
import { formatMonth, formatMonthYear } from "../../utility/dateHelpers";

import { viewStyles, imageStyles, textStyles } from "../../styles/modals/challengeEarnedModal";
import i18n from "../../i18n";
import logos from "../../assets/logos";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import WhiteModal from "../UIComponents/Modals/WhiteModal";
import backgrounds from "../../assets/backgrounds";

type Props = {
  closeModal: ( ) => void,
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
  }
};

const ChallengeEarnedModal = ( { closeModal, challenge }: Props ): React.Node => {
  const is2020OrAfterChallenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  return (
    <WhiteModal closeModal={closeModal}>
      <ImageBackground
        source={backgrounds[challenge.backgroundName]}
        imageStyle={viewStyles.header}
        style={imageStyles.headerImage}
      >
        <Image
          source={badges[challenge.earnedIconName]}
          style={imageStyles.badge}
        />
        <ImageBackground
          source={icons.badgeBanner}
          style={imageStyles.seekBanner}
        >
          <Text style={[textStyles.bannerText, is2020OrAfterChallenge && textStyles.seekBannerText]}>
            {i18n.t( challenge.badgeName ).toLocaleUpperCase( )}
          </Text>
        </ImageBackground>
      </ImageBackground>
      <View style={viewStyles.marginTop} />
      <Text style={textStyles.headerText}>
        {i18n.t( "challenges_all.you_completed_sponsor_challenge", {
          sponsorName: challenge.sponsorName.toLocaleUpperCase( ),
          date: challenge.sponsorName === "Our Planet"
            ? formatMonth( challenge.availableDate ).toLocaleUpperCase( )
            : formatMonthYear( challenge.availableDate ).toLocaleUpperCase( )
        } )}
      </Text>
      <Text style={textStyles.text}>
        {is2020OrAfterChallenge
          ? i18n.t( "seek_challenges.text" )
          : i18n.t( "challenges.thanks" )}
      </Text>
      <View style={viewStyles.marginTop} />
      <Image
        source={logos[challenge.secondLogo]}
        style={[
          viewStyles.logo,
          challenge.secondLogo === "iNat" && imageStyles.iNatLogo,
          challenge.secondLogo === "natGeoBlack" && imageStyles.natGeoLogo
        ]}
      />
      <View style={viewStyles.marginBottom} />
    </WhiteModal>
  );
};

export default ChallengeEarnedModal;
