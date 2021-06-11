// @flow

import React, { useState, useRef, useCallback } from "react";
import { View, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "../../styles/onboarding";
import Dots from "./Dots";
import Button from "./Button";

type Props = {
  +children:any
}

const gradientColors = {
  0: ["#50c49c", "#1b6537"],
  1: ["#43b7a8", "#1d5d49"],
  2: ["#3ab6bb", "#184b56"]
};

const Swiper = ( { children }: Props ) => {
  const flatList = useRef( null );
  const viewConfigRef = useRef( {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 95
  } );
  const [scrollIndex, setScrollIndex] = useState( 0 );

  const onViewRef = useRef( ( { changed } ) => {
    const { index } = changed[0];
    setScrollIndex( index );
  } );

  const renderPage = useCallback( ( { item, index } ) => (
    <View key={`page-${index.toString()}`} style={styles.contentContainer}>
      {item}
    </View>
  ), [] );

  const renderScrollView = ( pages ) => (
    <FlatList
      ref={flatList}
      bounces={false}
      viewabilityConfig={viewConfigRef.current}
      onViewableItemsChanged={onViewRef.current}
      data={pages}
      renderItem={renderPage}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );

  return (
    <LinearGradient
      colors={[gradientColors[scrollIndex][0], gradientColors[scrollIndex][1]]}
      style={styles.container}
    >
      {renderScrollView( children )}
      <Dots index={scrollIndex} />
      <Button index={scrollIndex} />
    </LinearGradient>
  );
};

export default Swiper;
