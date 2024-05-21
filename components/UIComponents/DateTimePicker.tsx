import * as React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Appearance } from "react-native";

interface Props {
  toggleDateTimePicker: () => void;
  onDatePicked: ( date: Date ) => void;
  isDateTimePickerVisible: boolean;
  datetime?: boolean;
}

const DatePicker = ( {
  datetime,
  isDateTimePickerVisible,
  onDatePicked,
  toggleDateTimePicker
}: Props ) => {
  const colorScheme = Appearance.getColorScheme();

  const customHeader = ( ) => <></>;

  return (
    <DateTimePicker
      display="spinner"
      customHeaderIOS={customHeader}
      isDarkModeEnabled={colorScheme === "dark"}
      isVisible={isDateTimePickerVisible}
      maximumDate={new Date()}
      minimumDate={new Date( 1900, 0, 1 )}
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
