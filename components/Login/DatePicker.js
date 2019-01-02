import React, { Component } from "react";
import {
  DatePickerIOS,
  DatePickerAndroid,
  TextInput,
  View,
  Platform
} from "react-native";

import styles from "../../styles/login/login";

class DatePicker extends Component {
  constructor() {
    super();

    this.state = {
      chosenDate: new Date()
    };

    this.setDate = this.setDate.bind( this );
  }

  setDate( newDate ) {
    console.log( newDate, "new date" );
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
        console.log( year, month, day, "ymd" );
        const userBirthday = new Date( year, month, day );
        console.log( userBirthday, "user birthday" );
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
          <TextInput
            style={styles.inputField}
            onFocus={() => this.setDateAndroid()}
          />
        )}
      </View>
    );
  }
}

export default DatePicker;
