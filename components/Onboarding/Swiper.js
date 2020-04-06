import React, { Component } from "react";
import {
  Dimensions,
  ScrollView,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "../../styles/onboarding";
import Dots from "./Dots";
import Button from "./Button";

const { width } = Dimensions.get( "window" );

type Props = {
  +children:any
}

const gradientColors = {
  0: ["#50c49c", "#1b6537"],
  1: ["#43b7a8", "#1d5d49"],
  2: ["#3ab6bb", "#184b56"]
};

class Swiper extends Component<Props> {
  constructor() {
    super();

    this.state = this.initState( this.props );
  }

  handleScrollEnd = ( e ) => {
    this.updateIndex( e.nativeEvent.contentOffset
      ? e.nativeEvent.contentOffset.x
      // When scrolled with .scrollTo() on Android there is no contentOffset
      : e.nativeEvent.position * width );
  }

  updateIndex = ( offset ) => {
    const diff = offset - this.internals.offset;
    let { index } = this.state;

    if ( !diff ) {
      return;
    }

    index = parseInt( index + Math.round( diff / width ), 10 );
    this.internals.offset = offset;

    this.setState( { index } );
  }

  initState() {
    const index = 0;
    const offset = width * index;

    const state = {
      total: 3,
      index
    };
    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      offset
    };

    return state;
  }

  renderScrollView = pages => (
    <ScrollView
      ref={( component ) => { this.scrollView = component; }}
      bounces={false}
      horizontal
      onMomentumScrollEnd={this.handleScrollEnd}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {pages.map( ( page, i ) => (
        <View key={`page-${i.toString()}`} style={styles.contentContainer}>
          {page}
        </View>
      ) )}
    </ScrollView>
  )

  render() {
    const { children } = this.props;
    const { index } = this.state;

    return (
      <LinearGradient
        colors={[gradientColors[index][0], gradientColors[index][1]]}
        style={styles.container}
      >
        {this.renderScrollView( children )}
        <Dots index={index} />
        <Button index={index} />
      </LinearGradient>
    );
  }
}

export default Swiper;
