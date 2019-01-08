import React from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/onboarding";

type Props = {
  navigation: any
}

const OnboardingScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <LinearGradient
      colors={["#ffffff", "#38976d"]}
      style={styles.container}
    >
      <ScrollView
        horizontal
        scrollEventThrottle
        pagingEnabled
        nestedScrollEnabled
        indicatorStyle="white"
        contentContainerStyle={styles.carousel}
      >
        <Image
          source={require( "../../assets/logos/logo-cas.png" )}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>{i18n.t( "onboarding.onboarding_1" )}</Text>
        <Image
          source={require( "../../assets/logos/logo-bw.png" )}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>{i18n.t( "onboarding.onboarding_2" )}</Text>
        <Image
          source={require( "../../assets/logos/logo-hhmi.png" )}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>{i18n.t( "onboarding.onboarding_3" )}</Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Login" )}
      >
        <Text style={styles.skip}>{i18n.t( "onboarding.skip" )}</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

export default OnboardingScreen;
