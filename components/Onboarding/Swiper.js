import React, { Component } from "react";
import {
  Dimensions,
  Platform,
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
  0: ["#ffffff", "#38976d"],
  1: ["#ffffff", "#318b7a"],
  2: ["#ffffff", "#297f87"]
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
    automaticallyAdjustContentInsets: false,
    index: 0
  };

  state = this.initState( this.props );

  initState( props ) {
    const total = 3;
    const index = 0;
    const offset = width * index;

    const state = {
      total,
      index,
      offset,
      width,
      height
    };
    // Component internals as a class property,
    // and not state to avoid component re-renders when updated
    this.internals = {
      isScrolling: false,
      offset
    };

    return state;
  }

  onScrollBegin = () => {
    this.internals.isScrolling = true;
  }

  onScrollEnd = ( e ) => {
    this.internals.isScrolling = false;

    this.updateIndex( e.nativeEvent.contentOffset
      ? e.nativeEvent.contentOffset.x
      // When scrolled with .scrollTo() on Android there is no contentOffset
      : e.nativeEvent.position * this.state.width );
  }

  onScrollEndDrag = ( e ) => {
    const { contentOffset: { x: newOffset } } = e.nativeEvent;
    const { children } = this.props;
    const { index } = this.state;
    const { offset } = this.internals;

    if ( offset === newOffset && ( index === 0 || index === children.length - 1 ) ) {
      this.internals.isScrolling = false;
    }
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
      index
    } );
  }

  swipe = () => {
    if ( this.internals.isScrolling ) {
      return;
    }

    const state = this.state;
    const diff = state.index + 1;

    this.internals.isScrolling = true;

    if ( Platform.OS === "android" ) {
      setImmediate( () => {
        this.onScrollEnd( {
          nativeEvent: {
            position: diff
          }
        } );
      } );
    }
  }

  renderScrollView = pages => (
    <ScrollView
      ref={( component ) => { this.scrollView = component; }}
      {...this.props}
      contentContainerStyle={[styles.wrapper, this.props.style]}
      onScrollBeginDrag={this.onScrollBegin}
      onMomentumScrollEnd={this.onScrollEnd}
      onScrollEndDrag={this.onScrollEndDrag}
    >
      {pages.map( ( page, i ) => (
        <View style={styles.fullScreen} key={`page-${i}`}>
          {page}
        </View>
      ) )}
    </ScrollView>
  )

  renderPagination = () => {
    const ActiveDot = <View style={[styles.dot, styles.activeDot]} />;
    const Dot = <View style={styles.dot} />;

    const dots = [];

    for ( let key = 0; key < 3; key += 1 ) {
      dots.push( key === this.state.index
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

  render = ( { children, navigation } = this.props ) => (
    <LinearGradient
      colors={gradientColors[this.state.index]}
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
