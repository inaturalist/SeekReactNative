import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import BackIcon from "react-native-vector-icons/AntDesign";

import { colors } from "../../styles/global";
import styles from "../../styles/badges/challengeBadge";
import i18n from "../../i18n";
import logos from "../../assets/logos";

const backIcon = ( <BackIcon name="closecircle" size={50} color={colors.white} /> );

const month = "April";

type Props = {
  toggleChallengeModal: Function,
  challenge: Object
};

const ChallengeModal = ( { toggleChallengeModal, challenge }: Props ) => (
  <View style={styles.outerContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require( "../../assets/onboarding/img-onboarding2.png" )}
          style={styles.image}
        />
      </View>
      <Text style={styles.headerText}>
        {i18n.t( "challenges.congrats", { defaultValue: "{{month}}", month } ).toLocaleUpperCase()}
      </Text>
      <Text style={styles.text}>
        {i18n.t( "challenges.thanks" )}
      </Text>
      <View style={styles.center}>
        <Image source={logos.wwfop} style={styles.logo} />
      </View>
    </View>
    <TouchableOpacity style={styles.backButton} onPress={() => toggleChallengeModal()}>
      <Text>{backIcon}</Text>
    </TouchableOpacity>
  </View>
);

export default ChallengeModal;
