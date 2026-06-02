import { useNavigation, useRoute } from "@react-navigation/native";
import type { PropsWithChildren} from "react";
import React, { useRef } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../../styles/global";
import styles from "../../../styles/uiComponents/scrollWithHeader";
import { useScrollToTop } from "../../../utility/customHooks";
import BottomSpacer from "../BottomSpacer";
import Footer from "../Footer";
import GreenHeader from "../GreenHeader";
import LoadingWheel from "../LoadingWheel";
import Padding from "../Padding";

interface Props extends PropsWithChildren {
  testID?: string;
  header: string;
  route?: string;
  loading?: boolean;
  footer?: boolean;
}

const ScrollWithHeader = ( {
  testID,
  children,
  header,
  route = null,
  loading = false,
  footer = false,
}: Props ) => {
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
    <SafeAreaView testID={testID} style={styles.container} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <GreenHeader header={header} route={route} />
      {loading ? (
        <View style={[styles.loadingWheel, styles.containerWhite]}>
          <LoadingWheel color={colors.seekForestGreen} />
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

export default ScrollWithHeader;
