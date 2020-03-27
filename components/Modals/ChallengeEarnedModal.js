import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { isAfter } from "date-fns";
import { formatMonth, formatMonthYear } from "../../utility/dateHelpers";

import styles from "../../styles/modals/challengeEarnedModal";
import i18n from "../../i18n";
import logos from "../../assets/logos";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import WhiteModal from "../UIComponents/WhiteModal";
import backgrounds from "../../assets/backgrounds";

type Props = {
  +closeModal: Function,
  +challenge: Object
};

const ChallengeEarnedModal = ( { closeModal, challenge }: Props ) => {
  const is2020Challenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  return (
    <WhiteModal closeModal={closeModal}>
      {is2020Challenge ? (
        <ImageBackground
          source={backgrounds[challenge.backgroundName]}
          imageStyle={styles.header}
          style={styles.headerImage}
        >
          <Image
            source={badges[challenge.earnedIconName]}
            style={[styles.badge, styles.seekBadge]}
          />
          <ImageBackground source={icons.badgeBanner} style={styles.seekBanner}>
            <Text style={[styles.bannerText, styles.seekBannerText]}>
              {i18n.t( "seek_challenges.badge" ).toLocaleUpperCase()}
            </Text>
          </ImageBackground>
        </ImageBackground>
      ) : (
        <LinearGradient
          colors={["#67c5ca", "#3ca2ab"]}
          style={styles.header}
        >
          <Image
            source={badges[challenge.earnedIconName]}
            style={styles.badge}
          />
          <ImageBackground source={icons.badgeBanner} style={styles.banner}>
            <Text style={styles.bannerText}>
              {i18n.t( challenge.name ).split( " " )[0].toLocaleUpperCase()}
              {" "}
              {i18n.t( "challenges.badge" ).toLocaleUpperCase() }
            </Text>
          </ImageBackground>
        </LinearGradient>
      )}
      <View style={styles.marginTop} />
      <Text style={styles.headerText}>
        {is2020Challenge
          ? i18n.t( "seek_challenges.header", { date: formatMonthYear( challenge.availableDate ) } ).toLocaleUpperCase()
          : i18n.t( "challenges.congrats", { month: formatMonth( challenge.availableDate ) } ).toLocaleUpperCase()}
      </Text>
      <Text style={styles.text}>
        {is2020Challenge
          ? i18n.t( "seek_challenges.text" )
          : i18n.t( "challenges.thanks" )}
      </Text>
      <View style={styles.marginTop} />
      {is2020Challenge
        ? <Image source={logos.iNatBlack} style={styles.iNatLogo} />
        : <Image source={logos.wwfop} style={styles.logo} />}
      <View style={styles.marginBottom} />
    </WhiteModal>
  );
};

export default ChallengeEarnedModal;
