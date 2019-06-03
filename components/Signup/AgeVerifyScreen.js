// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
  SafeAreaView
} from "react-native";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

import i18n from "../../i18n";
import { requiresParent } from "../../utility/dateHelpers";
import styles from "../../styles/signup/signup";
import GreenHeader from "../GreenHeader";

type Props = {
  navigation: any
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

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader
            navigation={navigation}
            header={i18n.t( "login.sign_up" )}
          />
          <View style={[styles.innerContainer, { flex: 1 }]}>
            <Text style={styles.header}>
              {i18n.t( "inat_signup.enter_birthday" )}
            </Text>
            <Text style={styles.text}>
              {i18n.t( "inat_signup.permission" )}
            </Text>
            <View style={{ marginBottom: 68 }} />
            <TouchableOpacity
              onPress={() => this.showDateTimePicker()}
              style={styles.dateButton}
            >
              <Text style={styles.buttonText}>{date}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              maximumDate={new Date()}
              hideTitleContainerIOS
              datePickerModeAndroid="spinner"
              timePickerModeAndroid="spinner"
            />
            <View style={{ marginBottom: 98 }} />
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() => this.submit()}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "inat_signup.next" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text
                style={styles.privacy}
                onPress={() => navigation.navigate( "Privacy" )}
              >
                {i18n.t( "inat_signup.privacy" )}
              </Text>
              <Text
                style={[styles.privacy, { marginLeft: 14 }]}
                onPress={() => navigation.navigate( "TermsOfService" )}
              >
                {i18n.t( "inat_signup.terms" )}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default AgeVerifyScreen;
