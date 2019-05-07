// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/results/results";

type Props = {
  navigation: any,
  color: string
}

const PostToiNat = ( { navigation, color }: Props ) => (
  <View>
    <Text style={styles.text}>
      {i18n.t( "results.post_inat" )}
    </Text>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={() => navigation.navigate( "Post" )}
    >
      <Text style={styles.buttonText}>
        {i18n.t( "results.post" ).toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  </View>
);

export default PostToiNat;
