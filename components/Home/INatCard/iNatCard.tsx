import React, { useContext } from "react";
import { View } from "react-native";

import { viewStyles } from "../../../styles/home/inatCard";
import { useAppOrientation } from "../../Providers/AppOrientationProvider";
import GreenText from "../../UIComponents/GreenText";
import { UserContext } from "../../UserContext";
import useLatestChallenge from "../Challenges/hooks/challengeCardHooks";
import INatCardLoggedIn from "./iNatCardLoggedIn";
import INatCardLoggedOut from "./iNatCardLoggedOut";

const INatCard = ( ) => {
  const { login } = useContext( UserContext );
  const { isLandscape } = useAppOrientation( );
  const challenge = useLatestChallenge( );

  return (
    <View style={[
      viewStyles.container,
      challenge && viewStyles.topMarginWithChallenge,
    ]}>
      <View style={viewStyles.headerPadding}>
        <GreenText text="about_inat.inaturalist" />
      </View>
      <View style={isLandscape && viewStyles.landscapeContainerRestrictedWidth}>
        {login ? <INatCardLoggedIn /> : <INatCardLoggedOut challenge={challenge} />}
      </View>
    </View>
  );
};

export default INatCard;
