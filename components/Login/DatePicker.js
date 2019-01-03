// @flow

import React, { Component } from "react";
import {
  DatePickerIOS,
  DatePickerAndroid,
  TextInput,
  View,
  Platform,
  TouchableOpacity
} from "react-native";

import styles from "../../styles/login/login";
import { requiresParent } from "../../utility/helpers";

type Props = {
  navigation: any
}

class DatePicker extends Component<Props> {
  constructor() {
    super();

    this.state = {
      chosenDate: new Date()
    };

    this.setDate = this.setDate.bind( this );
  }

  setDate( newDate ) {
    const { navigation } = this.props;
    if ( requiresParent( newDate ) ) {
      navigation.navigate( "Parent" );
    } else {
      navigation.navigate( "Main" );
    }
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
        const userBirthday = new Date( year, month, day );
        this.setDate( userBirthday );
      }
    } catch ( { code, message } ) {
      console.warn( "Cannot open date picker", message );
    }
  }

  render() {
    const { chosenDate } = this.state;
    return (
      <View style={styles.datePickerContainer}>
        { Platform.OS === "ios" ? (
          <DatePickerIOS
            date={chosenDate}
            maximumDate={new Date()}
            onDateChange={this.setDate}
          />
        ) : (
          <TouchableOpacity
            style={styles.inputField}
            onPress={() => this.setDateAndroid()}
          />
        )}
      </View>
    );
  }
}

export default DatePicker;
