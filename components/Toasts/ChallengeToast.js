// @flow

import * as React from "react";
import {
  View,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/toasts/badgeToast";
import PercentCircle from "../UIComponents/PercentCircle";
import { ChallengeContext } from "../UserContext";
import StyledText from "../UIComponents/StyledText";

type Props = {
  +challenge: Object
}

const ChallengeToast = ( { challenge }: Props ): React.Node => {
  const { setIndex } = React.useContext( ChallengeContext );
  const navigation = useNavigation( );

  const navToChallenge = ( ) => {
    setIndex( challenge.index );
    navigation.navigate( "ChallengeDetails" );
  };

  return (
    <TouchableOpacity
      onPress={navToChallenge}
      style={viewStyles.row}
    >
      <View>
        <StyledText allowFontScaling={false} style={textStyles.headerText}>
          {i18n.t( challenge.name ).toLocaleUpperCase()}
        </StyledText>
        <StyledText allowFontScaling={false} style={textStyles.description}>
          {i18n.t( "banner.challenge_progress" )}
        </StyledText>
        <StyledText allowFontScaling={false} style={textStyles.view}>{i18n.t( "banner.challenge_view" )}</StyledText>
      </View>
      <View style={viewStyles.progress}>
        <PercentCircle challenge={challenge} />
      </View>
    </TouchableOpacity>
  );
};

export default ChallengeToast;
