// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground
} from "react-native";
import { isAfter } from "date-fns";
import { formatMonth, formatMonthYear } from "../../utility/dateHelpers";

import styles from "../../styles/modals/challengeEarnedModal";
import i18n from "../../i18n";
import logos from "../../assets/logos";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import WhiteModal from "../UIComponents/Modals/WhiteModal";
import backgrounds from "../../assets/backgrounds";

type Props = {
  +closeModal: ( ) => void,
  +challenge: {
    name: string,
    backgroundName: string,
    availableDate: Date,
    secondLogo: string,
    earnedIconName: string,
    sponsorName: string,
    badgeName: string
  }
};

const ChallengeEarnedModal = ( { closeModal, challenge }: Props ) => {
  const is2020OrAfterChallenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  return (
    <WhiteModal closeModal={closeModal}>
      <ImageBackground
        source={backgrounds[challenge.backgroundName]}
        imageStyle={styles.header}
        style={styles.headerImage}
      >
        <Image
          source={badges[challenge.earnedIconName]}
          style={styles.badge}
        />
        <ImageBackground
          source={icons.badgeBanner}
          style={styles.seekBanner}
        >
          <Text style={[styles.bannerText, is2020OrAfterChallenge && styles.seekBannerText]}>
            {i18n.t( challenge.badgeName ).toLocaleUpperCase( )}
          </Text>
        </ImageBackground>
      </ImageBackground>
      <View style={styles.marginTop} />
      <Text style={styles.headerText}>
        {i18n.t( "challenges_all.you_completed_sponsor_challenge", {
          sponsorName: challenge.sponsorName.toLocaleUpperCase( ),
          date: challenge.sponsorName === "Our Planet"
            ? formatMonth( challenge.availableDate ).toLocaleUpperCase( )
            : formatMonthYear( challenge.availableDate ).toLocaleUpperCase( )
        } )}
      </Text>
      <Text style={styles.text}>
        {is2020OrAfterChallenge
          ? i18n.t( "seek_challenges.text" )
          : i18n.t( "challenges.thanks" )}
      </Text>
      <View style={styles.marginTop} />
      <Image
        source={logos[challenge.secondLogo]}
        style={[
          styles.logo,
          challenge.secondLogo === "iNat" && styles.iNatLogo,
          challenge.secondLogo === "natGeoBlack" && styles.natGeoLogo
        ]}
      />
      <View style={styles.marginBottom} />
    </WhiteModal>
  );
};

export default ChallengeEarnedModal;
