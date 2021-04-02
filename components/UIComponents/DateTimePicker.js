// @flow

import * as React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Appearance } from "react-native";

type Props = {
  +toggleDateTimePicker: Function,
  +onDatePicked: Function,
  +isDateTimePickerVisible: boolean,
  +datetime?: boolean
};

const DatePicker = ( {
  datetime,
  isDateTimePickerVisible,
  onDatePicked,
  toggleDateTimePicker
}: Props ): React.Node => {
  const colorScheme = Appearance.getColorScheme();

  return (
    <DateTimePicker
      display="spinner"
      customHeaderIOS={() => <></>}
      isDarkModeEnabled={colorScheme === "dark"}
      isVisible={isDateTimePickerVisible}
      maximumDate={new Date()}
      mode={datetime ? "datetime" : "date"}
      onCancel={toggleDateTimePicker}
      onConfirm={onDatePicked}
    />
  );
};

DatePicker.defaultProps = {
  datetime: false
};

export default DatePicker;
