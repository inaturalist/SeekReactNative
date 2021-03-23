import * as React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../../styles/home/noChallenges";
import logos from "../../../assets/logos";
import GreenText from "../../UIComponents/GreenText";
import i18n from "../../../i18n";
import GreenButton from "../../UIComponents/Buttons/GreenButton";

const INatCard = () => {
  const navigation = useNavigation();

  const navToLogin = ( ) => navigation.navigate( "LoginOrSignup" );

  return (
    <View style={styles.container}>
      <GreenText text="inat_card.header" />
      <View style={styles.marginSmall} />
      <View style={[styles.row, styles.center]}>
        <Image source={logos.iNatAppIcon} />
        <View style={styles.marginLeft} />
        <Text style={[styles.largeText, styles.textWidth]}>{i18n.t( "inat_card.header_1" )}</Text>
      </View>
      <View style={styles.marginSmall} />
      {[1, 2, 3].map( ( item ) => (
        <View key={item.toString()} style={[styles.bullets, styles.row]}>
          <Text style={styles.marginRight}>
            &#8226;
          </Text>
          <Text style={[styles.text, styles.bulletWidth]}>
            {i18n.t( `inat_card.text_${item}` )}
          </Text>
        </View>
      ) )}
      <View style={styles.marginExtraSmall} />
      <Text style={[styles.text, styles.bullets]}>{i18n.t( "inat_card.download" )}</Text>
      <View style={styles.marginSmall} />
      <GreenButton
        handlePress={navToLogin}
        text="inat_stats.join"
      />
    </View>
  );
};

export default INatCard;
