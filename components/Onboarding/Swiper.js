import React, { Component } from "react";
import {
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "../../styles/onboarding";
import i18n from "../../i18n";
import { colors } from "../../styles/global";

const { width } = Dimensions.get( "window" );

type Props = {
  +navigation: any,
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

    this.setState( {
      index,
      colorTop: gradientColors[index][0],
      colorBottom: gradientColors[index][1]
    } );
  }

  initState() {
    const index = 0;
    const offset = width * index;

    const state = {
      total: 3,
      index,
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
        <View key={`page-${i}`} style={styles.contentContainer}>
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
      <View style={[styles.pagination, styles.center]}>
        {dots}
      </View>
    );
  }

  renderButton = ( index, navigation ) => (
    <TouchableOpacity
      onPress={() => navigation.navigate( "Login" )}
      style={[styles.buttonContainer, styles.center]}
    >
      {index === 2
        ? (
          <View style={[styles.button, { backgroundColor: colors.seekTeal }]}>
            <Text style={styles.skip}>{i18n.t( "onboarding.continue" ).toLocaleUpperCase()}</Text>
          </View>
        ) : <Text style={styles.skipText}>{i18n.t( "onboarding.skip" )}</Text>}
    </TouchableOpacity>
  )

  render() {
    const { children, navigation } = this.props;
    const { colorBottom, colorTop, index } = this.state;

    return (
      <LinearGradient
        colors={[colorTop, colorBottom]}
        style={styles.container}
      >
        {this.renderScrollView( children )}
        {this.renderPagination()}
        {this.renderButton( index, navigation )}
      </LinearGradient>
    );
  }
}

export default Swiper;
