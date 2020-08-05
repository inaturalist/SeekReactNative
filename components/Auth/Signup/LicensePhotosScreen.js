// @flow

import React, { useState } from "react";
import { View, Text } from "react-native";
import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../../i18n";
import { colors } from "../../../styles/global";
import styles from "../../../styles/auth/signup";
import { checkIsEmailValid } from "../../../utility/loginHelpers";
import ErrorMessage from "../ErrorMessage";
import InputField from "../../UIComponents/InputField";
import GreenText from "../../UIComponents/GreenText";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../../UIComponents/Screens/ScrollWithHeader";
import CheckboxRow from "./CheckboxRow";

const LicensePhotosScreen = () => {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState( "" );
  const [licensePhotos, setLicensePhotos] = useState( true );
  const [error, setError] = useState( false );
  const [storeData, setStoreData] = useState( false );
  const [agreeTerms, setAgreeTerms] = useState( false );

  const toggleLicensePhotos = () => setLicensePhotos( !licensePhotos );
  const toggleAgreeTerms = () => setAgreeTerms( !agreeTerms );
  const toggleStoreData = () => setStoreData( !storeData );

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
      <CheckboxRow
        isChecked={licensePhotos}
        toggleCheckbox={toggleLicensePhotos}
        text={i18n.t( "inat_signup.release_photos" )}
      />
      <CheckboxRow
        isChecked={agreeTerms}
        toggleCheckbox={toggleAgreeTerms}
        children={(
          <HTML
            html={html}
            tagsStyles={{ p: styles.licenseText }}
            renderers={{
              terms: { renderer: () => renderLink( "TermsOfService", "terms" ), wrapper: "Text" },
              privacy: { renderer: () => renderLink( "Privacy", "privacy" ), wrapper: "Text" },
              guidelines: { renderer: () => renderLink( "CommunityGuidelines", "guidelines" ), wrapper: "Text" }
            }}
          />
        )}
      />
      <CheckboxRow
        isChecked={storeData}
        toggleCheckbox={toggleStoreData}
        text={i18n.t( "inat_signup.store_data" )}
      />
      {error ? <ErrorMessage error="email" /> : <View style={styles.marginTopSmall} />}
      <GreenButton
        color={( !agreeTerms || !storeData ) && colors.seekTransparent}
        handlePress={() => submit()}
        login
        text="inat_signup.next"
        disabled={!agreeTerms || !storeData}
      />
    </ScrollWithHeader>
  );
};

export default LicensePhotosScreen;
