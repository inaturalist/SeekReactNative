// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import styles from "../../styles/uiComponents/greenHeader";
import BackArrow from "./BackArrow";
import CustomBackArrow from "./CustomBackArrow";
import posting from "../../assets/posting";

type Props = {
  +header: string,
  +navigation: any,
  +route: string
}

const GreenHeader = ( { header, navigation, route }: Props ) => (
  <View style={styles.container}>
    {route && route !== "post"
      ? <CustomBackArrow navigation={navigation} route={route} />
      : <BackArrow navigation={navigation} />}
    <Text style={styles.text}>{header ? header.toLocaleUpperCase() : null}</Text>
    {route === "post" ? (
      <TouchableOpacity
        hitSlop={styles.touchable}
        onPress={() => navigation.navigate( "PostingHelp" )}
        style={styles.help}
      >
        <Image source={posting.postingHelp} />
      </TouchableOpacity>
    ) : null}
  </View>
);

export default GreenHeader;
