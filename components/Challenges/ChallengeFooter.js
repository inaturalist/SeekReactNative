// @flow

import React from "react";
import {
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";

import styles from "../../styles/challenges";
import profileImages from "../../assets/profiles";

type Props = {
  latitude: number,
  longitude: number,
  navigation: any,
  badgeCount: number,
  speciesCount: number
}

const ChallengeFooter = ( {
  latitude,
  longitude,
  badgeCount,
  speciesCount,
  navigation
}: Props ) => {
  let profileIcon;
  const species = `Species: ${speciesCount}  `;
  const badges = `Badges: ${badgeCount}`;

  if ( speciesCount >= 0 && speciesCount <= 2 ) {
    profileIcon = <Image source={profileImages[speciesCount]} />;
  } else if ( speciesCount < 15 ) {
    profileIcon = <Image source={profileImages[15]} />;
  } else if ( speciesCount < 35 ) {
    profileIcon = <Image source={profileImages[35]} />;
  } else if ( speciesCount < 65 ) {
    profileIcon = <Image source={profileImages[65]} />;
  } else if ( speciesCount < 100 ) {
    profileIcon = <Image source={profileImages[100]} />;
  } else if ( speciesCount >= 100 ) {
    profileIcon = <Image source={profileImages[101]} />;
  }

  return (
    <View style={styles.footer}>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate( "YourCollection" )}
        >
          {profileIcon}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.speciesCountButton}
          onPress={() => navigation.navigate( "YourCollection" )}
        >
          <Text style={styles.profileText}>
            {species}
            {badges}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={() => navigation.push( "Camera", {
            latitude,
            longitude,
            id: null,
            commonName: null
          } )}
        >
          <Image source={require( "../../assets/btn-add-species/btn-add-species.png" )} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChallengeFooter;
