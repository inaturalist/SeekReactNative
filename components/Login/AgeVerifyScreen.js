// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  DatePickerIOS,
  DatePickerAndroid,
  Platform
} from "react-native";
import moment from "moment";

import i18n from "../../i18n";
import { requiresParent } from "../../utility/helpers";
import styles from "../../styles/login/login";

type Props = {
  navigation: any
}

class AgeVerifyScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      chosenDate: null
    };

    this.setDate = this.setDate.bind( this );
  }

  setDate( newDate ) {
    this.setState( {
      chosenDate: newDate
    } );
  }

  async setDateAndroid() {
    try {
      const {
        action,
        year,
        month,
        day
      } = await DatePickerAndroid.open( {
        date: new Date(),
        maxDate: new Date(),
        mode: "spinner"
      } );
      if ( action !== DatePickerAndroid.dismissedAction ) {
        const userBirthday = moment( new Date( year, month, day ) ).format( "YYYY-MM-DD" );
        this.setDate( userBirthday );
      }
    } catch ( { code, message } ) {
      console.warn( "Cannot open date picker", message );
    }
  }

  submit() {
    const { navigation } = this.props;
    const { chosenDate } = this.state;
    if ( requiresParent( chosenDate ) ) {
      navigation.navigate( "Parent" );
    } else {
      navigation.navigate( "Signup" );
    }
  }

  render() {
    const { chosenDate } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.text}>
            {i18n.t( "inat_signup.enter_birthday" )}
          </Text>
          <Text style={styles.text}>
            {i18n.t( "inat_signup.permission" )}
          </Text>
          <View style={styles.datePickerContainer}>
            { Platform.OS === "ios" ? (
              <DatePickerIOS
                date={chosenDate}
                maximumDate={new Date()}
                onDateChange={this.setDate()}
              />
            ) : (
              <TouchableOpacity
                style={styles.inputField}
                onPress={() => this.setDateAndroid()}
              >
                <Text style={[styles.text, styles.darkText]}>{chosenDate}</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.text}>
            {i18n.t( "inat_signup.privacy" )}
          </Text>
          <TouchableOpacity
            onPress={() => this.submit()}
          >
            <Text style={styles.text}>
              {i18n.t( "inat_signup.continue" )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default AgeVerifyScreen;
