import * as React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Appearance } from "react-native";

interface Props {
  toggleDateTimePicker: () => void;
  onDatePicked: ( date: Date ) => void;
  isDateTimePickerVisible: boolean;
  datetime?: boolean;
}

const DatePicker: React.FC<Props> = ( {
  datetime,
  isDateTimePickerVisible,
  onDatePicked,
  toggleDateTimePicker
} ) => {
  const colorScheme = Appearance.getColorScheme();

  const customHeader = ( ) => <></>;

  return (
    <DateTimePicker
      display="spinner"
      customHeaderIOS={customHeader}
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