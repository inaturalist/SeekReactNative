// @flow

import * as React from "react";

import GreenButton from "../../UIComponents/Buttons/GreenButton";
import { colors } from "../../../styles/global";

const OpenINatButton = ( ): React.Node => {
  const openAppOrDownloadPage = ( ) => console.log( "tbd open inat button" );

  return (
    <GreenButton
      color={colors.seekiNatGreen}
      text="about_inat.open_inaturalist"
      handlePress={openAppOrDownloadPage}
    />
  );
};

export default OpenINatButton;
