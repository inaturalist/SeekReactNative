// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import { requiresParent, formatYearMonthDay } from "../../utility/dateHelpers";
import styles from "../../styles/signup/signup";
import GreenHeader from "../UIComponents/GreenHeader";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import SafeAreaView from "../UIComponents/SafeAreaView";
import DateTimePicker from "../UIComponents/DateTimePicker";

type Props = {
  +navigation: any
}

type State = {
  date: string,
  isDateTimePickerVisible: boolean
}

class AgeVerifyScreen extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      date: formatYearMonthDay(),
      isDateTimePickerVisible: false
    };

    ( this:any ).handleDatePicked = this.handleDatePicked.bind( this );
    ( this:any ).toggleDateTimePicker = this.toggleDateTimePicker.bind( this );
  }


  toggleDateTimePicker = () => {
    const { isDateTimePickerVisible } = this.state;
    this.setState( { isDateTimePickerVisible: !isDateTimePickerVisible } );
  };

  handleDatePicked = ( date: Date ) => {
    if ( date ) {
      this.setState( {
        date: formatYearMonthDay( date )
      }, this.toggleDateTimePicker() );
    }
  };

  submit() {
    const { navigation } = this.props;
    const { date } = this.state;

    if ( requiresParent( date ) ) {
      navigation.navigate( "Parent" );
    } else {
      navigation.navigate( "LicensePhotos" );
    }
  }

  render() {
    const { navigation } = this.props;
    const { isDateTimePickerVisible, date } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <GreenHeader header="login.sign_up" />
        <View style={styles.flexCenter}>
          <Text style={styles.header} allowFontScaling={false}>
            {i18n.t( "inat_signup.enter_birthday" )}
          </Text>
          <Text style={styles.text} allowFontScaling={false}>
            {i18n.t( "inat_signup.permission" )}
          </Text>
          <View style={styles.marginLarge} />
          <View style={styles.center}>
            <TouchableOpacity
              onPress={() => this.toggleDateTimePicker()}
              style={styles.dateButton}
            >
              <Text style={styles.buttonText}>{date}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            isDateTimePickerVisible={isDateTimePickerVisible}
            onDatePicked={this.handleDatePicked}
            toggleDateTimePicker={this.toggleDateTimePicker}
          />
          <View style={styles.marginExtraLarge} />
          <GreenButton
            handlePress={() => this.submit()}
            login
            text="inat_signup.next"
          />
          <View style={[styles.row, styles.center]}>
            <Text
              allowFontScaling={false}
              onPress={() => navigation.navigate( "Privacy" )}
              style={styles.privacy}
            >
              {i18n.t( "inat_signup.privacy" )}
            </Text>
            <Text
              allowFontScaling={false}
              onPress={() => navigation.navigate( "TermsOfService" )}
              style={[styles.privacy, styles.marginLeftSmall]}
            >
              {i18n.t( "inat_signup.terms" )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AgeVerifyScreen;
