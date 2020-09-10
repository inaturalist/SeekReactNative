import React, { useMemo } from "react";
import RNPickerSelect from "react-native-picker-select";

type Props = {
  handleValueChange: Function,
  icon?: any,
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
}: Props ) => {
  const showIcon = useMemo( () => icon, [icon] );
  const emptyObj = useMemo( () => {}, [] );

  return (
    <RNPickerSelect
      hideIcon
      Icon={showIcon}
      items={itemList}
      onValueChange={handleValueChange}
      placeholder={emptyObj}
      useNativeAndroidPickerStyle={false}
      value={selectedValue}
      disabled={disabled}
    >
      {children}
    </RNPickerSelect>
  );
};

Picker.defaultProps = {
  icon: () => <></>
};

export default Picker;
