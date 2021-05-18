// @flow

import React, { useContext } from "react";
import { Text } from "react-native";
import type { Node } from "react";

import { textStyles } from "../../styles/iNaturalist/iNatStats";
import i18n from "../../i18n";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { removeAccessToken } from "../../utility/loginHelpers";
import { UserContext } from "../UserContext";

const INatSignOut = ( ): Node => {
  const { updateLogin } = useContext( UserContext );

  const logUserOut = async ( ) => {
    const loggedOut = await removeAccessToken( );
    if ( loggedOut === null ) {
      updateLogin( );
    }
  };

  return (
    <>
      <Text style={[textStyles.text, textStyles.loginLogoutText]}>
        {i18n.t( "about_inat.upload_and_track_obs_using_inat" )}
      </Text>
      <GreenButton
        handlePress={logUserOut}
        text="about_inat.sign_out"
      />
    </>
  );
};

export default INatSignOut;
