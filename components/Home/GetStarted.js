// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/home/getStarted";
import icons from "../../assets/icons";

type Props = {
  toggleGetStartedModal: Function
}

const GetStarted = ( { toggleGetStartedModal }: Props ) => (
  <View style={styles.container}>
    <Text style={styles.headerText}>
      {i18n.t( "get_started.header" ).toLocaleUpperCase()}
    </Text>
    <View style={styles.contentContainer}>
      <View style={styles.row}>
        <Image source={icons.cameraGreen} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {i18n.t( "get_started.tip_1" )}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Image source={icons.speciesNearby} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {i18n.t( "get_started.tip_2" )}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Image source={icons.birdBadge} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {i18n.t( "get_started.tip_3" )}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => toggleGetStartedModal()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{i18n.t( "onboarding.continue" ).toLocaleUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default GetStarted;
