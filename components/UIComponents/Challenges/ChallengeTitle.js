// @flow

import * as React from "react";
import { Text } from "react-native";

import i18n from "../../../i18n";
import { textStyles } from "../../../styles/uiComponents/challenges";
import { formatMonthYear } from "../../../utility/dateHelpers";

type Props = {
  challenge: {
    index: number,
    percentComplete: number,
    startedDate: Date,
    availableDate: Date,
    backgroundName: string,
    name: string,
    logo: string,
    sponsorName: string,
    secondLogo: string,
    earnedIconName: string,
    badgeName: string
  },
}

const ChallengeTitle = ( { challenge }: Props ): React.Node => (
  <>
    <Text style={textStyles.challengeHeader}>
      {formatMonthYear( challenge.availableDate ).toLocaleUpperCase()}
    </Text>
    <Text style={textStyles.challengeName}>
      {i18n.t( challenge.name ).toLocaleUpperCase()}
    </Text>
  </>
);

export default ChallengeTitle;
