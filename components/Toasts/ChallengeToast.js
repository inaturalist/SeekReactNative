// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/toasts/badgeToast";
import PercentCircle from "../UIComponents/PercentCircle";
import { setChallengeIndex } from "../../utility/challengeHelpers";

type Props = {
  +challenge: Object
}

const ChallengeToast = ( { challenge }: Props ) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        setChallengeIndex( challenge.index );
        navigation.navigate( "ChallengeDetails" );
      }}
      style={styles.row}
    >
      <View>
        <Text allowFontScaling={false} style={styles.headerText}>
          {i18n.t( challenge.name ).toLocaleUpperCase()}
        </Text>
        <Text allowFontScaling={false} style={styles.description}>
          {i18n.t( "banner.challenge_progress" )}
        </Text>
        <Text allowFontScaling={false} style={styles.view}>{i18n.t( "banner.challenge_view" )}</Text>
      </View>
      <View style={styles.progress}>
        <PercentCircle challenge={challenge} />
      </View>
    </TouchableOpacity>
  );
};

export default ChallengeToast;
