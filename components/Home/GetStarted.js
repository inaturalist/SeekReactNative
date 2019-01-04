// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import CameraIcon from "react-native-vector-icons/Entypo";

import i18n from "../../i18n";
import styles from "../../styles/home/getStarted";
import { colors } from "../../styles/global";

const camera = ( <CameraIcon name="camera" size={20} color={colors.white} /> );

const navParams = {
  latitude: null, // need a way to know where the user is to get results. should the camera ask you for your location?
  longitude: null, // need a way to know where the user is to get results. should the camera ask you for your location?
  id: null,
  commonName: null
};

type Props = {
  navigation: any
}

const GetStarted = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {i18n.t( "get_started.header" ).toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {i18n.t( "get_started.how_to" )}
        </Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => navigation.navigate( "Camera", navParams )}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "get_started.button" ).toLocaleUpperCase()}
            {" "}
          </Text>
          <Text style={styles.buttonText}>
            {camera}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default GetStarted;
