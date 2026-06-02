import * as React from "react";
import { View } from "react-native";

import { viewStyles } from "../../../styles/iNaturalist/iNatStats";
import { UserContext } from "../../UserContext";
import INatLogin from "./iNatLogin";
import INatSignOut from "./iNatSignOut";

const LoginCard = ( ) => {
  const { login } = React.useContext( UserContext );

  return (
    <View style={viewStyles.textContainer}>
      {login ? <INatSignOut /> : <INatLogin />}
    </View>
  );
};

export default LoginCard;
