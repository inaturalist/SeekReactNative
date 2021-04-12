// @flow

import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import type { Node } from "react";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import styles from "../../../styles/home/noChallenges";
import INatCard from "./iNatCard";
import { UserContext } from "../../UserContext";

const NoChallenges = (): Node => {
  const { login } = useContext( UserContext );

  return (
    <>
      <View style={[styles.row, styles.center]}>
        <Image source={icons.completed} />
        <View style={styles.noChallengeTextContainer}>
          <Text style={[styles.largeText, styles.textWidth]}>
            {i18n.t( "challenges.completed_all" )}
          </Text>
          <Text style={[styles.text, styles.textWidth]}>
            {i18n.t( "challenges.no_new_challenges" )}
          </Text>
        </View>
      </View>
      <View style={styles.margin} />
      {!login && <INatCard />}
    </>
  );
};

export default NoChallenges;
