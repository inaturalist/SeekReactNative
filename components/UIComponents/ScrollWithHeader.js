// @flow

import React, { useRef } from "react";
import {
  View,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";

import styles from "../../styles/uiComponents/scrollWithHeader";
import { useScrollToTop } from "../../utility/customHooks";
import BottomSpacer from "./BottomSpacer";
// import Spacer from "./iOSSpacer";
import GreenHeader from "./GreenHeader";
import Padding from "./Padding";

type Props = {
  +children: any,
  +header: string,
  +route?: ?string
};

const ScrollWithHeader = ( {
  children,
  header,
  route
}: Props ) => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const scrollView = useRef( null );

  useScrollToTop( scrollView, navigation );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* {Platform.OS === "ios" && <Spacer backgroundColor={colors.white} />} */}
      <StatusBar barStyle="light-content" />
      <GreenHeader header={header} route={route} />
      <ScrollView ref={scrollView} contentContainerStyle={styles.containerWhite}>
        {children}
        <Padding />
        {Platform.OS === "ios" && <BottomSpacer />}
      </ScrollView>
    </View>
  );
};

ScrollWithHeader.defaultProps = {
  route: null
};

export default ScrollWithHeader;
