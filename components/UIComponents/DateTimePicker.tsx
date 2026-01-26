import * as React from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
interface Props {
  toggleDateTimePicker: () => void;
  onDatePicked: ( date: Date ) => void;
  isDateTimePickerVisible: boolean;
  datetime?: boolean;
}

const DatePicker = ( {
  datetime = false,
  isDateTimePickerVisible,
  onDatePicked,
  toggleDateTimePicker,
}: Props ) => {

  const customHeader = ( ) => <></>;

  return (
    <DateTimePicker
      display="spinner"
      customHeaderIOS={customHeader}
      isDarkModeEnabled={false}
      themeVariant="light"
      isVisible={isDateTimePickerVisible}
      maximumDate={new Date()}
      minimumDate={new Date( 1900, 0, 1 )}
      mode={datetime ? "datetime" : "date"}
      onCancel={toggleDateTimePicker}
      onConfirm={onDatePicked}
    />
  );
};

export default DatePicker;
