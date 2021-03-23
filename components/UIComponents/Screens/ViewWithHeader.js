// @flow

import * as React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../../styles/uiComponents/scrollWithHeader";
import GreenHeader from "../GreenHeader";

type Props = {
  +children: any,
  +header: string
};

const ViewWithHeader = ( { children, header }: Props ): React.Node => (
  <SafeAreaView style={styles.container} edges={["top"]}>
    <StatusBar barStyle="light-content" />
    <GreenHeader header={header} />
    {children}
  </SafeAreaView>
);

export default ViewWithHeader;
