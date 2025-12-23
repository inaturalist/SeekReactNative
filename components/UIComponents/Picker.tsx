import React, { PropsWithChildren, useCallback } from "react";
import RNPickerSelect from "react-native-picker-select";

const placeholder = {};

interface Props extends PropsWithChildren {
  handleValueChange: ( value: string ) => void;
  itemList: {
    label: string;
    value: string;
  }[];
  disabled?: boolean;
}

const Picker = ( {
  handleValueChange,
  children,
  itemList,
  disabled,
}: Props ) => {
  const showIcon = useCallback( () => <></>, [] );

  return (
    <RNPickerSelect
      hideIcon
      Icon={showIcon}
      items={itemList}
      onValueChange={handleValueChange}
      placeholder={placeholder}
      useNativeAndroidPickerStyle={false}
      disabled={disabled}
    >
      {children}
    </RNPickerSelect>
  );
};

export default Picker;
