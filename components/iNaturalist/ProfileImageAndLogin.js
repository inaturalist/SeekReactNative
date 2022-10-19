// @flow

import * as React from "react";
import { View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

import { viewStyles, textStyles, imageStyles } from "../../styles/iNaturalist/iNatStats";
import logos from "../../assets/logos";
import i18n from "../../i18n";
import { UserContext } from "../UserContext";
import icons from "../../assets/icons";
import StyledText from "../UIComponents/StyledText";

type Props = {
  count?: number
}

const ProfileImageAndLogin = ( { count }: Props ): React.Node => {
  const { userProfile } = React.useContext( UserContext );
  const { name } = useRoute( );
  const home = "Home";
  const isHomeScreen = name === home;

  const username = "@" + userProfile.login;

  if ( !isHomeScreen && count === null ) {
    return null;
  }

  return (
    <View style={[viewStyles.row, viewStyles.center]}>
      <View>
        <Image
          source={userProfile.icon
            ? { uri: userProfile.icon }
            : icons.noProfilePhoto}
          style={imageStyles.profileIcon}
        />
        {userProfile.icon && <Image source={logos.iNatBadge} style={imageStyles.iNatBadge} />}
      </View>
      <View style={viewStyles.linearGradientTextContainer}>
        <StyledText style={[textStyles.lightText, !isHomeScreen && textStyles.whiteText]}>
          {isHomeScreen
            ? i18n.t( "about_inat.you_are_logged_in" )
            : i18n.t( "about_inat.logged_in_as" )
          }
        </StyledText>
        <StyledText style={[textStyles.loginNameText, !isHomeScreen && textStyles.whiteText]}>
          {isHomeScreen
            ? i18n.t( "about_inat.welcome_back", { username } )
            : username}
        </StyledText>
        {!isHomeScreen && (
          <StyledText style={[textStyles.text, !isHomeScreen && textStyles.whiteText]}>
            {i18n.t( "about_inat.x_observations_posted_to_inat", { count } )}
          </StyledText>
        )}
      </View>
    </View>
  );
};

export default ProfileImageAndLogin;
