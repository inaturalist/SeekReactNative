import * as React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../../styles/home/inatCard";
import logos from "../../../assets/logos";
import GreenText from "../../UIComponents/GreenText";
import i18n from "../../../i18n";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import useLatestChallenge from "../Challenges/hooks/challengeCardHooks";

const INatCardLoggedOut = () => {
  const navigation = useNavigation( );
  const challenge = useLatestChallenge( );

  const navToLogin = ( ) => navigation.navigate( "LoginOrSignup" );

  return (
    <View style={viewStyles.container}>
      <GreenText text="about_inat.inaturalist" />
      <View style={[viewStyles.row, viewStyles.center, viewStyles.secondHeader]}>
        <Image source={logos.iNatAppIcon} />
        <Text style={textStyles.secondHeaderText}>
          {challenge
            ? i18n.t( "about_inat.dive_deeper_with_inat" )
            : i18n.t( "about_inat.we_think_youll_like_inat" )}
        </Text>
      </View>
      {[1, 2, 3].map( ( item ) => (
        <View key={item.toString()} style={[viewStyles.bullets, viewStyles.row]}>
          <Text style={textStyles.marginRight}>
            &#8226;
          </Text>
          <Text style={[textStyles.text, viewStyles.bulletWidth]}>
            {i18n.t( `inat_card.text_${item}` )}
          </Text>
        </View>
      ) )}
      <View style={viewStyles.marginExtraSmall} />
      <Text style={[textStyles.text, viewStyles.bullets]}>
        {i18n.t( "about_inat.get_started_by_downloading_inat" )}
      </Text>
      <View style={viewStyles.marginSmall} />
      <GreenButton
        handlePress={navToLogin}
        text="login.log_in"
      />
    </View>
  );
};

export default INatCardLoggedOut;
