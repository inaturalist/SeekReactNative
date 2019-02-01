// @flow

import React from "react";
import {
  Image,
  ScrollView,
  Text,
  View
} from "react-native";

import styles from "../../styles/camera/help";
import i18n from "../../i18n";
import Footer from "../Challenges/ChallengeFooter";

type Props = {
  navigation: any
}

const CameraHelpScreen = ( { navigation }: Props ) => (
  <View style={styles.container}>
    {/* <ScrollView>
      
    </ScrollView> */}
    <Footer navigation={navigation} />
  </View>
);

export default CameraHelpScreen;
