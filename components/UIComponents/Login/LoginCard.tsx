// @flow

import * as React from "react";
import { View } from "react-native";

import { UserContext } from "../../UserContext";
import INatSignOut from "./iNatSignOut";
import INatLogin from "./iNatLogin";
import { viewStyles } from "../../../styles/iNaturalist/iNatStats";

const LoginCard = ( ): React.Node => {
  const { login } = React.useContext( UserContext );

  return (
    <View style={viewStyles.textContainer}>
      {login ? <INatSignOut /> : <INatLogin />}
    </View>
  );
};

export default LoginCard;
