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
  const hideIcon = useCallback( () => <></>, [] );
  const emptyObj = useMemo( () => {}, [] );

  return (
    <RNPickerSelect
      hideIcon
      Icon={hideIcon}
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

export default Picker;
