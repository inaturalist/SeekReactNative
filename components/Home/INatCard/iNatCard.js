// @flow

import React, { useContext } from "react";
import { View } from "react-native";
import type { Node } from "react";

import { viewStyles } from "../../../styles/home/challenges";
import INatCardLoggedIn from "./INatCardLoggedIn";
import INatCardLoggedOut from "./INatCardLoggedOut";
import { UserContext } from "../../UserContext";

const INatCard = ( ): Node => {
  const { login } = useContext( UserContext );

  return (
    <View style={viewStyles.container}>
      {login ? <INatCardLoggedIn /> : <INatCardLoggedOut />}
    </View>
  );
};

export default INatCard;
