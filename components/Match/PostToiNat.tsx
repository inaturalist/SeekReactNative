import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/match/match";
import { baseTextStyles } from "../../styles/textStyles";
import { fetchPostingSuccess } from "../../utility/loginHelpers";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import StyledText from "../UIComponents/StyledText";
import { UserContext } from "../UserContext";

interface Props {
  readonly color: string;
  readonly taxaInfo: {
    commonName?: string | null;
    taxaId?: number | null;
    scientificName?: string | null;
  };
}

const PostToiNat = ( { color, taxaInfo }: Props ) => {
  const navigation = useNavigation( );
  // TODO: UserContext to TS
  const { login } = useContext( UserContext );
  const [postingSuccess, setPostingSuccess] = useState( false );

  const fetchPostingStatus = async ( ) => {
    const success = await fetchPostingSuccess( );
    if ( success && success === "true" ) {
      setPostingSuccess( true );
    } else {
      setPostingSuccess( false );
    }
  };

  useEffect( ( ) => {
    const unsubscribe = navigation.addListener( "focus", ( ) => {
      fetchPostingStatus( );
    } );

    return unsubscribe;
  }, [navigation] );

  // TODO: navigation to TS
  const navToPostingScreen = ( ) => navigation.navigate( "Post", taxaInfo );

  if ( login && !postingSuccess ) {
    return (
      <>
        <StyledText style={[baseTextStyles.body, styles.text]}>
          {i18n.t( "results.post_inat" )}
        </StyledText>
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
