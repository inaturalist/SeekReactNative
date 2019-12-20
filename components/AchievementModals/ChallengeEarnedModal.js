import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "../../styles/badges/challengeBadgeEarned";
import i18n from "../../i18n";
import logos from "../../assets/logos";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import BackButton from "../UIComponents/ModalBackButton";

type Props = {
  +closeModal: Function,
  +challenge: Object
};

const ChallengeEarnedModal = ( { closeModal, challenge }: Props ) => (
  <>
    <LinearGradient
      colors={["#67c5ca", "#3ca2ab"]}
      style={[styles.header, styles.modalTop]}
    >
      <Image
        source={badges[challenge.earnedIconName]}
        style={styles.image}
      />
      <ImageBackground source={icons.badgeBanner} style={styles.banner}>
        <Text style={styles.bannerText}>
          {i18n.t( challenge.name ).split( " " )[0].toLocaleUpperCase()}
          {" "}
          {i18n.t( "challenges.badge" ).toLocaleUpperCase() }
        </Text>
      </ImageBackground>
    </LinearGradient>
    <View style={[styles.innerContainer, styles.modalBottom]}>
      <Text style={styles.headerText}>
        {i18n.t( "challenges.congrats", { month: i18n.t( challenge.month ).split( " " )[0].toLocaleUpperCase() } ).toLocaleUpperCase()}
      </Text>
      <Text style={styles.text}>
        {i18n.t( "challenges.thanks" )}
      </Text>
      <Image source={logos.wwfop} style={[styles.logo, styles.center]} />
      <View style={styles.marginBottom} />
    </View>
    <BackButton closeModal={closeModal} />
  </>
);

export default ChallengeEarnedModal;
