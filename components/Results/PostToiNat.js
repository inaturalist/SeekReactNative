// @flow

import React, { useState, useEffect } from "react";
import {
  View,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/results/match";
import { fetchPostingSuccess, savePostingSuccess } from "../../utility/loginHelpers";
import GreenButton from "../UIComponents/Buttons/GreenButton";

type Props = {
  +color: string,
  +taxaInfo: Object
}

const PostToiNat = ( { color, taxaInfo }: Props ) => {
  const navigation = useNavigation();
  const [postingSuccess, setPostingSuccess] = useState( false );

  const fetchPostingStatus = async () => {
    const success = await fetchPostingSuccess();
    if ( success && success === "true" ) {
      setPostingSuccess( true );
      savePostingSuccess( false );
    }
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
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

export default PostToiNat;
