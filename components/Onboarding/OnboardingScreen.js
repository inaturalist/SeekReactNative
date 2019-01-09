import React from "react";
import {
  Image,
  Text,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/onboarding";
import Swiper from "./Swiper";

type Props = {
  navigation: any
}

const OnboardingScreen = ( { navigation }: Props ) => (
  <Swiper navigation={navigation}>
    <View style={styles.carousel}>
      <Image
        source={require( "../../assets/logos/logo-inaturalist-bird.png" )}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{i18n.t( "onboarding.onboarding_1" )}</Text>
      </View>
    </View>
    <View style={styles.carousel}>
      <Image
        source={require( "../../assets/logos/logo-inaturalist-bird.png" )}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{i18n.t( "onboarding.onboarding_2" )}</Text>
      </View>
    </View>
    <View style={styles.carousel}>
      <View style={styles.banner}>
        <Image
          source={require( "../../assets/logos/logo-inaturalist-bird.png" )}
          style={styles.image}
        />
        <Image
          source={require( "../../assets/logos/logo-inaturalist-bird.png" )}
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
