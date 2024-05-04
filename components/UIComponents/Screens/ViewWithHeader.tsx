import * as React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../../styles/uiComponents/scrollWithHeader";
import GreenHeader from "../GreenHeader";
import Footer from "../Footer";

interface Props {
  testID?: string;
  children: React.ReactNode;
  header: string;
  footer?: boolean;
}

const ViewWithHeader = ( { testID, children, header, footer = true }: Props ) => (
  <SafeAreaView testID={testID} style={styles.container} edges={["top"]}>
    <StatusBar barStyle="light-content" />
    <GreenHeader header={header} />
    {children}
    {footer && <Footer />}
  </SafeAreaView>
);

export default ViewWithHeader;
