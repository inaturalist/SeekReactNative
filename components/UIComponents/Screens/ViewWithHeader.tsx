import * as React from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../../../styles/uiComponents/scrollWithHeader";
import Footer from "../Footer";
import GreenHeader from "../GreenHeader";

interface Props extends React.PropsWithChildren {
  testID?: string;
  header: string;
  footer?: boolean;
}

const edges = ["top"];
if ( Platform.OS === "android" ) {
  edges.push( "bottom" );
}

const ViewWithHeader = ( { testID, children, header, footer = true }: Props ) => (
  <SafeAreaView testID={testID} style={styles.container} edges={edges}>
    <StatusBar barStyle="light-content" />
    <GreenHeader header={header} />
    {children}
    {footer && <Footer />}
  </SafeAreaView>
);

export default ViewWithHeader;
