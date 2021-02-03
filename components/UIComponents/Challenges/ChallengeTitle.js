// @flow

import React from "react";
import { Text } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/challenges";
import { formatMonthYear } from "../../../utility/dateHelpers";

type Props = {
  challenge: { availableDate: Date, name: string }
}

const ChallengeTitle = ( { challenge }: Props ) => (
  <>
    <Text style={styles.challengeHeader}>
      {formatMonthYear( challenge.availableDate ).toLocaleUpperCase()}
    </Text>
    <Text style={styles.challengeName}>
      {i18n.t( challenge.name ).toLocaleUpperCase()}
    </Text>
  </>
);

export default ChallengeTitle;
