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
    {[0, 1, 2].map( ( item, index ) => (
      <View key={`${item}`}>
        {index === 2 ? (
          <View style={[styles.banner, styles.center]}>
            <Image
              source={logoImages.wwfop}
              style={styles.image}
            />
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image
              source={icons[`onboarding${index + 1}`]}
              style={styles[`image${index + 1}`]}
            />
          </View>
        )}
        <View style={[styles.textContainer, styles.center]}>
          <Text style={styles.text}>
            {i18n.t( `onboarding.onboarding_${index + 1}` )}
          </Text>
        </View>
      </View>
    ) )}
  </Swiper>
);

export default OnboardingScreen;
