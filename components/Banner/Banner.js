// @flow
import React, { Component } from "react";
import { Animated } from "react-native";

import BadgeToast from "./BadgeToast";
import styles from "../../styles/banner/badgeToast";

type Props = {
  navigation: any
}

class Banner extends Component<Props> {
  constructor() {
    super();

    this.animatedValue = new Animated.Value( -120 );
  }

  componentDidMount() {
    this.showToast();
  }

  showToast() {
    console.log( "showing toast" );
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 750
      }
    ).start( this.hideToast() );
  }

  hideToast() {
    console.log( "hiding toast" );
    setTimeout( () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: -120,
          duration: 350
        }
      ).start();
    }, 2000 );
  }

  render() {
    const { navigation } = this.props;

    return (
      <Animated.View style={[
        styles.animatedStyle,
        {
          transform: [{ translateY: this.animatedValue }]
        }
      ]}
      >
        <BadgeToast navigation={navigation} />
      </Animated.View>
    );
  }
}

export default Banner;
