import React from "react";
import RNPickerSelect from "react-native-picker-select";


type Props = {
  handleValueChange: Function,
  icon: any,
  selectedValue: string,
  itemList: Array<Object>,
  children: any
}

const Picker = ( {
  handleValueChange,
  selectedValue,
  icon,
  children,
  itemList
}: Props ) => (
  <RNPickerSelect
    hideIcon
    Icon={() => icon}
    items={itemList}
    onValueChange={( value ) => handleValueChange( value )}
    placeholder={{}}
    useNativeAndroidPickerStyle={false}
    value={selectedValue}
  >
    {children}
  </RNPickerSelect>
);

export default Picker;