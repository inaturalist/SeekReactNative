// @flow

import React, { useCallback } from "react";
import { View, Image, BackHandler, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import styles from "../../styles/match/match";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import icons from "../../assets/icons";

type Props = {
  gradientDark: string,
  gradientLight: string,
  setNavigationPath: Function,
  params: Object
}

const MatchHeader = ( {
  gradientDark,
  gradientLight,
  setNavigationPath,
  params
}: Props ) => {
  const { image, taxon } = params;

  useFocusEffect(
    useCallback( ( ) => {
      const onBackPress = ( ) => {
        setNavigationPath( "Camera" );
        return true; // following custom Android back behavior template in React Navigation
      };

      BackHandler.addEventListener( "hardwareBackPress", onBackPress );

      return ( ) => BackHandler.removeEventListener( "hardwareBackPress", onBackPress );
    }, [setNavigationPath] )
  );

  const setCameraPath = ( ) => setNavigationPath( "Camera" );
  const showSocialSharing = ( ) => setNavigationPath( "Social" );

  console.log( image.uri, "image uri in header" );

  return (
    // $FlowFixMe
    <LinearGradient colors={[gradientDark, gradientLight]} style={styles.header}>
      <CustomBackArrow handlePress={setCameraPath} style={styles.backButton} />
      <View style={[styles.imageContainer, styles.buttonContainer]}>
        <Image source={{ uri: image.uri }} style={styles.imageCell} />
        {( taxon && taxon.speciesSeenImage ) && (
          <>
            {/* <TouchableOpacity onPress={showSocialSharing}>
              <Image source={icons.iconShare} />
            </TouchableOpacity> */}
            <Image source={{ uri: taxon.speciesSeenImage }} style={[styles.imageCell, styles.marginLeft]} />
          </>
        )}
        <TouchableOpacity style={styles.socialIcon} onPress={showSocialSharing}>
          <Image source={icons.iconShare} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default MatchHeader;
