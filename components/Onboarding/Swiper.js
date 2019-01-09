import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Button from "./Button";
import { colors } from "../../styles/global";
import styles from "../../styles/onboarding";

const { width, height } = Dimensions.get( "window" );

type Props = {
  navigation: any
}

const gradientColors = {
  0: "#38976d",
  1: "#318b7a",
  2: "#297f87"
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
      colorTop: colors.white,
      colorBottom: gradientColors[index]
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
      colorBottom: gradientColors[index]
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
        <View style={styles.fullScreen} key={`page-${i}`}>
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
        style={[styles.pagination, styles.fullScreen]}
      >
        {dots}
      </View>
    );
  }

  render = ( { children, navigation } = this.props, { colorBottom } = this.state ) => (
    <LinearGradient
      colors={[colors.white, colorBottom]}
      style={styles.container}
    >
      <View style={[styles.container, styles.fullScreen]}>
        {this.renderScrollView( children )}
        {this.renderPagination()}
        <Button navigation={navigation} />
      </View>
    </LinearGradient>
  )
}

export default Swiper;
