import * as React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/login";
import GreenText from "../../UIComponents/GreenText";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";
import PrivacyAndTerms from "../../UIComponents/PrivacyAndTerms";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";
import BulletedList from "../../iNaturalist/BulletedList";

const LoginSuccessScreen = ( ) => {
  const { navigate } = useNavigation();

  return (
    <ScrollWithHeader header="inat_signup.welcome">
      <View style={styles.center}>
        <StyledText style={[baseTextStyles.linkedAccountHeader, styles.linkedAccountHeader]}>{i18n.t( "inat_signup.linked_account" )}</StyledText>
      </View>
      <View style={styles.textContainer}>
        <GreenText smaller text="inat_signup.posting" />
        <View style={styles.marginSmall} />
        <StyledText style={baseTextStyles.body}>{i18n.t( "inat_signup.posting_details" )}</StyledText>
        <View style={styles.marginMedium} />
        <GreenText smaller text="inat_signup.observations_not_synced" />
        <View style={styles.marginSmall} />
        <StyledText style={baseTextStyles.body}>
          {i18n.t( "inat_signup.observations_stored_only_in_app" )}
        </StyledText>
        <BulletedList text="inat_signup.observations_bullet_1" />
        <BulletedList text="inat_signup.observations_bullet_2" />
        <BulletedList text="inat_signup.observations_3" />
      </View>
      <View style={styles.marginLarge} />
      <GreenButton
        handlePress={() => navigate( "Drawer" )}
        login
        text="inat_signup.continue"
      />
      <PrivacyAndTerms />
    </ScrollWithHeader>
  );
};

export default LoginSuccessScreen;
