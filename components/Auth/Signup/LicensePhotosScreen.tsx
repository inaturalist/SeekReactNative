import React, { useState } from "react";
import { View, Alert, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
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
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

const LicensePhotosScreen = ( ) => {
  const { navigate } = useNavigation( );

  const [user, setUser] = useState<{
    email: string;
    preferred_observation_license: boolean | string | null;
    preferred_photo_license: boolean | string | null;
    pi_consent: boolean;
    data_transfer_consent: boolean;
  }>( {
    email: "",
    preferred_observation_license: false,
    preferred_photo_license: false,
    pi_consent: false,
    data_transfer_consent: false
  } );

  const { email } = user;

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

  // TODO: navigation TS; screen should be a type of screen name
  const renderLink = ( screen: string, text: string ) => {
    return (
      <StyledText
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
      </StyledText>
    );
  };

  const agreeToTermsHTML = `<p>${i18n.t( "inat_signup.agree_to_terms" )}</p>`;

  const handleEmailInput = ( value: string ) => setUser( {
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
      tagsStyles={{ p: { ...baseTextStyles.body, ...styles.licenseText } }}
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
      // the following two lines prevent flickering
      // while modal is closing
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
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
    <ScrollWithHeader header="login.sign_up" style={styles.bottomPadding}>
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
          <StyledText style={[baseTextStyles.body, styles.licenseText]}>
            {`${i18n.t( "inat_signup.release_photos" )} `}
            <StyledText style={styles.linkText} onPress={showLicensingAlert}>
              {i18n.t( "inat_signup.learn_more" )}
            </StyledText>
          </StyledText>
        )}
      />
      <CheckboxRow
        isChecked={agreeTerms}
        toggleCheckbox={toggleAgreeTerms}
        children={(
          <HTML
            source={{ html: agreeToTermsHTML }}
            tagsStyles={{ p: { ...baseTextStyles.body, ...styles.licenseText } }}
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
          <StyledText style={[baseTextStyles.body, styles.licenseText]}>
            {`${i18n.t( "inat_signup.store_data" )} `}
            <StyledText style={styles.linkText} onPress={showPIConsentAlert}>
              {i18n.t( "inat_signup.learn_more" )}
            </StyledText>
          </StyledText>
        )}
      />
      {renderDataTransferModal( )}
      <CheckboxRow
        isChecked={user.data_transfer_consent}
        toggleCheckbox={toggleDataTransferConsent}
        children={(
          <StyledText style={[baseTextStyles.body, styles.licenseText]}>
            {`${i18n.t( "inat_signup.transfer_data" )} `}
            <StyledText style={styles.linkText} onPress={( ) => setShowModal( true )}>
              {i18n.t( "inat_signup.learn_more" )}
            </StyledText>
          </StyledText>
        )}
      />
      {error ? <ErrorMessage error="email" /> : <View style={styles.marginTopSmall} />}
      <GreenButton
        color={disableButton ? colors.seekTransparent : null}
        handlePress={submit}
        login
        text="inat_signup.next"
        disabled={disableButton}
      />
      <View style={styles.bottomPadding} />
    </ScrollWithHeader>
  );
};

export default LicensePhotosScreen;
