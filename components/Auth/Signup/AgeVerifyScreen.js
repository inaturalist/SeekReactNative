// @flow

import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import i18n from "../../../i18n";
import { requiresParent, formatYearMonthDay } from "../../../utility/dateHelpers";
import styles from "../../../styles/auth/signup";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import ViewWithHeader from "../../UIComponents/Screens/ViewWithHeader";
import DateTimePicker from "../../UIComponents/DateTimePicker";
import PrivacyAndTerms from "../../UIComponents/PrivacyAndTerms";

const AgeVerifyScreen = (): Node => {
  const { navigate } = useNavigation();
  const [date, setDate] = useState( formatYearMonthDay() );
  const [isPickerVisible, setPicker] = useState( false );

  const openPicker = () => setPicker( true );
  const closePicker = useCallback( () => setPicker( false ), [] );

  const handleDatePicked = useCallback( ( newDate ) => {
    if ( newDate ) {
      closePicker();
      setDate( formatYearMonthDay( newDate ) );
    }
  }, [closePicker] );

  const submit = () => {
    if ( requiresParent( date ) ) {
      navigate( "Parent" );
    } else {
      navigate( "LicensePhotos" );
    }
  };

  return (
    <ViewWithHeader header="login.sign_up" footer={false}>
      <View style={[styles.flexCenter, styles.whiteContainer]}>
        <Text style={styles.header} allowFontScaling={false}>
          {i18n.t( "inat_signup.enter_birthday" )}
        </Text>
        <Text style={styles.text} allowFontScaling={false}>
          {i18n.t( "inat_signup.permission" )}
        </Text>
        <View style={styles.marginLarge} />
        <TouchableOpacity
          onPress={openPicker}
          style={[styles.dateButton, styles.center]}
        >
          <Text style={styles.buttonText}>{date}</Text>
        </TouchableOpacity>
        {isPickerVisible && (
          <DateTimePicker
            isDateTimePickerVisible={isPickerVisible}
            onDatePicked={handleDatePicked}
            toggleDateTimePicker={closePicker}
          />
        )}
        <View style={styles.marginExtraLarge} />
        <GreenButton
          handlePress={submit}
          login
          text="inat_signup.next"
        />
        <PrivacyAndTerms />
      </View>
    </ViewWithHeader>
  );
};

export default AgeVerifyScreen;
