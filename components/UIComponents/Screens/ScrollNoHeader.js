// @flow

import React, { useRef } from "react";
import { ScrollView, Platform, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import styles from "../../../styles/uiComponents/scrollWithHeader";
import { useScrollToTop } from "../../../utility/customHooks";
import BottomSpacer from "../BottomSpacer";
import Padding from "../Padding";

type Props = {
  +children: any,
  showUploadCard?: boolean
};

const ScrollNoHeader = ( { children, showUploadCard }: Props ): Node => {
  const navigation = useNavigation( );
  const { name } = useRoute( );
  const scrollView = useRef<any>( null );

  useScrollToTop( scrollView, navigation );

  let backgroundColor;

  if ( name === "HomeFooter" ) {
    backgroundColor = showUploadCard ? styles.darkGreen : styles.green;
  } else if ( name === "ChallengeDetailsFooter" ) {
    backgroundColor = styles.black;
  } else {
    backgroundColor = styles.containerWhite;
  }

  return (
    <SafeAreaView style={[styles.container, backgroundColor]} edges={["top"]}>
      <StatusBar barStyle="light-content" />
      <ScrollView ref={scrollView} contentContainerStyle={backgroundColor}>
        {children}
        <Padding />
        {Platform.OS === "ios" && <BottomSpacer />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollNoHeader;
