import * as React from "react";
import {
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { textStyles, viewHeaderStyles } from "../../styles/uiComponents/greenHeader";
import BackArrow from "./Buttons/BackArrow";
import posting from "../../assets/posting";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly route?: string | null;
  readonly header?: string | null;
  plainText?: string;
}

const GreenHeader = ( { header = null, route = null, plainText }: Props ) => {
  const navigation = useNavigation();
  const { name } = useRoute();

  return (
    <View style={[viewHeaderStyles.container, viewHeaderStyles.center]}>
      {name !== "LoginSuccess" && <BackArrow route={route} />}
      {header && (
        <StyledText allowFontScaling={false} style={[baseTextStyles.button, textStyles.text]}>
          {i18n.t( header ).toLocaleUpperCase()}
        </StyledText>
      )}
      {plainText && (
        <StyledText allowFontScaling={false} style={[baseTextStyles.button, textStyles.text]}>
          {plainText.toLocaleUpperCase( )}
        </StyledText>
      )}
      {name === "Post" && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.open_posting_elp" )}
          accessible
          onPress={() => navigation.navigate( "PostingHelp" )}
          style={viewHeaderStyles.help}
        >
          <Image source={posting.postingHelp} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GreenHeader;
