// @flow

import React, { useContext } from "react";
import type { Node } from "react";

import { textStyles } from "../../../styles/iNaturalist/iNatStats";
import i18n from "../../../i18n";
import GreenButton from "../Buttons/GreenButton";
import { removeAccessToken } from "../../../utility/loginHelpers";
import { UserContext } from "../../UserContext";
import StyledText from "../StyledText";

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
      <StyledText style={[textStyles.text, textStyles.loginLogoutText]}>
        {i18n.t( "about_inat.upload_and_track_obs_using_inat" )}
      </StyledText>
      <GreenButton
        handlePress={logUserOut}
        text="about_inat.sign_out"
      />
    </>
  );
};

export default INatSignOut;
