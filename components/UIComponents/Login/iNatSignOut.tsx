import React, { useContext } from "react";

import i18n from "../../../i18n";
import { textStyles } from "../../../styles/iNaturalist/iNatStats";
import { baseTextStyles } from "../../../styles/textStyles";
import { removeAccessToken } from "../../../utility/loginHelpers";
import { UserContext } from "../../UserContext";
import GreenButton from "../Buttons/GreenButton";
import StyledText from "../StyledText";

const INatSignOut = ( ) => {
  const { updateLogin } = useContext( UserContext );

  const logUserOut = async ( ) => {
    const loggedOut = await removeAccessToken( );
    if ( loggedOut !== false ) {
      updateLogin( );
    }
  };

  return (
    <>
      <StyledText style={[baseTextStyles.body, textStyles.loginLogoutText]}>
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
