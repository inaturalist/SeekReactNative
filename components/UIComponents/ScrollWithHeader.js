// @flow

import React, { useRef } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeArea } from "react-native-safe-area-context";

import styles from "../../styles/uiComponents/scrollWithHeader";
import { useScrollToTop } from "../../utility/customHooks";
import BottomSpacer from "./BottomSpacer";
import GreenHeader from "./GreenHeader";
import Padding from "./Padding";

type Props = {
  +children: any,
  +header: string
};

const ScrollWithHeader = ( { children, header }: Props ) => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const scrollView = useRef( null );

  useScrollToTop( scrollView, navigation );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <GreenHeader header={header} />
      <ScrollView ref={scrollView} contentContainerStyle={styles.containerWhite}>
        {children}
        <Padding />
        <BottomSpacer />
      </ScrollView>
    </View>
  );
};

export default ScrollWithHeader;
