// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import icons from "../../assets/icons";
import styles from "../../styles/results/results";
import backStyles from "../../styles/backArrow";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import i18n from "../../i18n";
import PostToiNat from "./PostToiNat";

type Props = {
  navigation: any
}

class NoMatchScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      userImage,
      image,
      isLoggedIn,
      taxaName,
      taxaId,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess
    } = navigation.state.params;

    this.state = {
      userImage,
      image,
      isLoggedIn,
      taxaName,
      taxaId,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess
    };
  }

  render() {
    const { navigation } = this.props;
    const {
      userImage,
      image,
      isLoggedIn,
      taxaName,
      taxaId,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess
    } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#404040" }} />
        <SafeAreaView style={styles.safeView}>
          <ScrollView>
            <LinearGradient
              colors={["#404040", "#5e5e5e"]}
              style={styles.header}
            >
              <TouchableOpacity
                hitSlop={backStyles.touchable}
                style={backStyles.backButton}
                onPress={() => navigation.navigate( "Camera" )}
              >
                <Image source={icons.backButton} />
              </TouchableOpacity>
              <View style={[styles.imageContainer, styles.buttonContainer]}>
                <Image
                  style={styles.imageCell}
                  source={{ uri: userImage }}
                />
              </View>
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>{i18n.t( "results.no_identification" ).toLocaleUpperCase()}</Text>
              <Text style={styles.text}>{i18n.t( "results.sorry" )}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonGray]}
                onPress={() => navigation.navigate( "Camera" )}
              >
                <Text style={styles.buttonText}>
                  {i18n.t( "results.take_photo" ).toLocaleUpperCase()}
                </Text>
              </TouchableOpacity>
              {isLoggedIn && latitude && longitude && !postingSuccess
                ? (
                  <PostToiNat
                    navigation={navigation}
                    color="#5e5e5e"
                    taxaInfo={{
                      taxaName,
                      taxaId,
                      image,
                      userImage,
                      scientificName,
                      latitude,
                      longitude,
                      time
                    }}
                  />
                ) : null
              }
            </View>
            <Padding />
          </ScrollView>
          <Footer navigation={navigation} />
        </SafeAreaView>
      </View>
    );
  }
}

export default NoMatchScreen;
