// @flow

import React, { useContext } from "react";
import { View } from "react-native";
import type { Node } from "react";

import { viewStyles } from "../../../styles/home/inatCard";
import INatCardLoggedIn from "./iNatCardLoggedIn";
import INatCardLoggedOut from "./iNatCardLoggedOut";
import { UserContext } from "../../UserContext";
import useLatestChallenge from "../Challenges/hooks/challengeCardHooks";
import GreenText from "../../UIComponents/GreenText";

const INatCard = ( ): Node => {
  const { login } = useContext( UserContext );
  const challenge = useLatestChallenge( );

  return (
    <View style={[viewStyles.container, challenge && viewStyles.topMarginWithChallenge]}>
      <View style={viewStyles.headerPadding}>
        <GreenText text="about_inat.inaturalist" />
      </View>
      {login ? <INatCardLoggedIn /> : <INatCardLoggedOut challenge={challenge} />}
    </View>
  );
};

export default INatCard;
