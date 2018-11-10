// @flow

import React, { Component } from "react";

import {
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";

import styles from "../../styles/challenges";

type Props = {
  latitude: number,
  longitude: number,
  navigation: any,
  badgeCount: number,
  speciesCount: number
}

class ChallengeFooter extends Component<Props> { 
  constructor( {
    latitude,
    longitude,
    navigation,
    badgeCount,
    speciesCount
  }: Props ) {
    super();
  }

  render() {
    const {
      latitude,
      longitude,
      badgeCount,
      speciesCount,
      navigation
    } = this.props;

    let profileIcon;
    const species = `Species: ${speciesCount}  `;
    const badges = `Badges: ${badgeCount}`;

    if ( speciesCount <= 0 ) {
      profileIcon = <Image source={require( "../../assets/profiles/icn-profile-egg.png" )} />;
    } else if ( speciesCount === 1 ) {
      profileIcon = <Image source={require( "../../assets/profiles/icn-profile-egg-crack-01.png" )} />;
    } else if ( speciesCount === 2 ) {
      profileIcon = <Image source={require( "../../assets/profiles/icn-profile-egg-crack-02.png" )} />;
    } else if ( speciesCount < 15 ) {
      profileIcon = <Image source={require( "../../assets/profiles/icn-profile-tadpole.png" )} />;
    } else if ( speciesCount < 35 ) {
      profileIcon = <Image source={require( "../../assets/profiles/icn-profile-cub.png" )} />;
    } else if ( speciesCount < 65 ) {
      profileIcon = <Image source={require( "../../assets/profiles/icn-profile-surveyor.png" )} />;
    } else if ( speciesCount < 100 ) {
      profileIcon = <Image source={require( "../../assets/profiles/icn-profile-naturalist.png" )} />;
    } else if ( speciesCount >= 100 ) {
      profileIcon = <Image source={require( "../../assets/profiles/icn-profile-explorer.png" )} />;
    }

    return (
      <View style={styles.footer}>
        <View style={styles.bottomNavigation}>
          <View style={styles.profile}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate( "YourCollection" )}
            >
              {profileIcon}
              <Text style={styles.profileText}>
                {species}
                {badges}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={() => navigation.navigate( "Camera", { latitude, longitude } )}
          >
            <Image source={require( "../../assets/btn-add-species/btn-add-species.png" )} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChallengeFooter;
