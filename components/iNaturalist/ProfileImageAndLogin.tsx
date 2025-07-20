import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";

import { viewStyles, textStyles, imageStyles } from "../../styles/iNaturalist/iNatStats";
import logos from "../../assets/logos";
import i18n from "../../i18n";
import { UserContext } from "../UserContext";
import icons from "../../assets/icons";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  count?: number;
  reload: ( ) => void;
}

const ProfileImageAndLogin = ( { count, reload }: Props ) => {
  const netInfo = useNetInfo();
  const { isConnected } = netInfo;

  const { userProfile } = React.useContext( UserContext );
  const { name } = useRoute();
  const home = "Home";
  const isHomeScreen = name === home;

  const username = "@" + userProfile.login;

  const handlePress = () => {
    reload( );
  };

  if ( !isHomeScreen && ( !isConnected || count === null ) ) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={viewStyles.center}>
          <View
            style={[viewStyles.linearGradientTextContainer, viewStyles.row]}
          >
            <Image source={icons.internet} style={viewStyles.errorImage} />
            <StyledText
              style={[baseTextStyles.body, !isHomeScreen && textStyles.whiteText]}
            >
              {i18n.t( "about_inat.about_inat_internet_error" )}
            </StyledText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[viewStyles.row, viewStyles.center]}>
      <View>
        <Image
          source={
            userProfile.icon ? { uri: userProfile.icon } : icons.noProfilePhoto
          }
          style={imageStyles.profileIcon}
        />
        {userProfile.icon && (
          <Image source={logos.iNatBadge} style={imageStyles.iNatBadge} />
        )}
      </View>
      <View style={viewStyles.linearGradientTextContainer}>
        <StyledText
          style={[baseTextStyles.smallLightHeading, textStyles.lightText, !isHomeScreen && textStyles.whiteText]}
        >
          {isHomeScreen
            ? i18n.t( "about_inat.you_are_logged_in" )
            : i18n.t( "about_inat.logged_in_as" )}
        </StyledText>
        <StyledText
          style={[
            baseTextStyles.emptyState,
            textStyles.loginNameText,
            !isHomeScreen && textStyles.whiteText
          ]}
        >
          {isHomeScreen
            ? i18n.t( "about_inat.welcome_back", { username } )
            : username}
        </StyledText>
        {!isHomeScreen && (
          <StyledText
            style={[baseTextStyles.body, !isHomeScreen && textStyles.whiteText]}
          >
            {i18n.t( "about_inat.x_observations_posted_to_inat", { count } )}
          </StyledText>
        )}
      </View>
    </View>
  );
};

export default ProfileImageAndLogin;
