// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/greenHeader";
import BackArrow from "./Buttons/BackArrow";
import posting from "../../assets/posting";

type Props = {
  +header?: ?string,
  +route?: ?string
}

const GreenHeader = ( { header, route }: Props ) => {
  const navigation = useNavigation();
  const { name } = useRoute();

  return (
    <View style={[styles.container, styles.center]}>
      {name !== "LoginSuccess" && <BackArrow route={route} />}
      {header && (
        <Text allowFontScaling={false} style={styles.text}>
          {i18n.t( header ).toLocaleUpperCase()}
        </Text>
      )}
      {name === "Post" && (
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.help" )}
          accessible
          onPress={() => navigation.navigate( "PostingHelp" )}
          style={styles.help}
        >
          <Image source={posting.postingHelp} />
        </TouchableOpacity>
      )}
    </View>
  );
};

GreenHeader.defaultProps = {
  route: null,
  header: null
};

export default GreenHeader;
