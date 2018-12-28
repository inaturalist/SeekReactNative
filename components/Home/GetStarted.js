import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import CameraIcon from "react-native-vector-icons/Entypo";

import i18n from "../../i18n";
import styles from "../../styles/getStarted";
import { colors } from "../../styles/global";

const camera = ( <CameraIcon name="camera" size={25} color={colors.white} /> );

const GetStarted = () => (
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
        <TouchableOpacity style={styles.greenButton}>
          <Text style={styles.buttonText}>
            {i18n.t( "get_started.button" ).toLocaleUpperCase()}
            {" "}
            {camera}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default GetStarted;
