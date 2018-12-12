// @flow
import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Animated
} from "react-native";

import styles from "../styles/banner";

type Props = {
  bannerText: string,
  main: boolean
}

class Banner extends Component {
  constructor( { bannerText, main }: Props ) {
    super();

    this.state = {
      bannerText,
      main
    };

    this.animatedValue = new Animated.Value( -120 );
  }

  componentDidMount() {
    this.showToast();
  }

  showToast() {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 750
      }
    ).start( this.hideToast() );
  }

  hideToast() {
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
    const { bannerText, main } = this.state;

    let banner;

    if ( main ) {
      banner = (
        <Animated.View style={[
          styles.animatedStyle,
          {
            transform: [{ translateY: this.animatedValue }]
          }
        ]}
        >
          <View style={[styles.row, styles.animatedRow]}>
            <Image
              source={require( "../assets/results/icn-results-match.png" )}
              style={styles.mainBannerImage}
            />
            <Text style={styles.text}>{bannerText}</Text>
          </View>
        </Animated.View>
      );
    } else {
      banner = (
        <View style={styles.banner}>
          <View style={styles.row}>
            <Image
              source={require( "../assets/results/icn-results-match.png" )}
              style={styles.speciesBannerImage}
            />
            <Text style={styles.text}>{bannerText}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {banner}
      </View>
    );
  }
}

export default Banner;
