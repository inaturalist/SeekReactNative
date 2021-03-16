// @flow

import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/match/match";
import { fetchPostingSuccess, savePostingSuccess } from "../../utility/loginHelpers";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { UserContext } from "../UserContext";

type Props = {
  +color: string,
  +taxaInfo: Object
}

const PostToiNat = ( { color, taxaInfo }: Props ) => {
  const navigation = useNavigation( );
  const { login } = useContext( UserContext );
  const [postingSuccess, setPostingSuccess] = useState( false );

  const fetchPostingStatus = async ( ) => {
    const success = await fetchPostingSuccess( );
    if ( success && success === "true" ) {
      savePostingSuccess( false );
      setPostingSuccess( true );
    }
  };

  useEffect( ( ) => {
    navigation.addListener( "focus", ( ) => {
      fetchPostingStatus( );
    } );
  }, [navigation] );

  const navToPostingScreen = ( ) => navigation.navigate( "Post", taxaInfo );

  if ( login && !postingSuccess ) {
    return (
      <>
        <Text style={styles.text}>
          {i18n.t( "results.post_inat" )}
        </Text>
        <View style={styles.marginMedium} />
        <GreenButton
          color={color}
          handlePress={navToPostingScreen}
          text="results.post"
        />
      </>
    );
  }
  return null;
};

export default PostToiNat;
