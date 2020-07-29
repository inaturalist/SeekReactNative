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

import styles from "../../../styles/uiComponents/scrollWithHeader";
import { useScrollToTop } from "../../../utility/customHooks";
import BottomSpacer from "../BottomSpacer";
import Padding from "../Padding";

type Props = {
  +children: any,
  +color: string
};

const ScrollNoHeader = ( { children, color }: Props ) => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const scrollView = useRef( null );

  useScrollToTop( scrollView, navigation );

  return (
    <View style={[styles.container, color === "green" ? styles.green : styles.containerWhite, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView ref={scrollView} contentContainerStyle={styles.containerWhite}>
        {children}
        <Padding />
        {Platform.OS === "ios" && <BottomSpacer />}
      </ScrollView>
    </View>
  );
};

export default ScrollNoHeader;
