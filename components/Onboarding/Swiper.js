import React, { Component } from "react";
import {
  Dimensions,
  ScrollView,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Button from "./Button";
import styles from "../../styles/onboarding";

const { width, height } = Dimensions.get( "window" );

type Props = {
  navigation: any
}

const gradientColors = {
  0: ["#50c49c", "#1b6537"],
  1: ["#43b7a8", "#1d5d49"],
  2: ["#3ab6bb", "#184b56"]
};

class Swiper extends Component<Props> {
  static defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false
    // index: 0
  };

  state = this.initState( this.props );

  initState( props ) {
    const index = 0;
    const offset = width * index;

    const state = {
      total: 3,
      index,
      offset,
      width,
      height,
      colorTop: gradientColors[index][0],
      colorBottom: gradientColors[index][1]
    };
    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      offset
    };

    return state;
  }

  onScrollBegin = () => {
  }

  onScrollEnd = ( e ) => {
    this.updateIndex( e.nativeEvent.contentOffset
      ? e.nativeEvent.contentOffset.x
      // When scrolled with .scrollTo() on Android there is no contentOffset
      : e.nativeEvent.position * this.state.width );
  }

  updateIndex = ( offset ) => {
    const state = this.state;
    const diff = offset - this.internals.offset;
    const step = state.width;
    let { index } = state;

    if ( !diff ) {
      return;
    }

    index = parseInt( index + Math.round( diff / step ), 10 );
    this.internals.offset = offset;

    this.setState( {
      index,
      colorTop: gradientColors[index][0],
      colorBottom: gradientColors[index][1]
    } );
  }


  renderScrollView = pages => (
    <ScrollView
      ref={( component ) => { this.scrollView = component; }}
      {...this.props}
      contentContainerStyle={styles.wrapper}
      onMomentumScrollBegin={this.onScrollBegin}
      onMomentumScrollEnd={this.onScrollEnd}
    >
      {pages.map( ( page, i ) => (
        <View style={styles.contentContainer} key={`page-${i}`}>
          {page}
        </View>
      ) )}
    </ScrollView>
  )

  renderPagination = () => {
    const { index } = this.state;
    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />;
    const Dot = <View style={styles.dot} />;

    const dots = [];

    for ( let key = 0; key < 3; key += 1 ) {
      dots.push( key === index
        ? React.cloneElement( ActiveDot, { key } )
        : React.cloneElement( Dot, { key } ) );
    }

    return (
      <View
        pointerEvents="none"
        style={[styles.pagination]}
      >
        {dots}
      </View>
    );
  }

  render = ( { children, navigation } = this.props, { colorBottom, colorTop, index } = this.state ) => (
    <LinearGradient
      colors={[colorTop, colorBottom]}
      style={styles.container}
    >
      <View style={[styles.container]}>
        {this.renderScrollView( children )}
        {this.renderPagination()}
        <Button navigation={navigation} index={index} />
      </View>
    </LinearGradient>
  )
}

export default Swiper;
