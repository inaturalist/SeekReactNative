// @flow

import React, { useRef } from "react";
import {
  View,
  ScrollView,
  Platform,
  StatusBar,
  Keyboard
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import styles from "../../../styles/uiComponents/scrollWithHeader";
import { useScrollToTop } from "../../../utility/customHooks";
import BottomSpacer from "../BottomSpacer";
import GreenHeader from "../GreenHeader";
import Padding from "../Padding";
import LoadingWheel from "../LoadingWheel";
import { colors } from "../../../styles/global";
import Footer from "../Footer";

type Props = {
  children: any,
  header: string,
  route?: ?string,
  loading?: boolean,
  footer?: boolean
};

const ScrollWithHeader = ( {
  children,
  header,
  route,
  loading,
  footer = false
}: Props ): Node => {
  const navigation = useNavigation();
  const { name } = useRoute();
  const scrollView = useRef<any>( null );

  useScrollToTop( scrollView, navigation, name );

  const hideKeyboardThrottle = ( name === "Post" ) ? 1 : 0;

  const hideKeyboard = () => {
    // need this one for Android
    if ( name === "Post" ) {
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <GreenHeader header={header} route={route} />
      {loading ? (
        <View style={[styles.loadingWheel, styles.containerWhite]}>
          <LoadingWheel color={colors.darkGray} />
        </View>
      ) : (
        <ScrollView
          ref={scrollView}
          contentContainerStyle={styles.containerWhite}
          keyboardDismissMode={name === "Post" ? "on-drag" : "none"}
          onScroll={hideKeyboard}
          scrollEventThrottle={hideKeyboardThrottle}
        >
          {children}
          <Padding />
          {Platform.OS === "ios" && <BottomSpacer />}
        </ScrollView>
      )}
      {footer && <Footer />}
    </SafeAreaView>
  );
};

ScrollWithHeader.defaultProps = {
  route: null,
  loading: false
};

export default ScrollWithHeader;
