// @flow

import React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Appearance } from "react-native-appearance";

type Props = {
  +toggleDateTimePicker: Function,
  +onDatePicked: Function,
  +isDateTimePickerVisible: boolean,
  +datetime: ?boolean
};

const DatePicker = ( {
  datetime,
  isDateTimePickerVisible,
  onDatePicked,
  toggleDateTimePicker
}: Props ) => {
  const colorScheme = Appearance.getColorScheme();

  return (
    <DateTimePicker
      datePickerModeAndroid="spinner"
      hideTitleContainerIOS
      isDarkModeEnabled={colorScheme === "dark"}
      isVisible={isDateTimePickerVisible}
      maximumDate={new Date()}
      mode={datetime ? "datetime" : "date"}
      onCancel={toggleDateTimePicker}
      onConfirm={onDatePicked}
      timePickerModeAndroid="spinner"
    />
  );
};

export default DatePicker;
