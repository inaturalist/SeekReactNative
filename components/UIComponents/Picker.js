import React from "react";
import RNPickerSelect from "react-native-picker-select";

type Props = {
  handleValueChange: Function,
  icon: any,
  selectedValue: string,
  itemList: Array<Object>,
  children: any,
  disabled?: boolean
}

const Picker = ( {
  handleValueChange,
  selectedValue,
  icon,
  children,
  itemList,
  disabled
}: Props ) => (
  <RNPickerSelect
    hideIcon
    Icon={() => icon}
    items={itemList}
    onValueChange={handleValueChange}
    placeholder={{}}
    useNativeAndroidPickerStyle={false}
    value={selectedValue}
    disabled={disabled}
  >
    {children}
  </RNPickerSelect>
);

export default Picker;
