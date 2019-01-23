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

const navParams = {
  id: null,
  commonName: null
};

type Props = {
  navigation: any
}

const GetStarted = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {i18n.t( "get_started.header" ).toLocaleUpperCase()}
      </Text>
    </View>
    <View style={styles.textContainer}>
      <View style={styles.buttonRow}>
        <Image source={icons.cameraGreen} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "get_started.tip_1" )}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Camera", navParams )}
        style={styles.buttonRow}
      >
        <Image source={icons.cameraGreen} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "get_started.tip_2" )}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <Image source={icons.cameraGreen} style={styles.image} />
        <Text style={styles.text}>
          {i18n.t( "get_started.tip_3" )}
        </Text>
      </View>
    </View>
  </View>
);

export default GetStarted;
