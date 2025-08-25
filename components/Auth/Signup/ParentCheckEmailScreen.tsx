import * as React from "react";
import { View } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/signup";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

const ParentCheckEmailScreen = ( { navigation } ) => (
  <ScrollWithHeader header="login.sign_up">
    <View style={styles.flexCenter}>
      <StyledText style={[baseTextStyles.passwordEmailHeader, styles.headerText]}>
        {i18n.t( "inat_signup.thanks" ).toLocaleUpperCase()}
      </StyledText>
      <StyledText style={[baseTextStyles.body, styles.text]}>
        {i18n.t( "inat_signup.parent_instructions" )}
      </StyledText>
      <View style={styles.marginTop} />
      <GreenButton
        fontSize={16}
        handlePress={() => navigation.popTo( "Drawer" )}
        login
        text="inat_signup.continue_no_log_in"
      />
    </View>
  </ScrollWithHeader>
);

export default ParentCheckEmailScreen;
