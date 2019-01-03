// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import DatePicker from "./DatePicker";

type Props = {
  navigation: any
}

const AgeVerifyScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    <View style={styles.column}>
      <Text style={styles.text}>
        {i18n.t( "inat_signup.enter_birthday" )}
      </Text>
      <Text style={styles.text}>
        {i18n.t( "inat_signup.permission" )}
      </Text>
      <DatePicker navigation={navigation} />
      <Text style={styles.text}>
        {i18n.t( "inat_signup.privacy" )}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate( "Main", {
          taxaName: null,
          id: null,
          taxaType: "all",
          latitude: null,
          longitude: null
        } )}
      >
        <Text style={styles.text}>
          {i18n.t( "inat_signup.continue" )}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default AgeVerifyScreen;
