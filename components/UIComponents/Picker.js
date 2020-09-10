import React, { useMemo, useCallback } from "react";
import RNPickerSelect from "react-native-picker-select";

type Props = {
  handleValueChange: Function,
  selectedValue: string,
  itemList: Array<Object>,
  children: any,
  disabled?: boolean
}

const Picker = ( {
  handleValueChange,
  selectedValue,
  children,
  itemList,
  disabled
}: Props ) => {
  const showIcon = useCallback( () => <></>, [] );

  return useMemo( () => (
    <RNPickerSelect
      hideIcon
      Icon={showIcon}
      items={itemList}
      onValueChange={handleValueChange}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
      value={selectedValue}
      disabled={disabled}
    >
      {children}
    </RNPickerSelect>
  ), [children, disabled, selectedValue, handleValueChange, itemList, showIcon] );
};

export default Picker;
