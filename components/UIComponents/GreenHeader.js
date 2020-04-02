// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { withNavigation } from "@react-navigation/compat";
import { useRoute } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/uiComponents/greenHeader";
import BackArrow from "./Buttons/BackArrow";
import CustomBackArrow from "./Buttons/CustomBackArrow";
import posting from "../../assets/posting";

type Props = {
  +header?: ?string,
  +navigation: any,
  +route?: ?string
}

const GreenHeader = ( { header, navigation, route }: Props ) => {
  const { name } = useRoute();

  console.log( name, route, "route" );

  return (
    <View style={styles.container}>
      {route && name !== "Post"
        ? <CustomBackArrow route={route} />
        : <BackArrow />}
      {header && <Text style={styles.text}>{i18n.t( header ).toLocaleUpperCase()}</Text>}
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

export default withNavigation( GreenHeader );
