import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  View
} from "react-native";
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
  const [index, setIndex] = useState( 0 );
  const [offset, setOffset] = useState( 0 );

  const calculateScrollIndex = ( e ) => {
    const { contentOffset } = e.nativeEvent;
    const { x } = contentOffset;
    if ( x === offset ) {
      return;
    }

    if ( x === 0 ) {
      setIndex( 0 );
    } else if ( x > offset && index < 2 ) {
      setIndex( index + 1 );
    } else if ( x < offset && index > 0 ) {
      setIndex( index - 1 );
    }
    setOffset( x );
  };

  const renderScrollView = ( pages ) => (
    <ScrollView
      bounces={false}
      horizontal
      onMomentumScrollEnd={( e ) => calculateScrollIndex( e )}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {pages.map( ( page, i ) => (
        <View key={`page-${i.toString()}`} style={styles.contentContainer}>
          {page}
        </View>
      ) )}
    </ScrollView>
  );

  return (
    <LinearGradient
      colors={[gradientColors[index][0], gradientColors[index][1]]}
      style={styles.container}
    >
      {renderScrollView( children )}
      <Dots index={index} />
      <Button index={index} />
    </LinearGradient>
  );
};

export default Swiper;
