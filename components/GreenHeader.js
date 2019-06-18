// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import styles from "../styles/greenHeader";
import BackArrow from "./BackArrow";
import CustomBackArrow from "./CustomBackArrow";
import icons from "../assets/icons";

type Props = {
  header: string,
  navigation: any,
  route: string
}

const GreenHeader = ( { header, navigation, route }: Props ) => (
  <View style={styles.container}>
    {route && route !== "Posting"
      ? <CustomBackArrow navigation={navigation} route={route} />
      : <BackArrow navigation={navigation} />
    }
    <Text style={styles.text}>{header ? header.toLocaleUpperCase() : null}</Text>
    {route === "Posting" ? (
      <TouchableOpacity
        onPress={() => navigation.navigate( "PostingHelp" )}
        hitSlop={styles.touchable}
      >
        <Image source={icons.cameraHelp} style={styles.help} />
      </TouchableOpacity>
    ) : null}
  </View>
);

export default GreenHeader;
