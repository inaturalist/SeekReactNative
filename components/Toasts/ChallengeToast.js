// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/toasts/badgeToast";
import PercentCircle from "../UIComponents/PercentCircle";

type Props = {
  +navigation: any,
  +challenge: Object
}

const ChallengeToast = ( { navigation, challenge }: Props ) => (
  <TouchableOpacity
    onPress={() => navigation.navigate( "Challenges" )}
  >
    <View style={styles.row}>
      <View>
        <Text style={styles.headerText}>
          {i18n.t( challenge.name ).toLocaleUpperCase()}
        </Text>
        <Text style={styles.description}>
          {i18n.t( "banner.challenge_progress" )}
        </Text>
        <Text style={styles.view}>{i18n.t( "banner.challenge_view" )}</Text>
      </View>
      <View style={styles.progress}>
        <PercentCircle challenge={challenge} />
      </View>
    </View>
  </TouchableOpacity>
);

export default withNavigation( ChallengeToast );
