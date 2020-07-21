// @flow

import React, { useState } from "react";
import { View, Text } from "react-native";
import Checkbox from "react-native-check-box";
import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/signup";
import { colors } from "../../../styles/global";
import { checkIsEmailValid } from "../../../utility/loginHelpers";
import ErrorMessage from "../ErrorMessage";
import InputField from "../../UIComponents/InputField";
import GreenText from "../../UIComponents/GreenText";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../../UIComponents/ScrollWithHeader";

const LicensePhotosScreen = () => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState( "" );
  const [licensePhotos, setLicensePhotos] = useState( true );
  const [error, setError] = useState( false );

  const toggleLicensePhotos = () => setLicensePhotos( !licensePhotos );

  const submit = () => {
    if ( checkIsEmailValid( email ) ) {
      setError( false );
      navigate( "Signup", { email, licensePhotos } );
    } else {
      setError( true );
    }
  };

  const renderLink = ( screen, text ) => {
    return (
      <Text
        key={text}
        allowFontScaling={false}
        onPress={() => navigate( screen )}
        style={styles.linkText}
      >
        {i18n.t( `inat_signup.${text}` )}
      </Text>
    );
  };

  const myTagRenderer = ( htmlAttribs, children ) => {
    return (
      <Text
        allowFontScaling={false}
        onPress={() => navigate( "TermsOfService" )}
        style={styles.linkText}
      >
        {i18n.t( "inat_signup.terms" )}
      </Text>
    );
  };

  const html = `<p>${i18n.t( "inat_signup.agree_to_terms" )}</p>`;

  return (
    <ScrollWithHeader header="login.sign_up">
      <View style={styles.leftTextMargins}>
        <GreenText allowFontScaling={false} smaller text="inat_signup.email" />
      </View>
      <InputField
        handleTextChange={value => setEmail( value )}
        placeholder={i18n.t( "inat_signup.email" )}
        text={email}
        type="emailAddress"
      />
      <View style={[styles.row, styles.margin]}>
        <Checkbox
          checkBoxColor={colors.checkboxColor}
          isChecked={licensePhotos}
          onClick={() => toggleLicensePhotos()}
          style={styles.checkBox}
        />
        <Text allowFontScaling={false} style={styles.licenseText}>
          {i18n.t( "inat_signup.release_photos" )}
        </Text>
      </View>
      <View style={[styles.row, styles.margin]}>
        <Checkbox
          checkBoxColor={colors.checkboxColor}
          isChecked={licensePhotos}
          onClick={() => toggleLicensePhotos()}
          style={styles.checkBox}
        />
        <HTML
          html={html}
          tagsStyles={{ p: styles.licenseText }}
          renderers={{
            terms: { renderer: myTagRenderer, wrapper: "Text" },
            // terms: () => renderLink( "TermsOfService", "terms" ),
            privacy: () => renderLink( "Privacy", "privacy" ),
            guidelines: () => renderLink( "CommunityGuidelines", "guidelines" )
          }}
        />
      </View>
      {error ? <ErrorMessage error="email" /> : <View style={styles.greenButtonMargin} />}
      <GreenButton
        handlePress={() => submit()}
        login
        text="inat_signup.next"
      />
    </ScrollWithHeader>
  );
};

export default LicensePhotosScreen;
