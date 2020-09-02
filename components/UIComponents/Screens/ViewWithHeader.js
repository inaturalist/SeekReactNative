// @flow

import React from "react";
import { View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "../../../styles/uiComponents/scrollWithHeader";
import GreenHeader from "../GreenHeader";

type Props = {
  +children: any,
  +header: string
};

const ViewWithHeader = ( { children, header }: Props ) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <GreenHeader header={header} />
      {children}
    </View>
  );
};

export default ViewWithHeader;
