// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text
} from "react-native";
import { withNavigation } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/results/match";
import { fetchPostingSuccess, savePostingSuccess } from "../../utility/loginHelpers";
import GreenButton from "../UIComponents/GreenButton";

type Props = {
  +navigation: any,
  +color: string,
  +taxaInfo: Object
}

const PostToiNat = ( { navigation, color, taxaInfo }: Props ) => {
  const [postingSuccess, setPostingSuccess] = useState( false );

  const fetchPostingStatus = async () => {
    const success = await fetchPostingSuccess();
    if ( success && success === "true" ) {
      setPostingSuccess( true );
      savePostingSuccess( false );
    }
  };

  useEffect( () => {
    navigation.addListener( "willFocus", () => {
      fetchPostingStatus();
    } );
  }, [navigation] );

  return (
    <>
      {!postingSuccess && (
        <>
          <Text style={styles.text}>
            {i18n.t( "results.post_inat" )}
          </Text>
          <View style={styles.marginMedium} />
          <GreenButton
            color={color}
            handlePress={() => navigation.navigate( "Post", taxaInfo )}
            text="results.post"
          />
        </>
      )}
    </>
  );
};

export default withNavigation( PostToiNat );
