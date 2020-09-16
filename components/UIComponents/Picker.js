import React, { useCallback } from "react";
import RNPickerSelect from "react-native-picker-select";

type Props = {
  handleValueChange: Function,
  itemList: Array<Object>,
  children: any,
  disabled?: boolean
}

const Picker = ( {
  handleValueChange,
  children,
  itemList,
  disabled
}: Props ) => {
  const showIcon = useCallback( () => <></>, [] );

  return (
    <RNPickerSelect
      hideIcon
      Icon={showIcon}
      items={itemList}
      onValueChange={handleValueChange}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
      disabled={disabled}
    >
      {children}
    </RNPickerSelect>
  );
};

export default Picker;
