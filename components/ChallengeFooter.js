// @flow

import React from "react";

import {
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";

import styles from "../styles/challenges";

type Props = {
  navigation: any
}

const ChallengeFooter = ( { navigation }: Props ) => (
  <View style={styles.footer}>
    <TouchableOpacity
      style={styles.profileButton}
      onPress={() => navigation.navigate( "Loading" )}
    >
      <Image source={require( "../assets/profiles/icn-profile-egg.png" )} />
    </TouchableOpacity>
    <Text style={styles.profileText}>Species: 21  Badges: 3</Text>
    <TouchableOpacity
      style={styles.addPhotoButton}
      onPress={() => navigation.navigate( "Loading" )}
    >
      <Image source={require( "../assets/btn-add-species/btn-add-species.png" )} />
    </TouchableOpacity>
  </View>
);

export default ChallengeFooter;
