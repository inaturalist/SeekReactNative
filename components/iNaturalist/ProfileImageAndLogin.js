// @flow

import * as React from "react";
import { View, Text, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../styles/iNaturalist/iNatStats";
import logos from "../../assets/logos";
import i18n from "../../i18n";

const ProfileImageAndLogin = ( ): React.Node => {
  const { name } = useRoute( );

  const username = "@amanda";
  const count = 0;

  return (
    <View style={[viewStyles.row, viewStyles.center]}>
      {/* <Image source={logos.iNatAppIcon} /> */}
      {/* <Image source={logos.iNatBadge} /> */}
      <View style={viewStyles.linearGradientTextContainer}>
        <Text style={[textStyles.lightText, name !== "Home" && textStyles.whiteText]}>
          {name === "Home"
            ? i18n.t( "about_inat.you_are_logged_in" )
            : i18n.t( "about_inat.logged_in_as" )
          }
        </Text>
        <Text style={[textStyles.loginNameText, name !== "Home" && textStyles.whiteText]}>
          {name === "Home"
            ? i18n.t( "about_inat.welcome_back", { username } )
            : username}
        </Text>
        {name !== "Home" && (
          <Text style={[textStyles.text, name !== "Home" && textStyles.whiteText]}>
            {i18n.t( "about_inat.x_observations_posted_to_inat", { count } )}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ProfileImageAndLogin;
