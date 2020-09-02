// @flow

import React, { useRef } from "react";
import {
  View,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styles from "../../../styles/uiComponents/scrollWithHeader";
import { useScrollToTop } from "../../../utility/customHooks";
import BottomSpacer from "../BottomSpacer";
import Padding from "../Padding";

type Props = {
  +children: any
};

const ScrollNoHeader = ( { children }: Props ) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { name } = useRoute();
  const scrollView = useRef( null );

  useScrollToTop( scrollView, navigation );

  let backgroundColor;

  if ( name === "Home" ) {
    backgroundColor = styles.green;
  } else if ( name === "ChallengeDetails" ) {
    backgroundColor = styles.black;
  } else {
    backgroundColor = styles.containerWhite;
  }

  return (
    <View style={[
      styles.container,
      backgroundColor,
      { paddingTop: insets.top }]
    }>
      <StatusBar barStyle={name === "iNatStats" ? "dark-content" : "light-content"} />
      <ScrollView ref={scrollView} contentContainerStyle={styles.containerWhite}>
        {children}
        <Padding />
        {Platform.OS === "ios" && <BottomSpacer />}
      </ScrollView>
    </View>
  );
};

export default ScrollNoHeader;
