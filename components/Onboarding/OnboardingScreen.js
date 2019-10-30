import React from "react";
import {
  Image,
  Text,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/onboarding";
import Swiper from "./Swiper";
import logoImages from "../../assets/logos";
import icons from "../../assets/icons";

type Props = {
  +navigation: any
}

const OnboardingScreen = ( { navigation }: Props ) => (
  <Swiper navigation={navigation}>
    <View style={styles.carousel}>
      <View style={styles.imageContainer}>
        <Image
          source={icons.onboarding1}
          style={styles.image1}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{i18n.t( "onboarding.onboarding_1" )}</Text>
      </View>
    </View>
    <View style={styles.carousel}>
      <View style={styles.imageContainer}>
        <Image
          source={icons.onboarding2}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{i18n.t( "onboarding.onboarding_2" )}</Text>
      </View>
    </View>
    <View style={styles.carousel}>
      <View style={styles.banner}>
        <Image
          source={logoImages.wwfop}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{i18n.t( "onboarding.onboarding_3" )}</Text>
      </View>
    </View>
  </Swiper>
);

export default OnboardingScreen;
