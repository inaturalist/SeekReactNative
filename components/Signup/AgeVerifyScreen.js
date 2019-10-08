// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Appearance } from "react-native-appearance";

import i18n from "../../i18n";
import { requiresParent } from "../../utility/dateHelpers";
import styles from "../../styles/signup/signup";
import GreenHeader from "../UIComponents/GreenHeader";
import GreenButton from "../UIComponents/GreenButton";
import SafeAreaView from "../UIComponents/SafeAreaView";

type Props = {
  +navigation: any
}

class AgeVerifyScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      date: moment().format( "YYYY-MM-DD" ),
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState( { isDateTimePickerVisible: true } );
  };

  hideDateTimePicker = () => {
    this.setState( { isDateTimePickerVisible: false } );
  };

  handleDatePicked = ( date ) => {
    if ( date ) {
      this.setState( {
        date: moment( date ).format( "YYYY-MM-DD" )
      }, this.hideDateTimePicker() );
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
    const colorScheme = Appearance.getColorScheme();

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <GreenHeader
          header={i18n.t( "login.sign_up" )}
          navigation={navigation}
        />
        <View style={styles.flexCenter}>
          <Text style={styles.header}>
            {i18n.t( "inat_signup.enter_birthday" )}
          </Text>
          <Text style={styles.text}>
            {i18n.t( "inat_signup.permission" )}
          </Text>
          <View style={{ marginBottom: 68 }} />
          <View style={styles.center}>
            <TouchableOpacity
              onPress={() => this.showDateTimePicker()}
              style={styles.dateButton}
            >
              <Text style={styles.buttonText}>{date}</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            datePickerModeAndroid="spinner"
            hideTitleContainerIOS
            isDarkModeEnabled={colorScheme === "dark"}
            isVisible={isDateTimePickerVisible}
            maximumDate={new Date()}
            onCancel={this.hideDateTimePicker}
            onConfirm={this.handleDatePicked}
            timePickerModeAndroid="spinner"
          />
          <View style={{ marginBottom: 98 }} />
          <GreenButton
            handlePress={() => this.submit()}
            login
            text={i18n.t( "inat_signup.next" ).toLocaleUpperCase()}
          />
          <View style={[styles.row, styles.center]}>
            <Text
              onPress={() => navigation.navigate( "Privacy" )}
              style={styles.privacy}
            >
              {i18n.t( "inat_signup.privacy" )}
            </Text>
            <Text
              onPress={() => navigation.navigate( "TermsOfService" )}
              style={[styles.privacy, { marginLeft: 14 }]}
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
