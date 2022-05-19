// @flow

import React, { useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";
import Modal from "react-native-modal";

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
import WhiteModal from "../../UIComponents/Modals/WhiteModal";

const LicensePhotosScreen = ( ): Node => {
  const { navigate } = useNavigation( );

  const [user, setUser] = useState( {
    email: "",
    preferred_observation_license: false,
    preferred_photo_license: false,
    pi_consent: false,
    data_transfer_consent: false
  } );

  const { email } = user;

  console.log( user, "user in license photos screen" );

  const [error, setError] = useState( false );
  const [agreeTerms, setAgreeTerms] = useState( false );
  const [showModal, setShowModal] = useState( false );

  const closeModal = ( ) => setShowModal( false );

  const toggleLicensePhotos = ( ) => setUser( {
    ...user,
    preferred_observation_license: !user.preferred_observation_license ? "CC-BY-NC" : null,
    preferred_photo_license: !user.preferred_photo_license ? "CC-BY-NC" : null
 } );

  const toggleAgreeTerms = ( ) => setAgreeTerms( !agreeTerms );

  const togglePIConsent = ( ) => setUser( {
    ...user,
    pi_consent: !user.pi_consent
 } );

  const toggleDataTransferConsent = ( ) => setUser( {
    ...user,
    data_transfer_consent: !user.data_transfer_consent
 } );

  const submit = ( ) => {
    if ( checkIsEmailValid( email ) ) {
      setError( false );
      navigate( "Signup", { user } );
    } else {
      setError( true );
    }
  };

  const renderLink = ( screen, text ) => {
    return (
      <Text
        key={text}
        allowFontScaling={false}
        onPress={( ) => {
          navigate( screen );
          if ( showModal ) {
            setShowModal( false );
          }
        }}
        style={styles.linkText}
      >
        {i18n.t( `inat_signup.${text}` )}
      </Text>
    );
  };

  const agreeToTermsHTML = `<p>${i18n.t( "inat_signup.agree_to_terms" )}</p>`;

  const handleEmailInput = value => setUser( {
    ...user,
    email: value
  } );

  const showLicensingAlert = ( ) => (
    Alert.alert(
      i18n.t( "inat_signup.about_licenses" ),
      i18n.t( "inat_signup.learn_more_about_licensing" )
    )
  );

  const showPIConsentAlert = ( ) => (
    Alert.alert(
      i18n.t( "inat_signup.about_personal_information" ),
      i18n.t( "inat_signup.learn_more_about_data_storage" )
    )
  );

  const dataTransferLearnMoreHTML = `<p>${i18n.t( "inat_signup.learn_more_about_data_transfer" )}</p>
    <p><p>${i18n.t( "inat_signup.learn_more_about_data_transfer_2" )}</p>
    <p><p>${i18n.t( "inat_signup.learn_more_about_data_transfer_3" )}</p>
    <p><p>${i18n.t( "inat_signup.learn_more_about_data_transfer_4" )}</p>
    <p><p><p><p><p>`;

  const dataTransferHTML = ( ) => (
    <HTML
      source={{ html: dataTransferLearnMoreHTML }}
      tagsStyles={{ p: styles.licenseText }}
      renderers={{
        privacy: { renderer: ( ) => renderLink( "Privacy", "privacy" ), wrapper: "Text" },
        terms: { renderer: ( ) => renderLink( "TermsOfService", "terms" ), wrapper: "Text" }
      }}
    />
  );

  const renderDataTransferModal = ( ) => (
    <Modal
      isVisible={showModal}
      onBackdropPress={closeModal}
      useNativeDriverForBackdrop
      useNativeDriver
    >
      <WhiteModal closeModal={closeModal}>
        <ScrollView style={styles.scrollView}>
          {dataTransferHTML( )}
        </ScrollView>
      </WhiteModal>
    </Modal>
  );

  const disableButton = !agreeTerms || !user.pi_consent || !user.data_transfer_consent;

  const licensePhotos = user.preferred_observation_license ? true : false;

  return (
    <ScrollWithHeader header="login.sign_up">
      <View style={styles.leftTextMargins}>
        <GreenText allowFontScaling={false} smaller text="inat_signup.email" />
      </View>
      <InputField
        handleTextChange={handleEmailInput}
        placeholder={i18n.t( "inat_signup.email" )}
        text={email}
        type="emailAddress"
      />
      <CheckboxRow
        isChecked={licensePhotos}
        toggleCheckbox={toggleLicensePhotos}
        children={(
          <Text style={styles.licenseText}>
            {`${i18n.t( "inat_signup.release_photos" )} `}
            <Text style={styles.linkText} onPress={showLicensingAlert}>
              {i18n.t( "inat_signup.learn_more" )}
            </Text>
          </Text>
        )}
      />
      <CheckboxRow
        isChecked={agreeTerms}
        toggleCheckbox={toggleAgreeTerms}
        children={(
          <HTML
            source={{ html: agreeToTermsHTML }}
            tagsStyles={{ p: styles.licenseText }}
            renderers={{
              terms: { renderer: ( ) => renderLink( "TermsOfService", "terms" ), wrapper: "Text" },
              privacy: { renderer: ( ) => renderLink( "Privacy", "privacy" ), wrapper: "Text" },
              guidelines: { renderer: ( ) => renderLink( "CommunityGuidelines", "guidelines" ), wrapper: "Text" }
            }}
          />
        )}
      />
      <CheckboxRow
        isChecked={user.pi_consent}
        toggleCheckbox={togglePIConsent}
        children={(
          <Text style={styles.licenseText}>
            {`${i18n.t( "inat_signup.store_data" )} `}
            <Text style={styles.linkText} onPress={showPIConsentAlert}>
              {i18n.t( "inat_signup.learn_more" )}
            </Text>
          </Text>
        )}
      />
      {renderDataTransferModal( )}
      <CheckboxRow
        isChecked={user.data_transfer_consent}
        toggleCheckbox={toggleDataTransferConsent}
        children={(
          <Text style={styles.licenseText}>
            {`${i18n.t( "inat_signup.transfer_data" )} `}
            <Text style={styles.linkText} onPress={( ) => setShowModal( true )}>
              {i18n.t( "inat_signup.learn_more" )}
            </Text>
          </Text>
        )}
      />
      {error ? <ErrorMessage error="email" /> : <View style={styles.marginTopSmall} />}
      <GreenButton
        color={( disableButton ) && colors.seekTransparent}
        handlePress={submit}
        login
        text="inat_signup.next"
        disabled={disableButton}
      />
    </ScrollWithHeader>
  );
};

export default LicensePhotosScreen;
