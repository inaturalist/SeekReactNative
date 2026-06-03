import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/auth/signup";
import { baseTextStyles } from "../../../styles/textStyles";
import { formatYearMonthDay, requiresParent } from "../../../utility/dateHelpers";
import GreenButton from "../../UIComponents/Buttons/GreenButton";
import DateTimePicker from "../../UIComponents/DateTimePicker";
import PrivacyAndTerms from "../../UIComponents/PrivacyAndTerms";
import ViewWithHeader from "../../UIComponents/Screens/ViewWithHeader";
import StyledText from "../../UIComponents/StyledText";

const AgeVerifyScreen = () => {
  const { navigate } = useNavigation();
  const [date, setDate] = useState( formatYearMonthDay() );
  const [isPickerVisible, setPicker] = useState( false );

  const openPicker = () => setPicker( true );
  const closePicker = useCallback( () => setPicker( false ), [] );

  const handleDatePicked = useCallback( ( newDate: Date ) => {
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
        <StyledText style={[baseTextStyles.emptyState, styles.header]} allowFontScaling={false}>
          {i18n.t( "inat_signup.enter_birthday" )}
        </StyledText>
        <StyledText style={[baseTextStyles.body, styles.text]} allowFontScaling={false}>
          {i18n.t( "inat_signup.permission" )}
        </StyledText>
        <View style={styles.marginLarge} />
        <TouchableOpacity
          onPress={openPicker}
          style={[styles.dateButton, styles.center]}
        >
          <StyledText style={baseTextStyles.button}>{date}</StyledText>
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
