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
import { colors } from "../../styles/global";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import i18n from "../../i18n";
import PostToiNat from "./PostToiNat";

type Props = {
  navigation: any
}

class AncestorScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      userImage,
      image,
      isLoggedIn,
      taxaId,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess,
      speciesSeenImage,
      commonAncestor
    } = navigation.state.params;

    this.state = {
      userImage,
      image,
      isLoggedIn,
      taxaId,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess,
      speciesSeenImage,
      commonAncestor
    };
  }

  render() {
    const { navigation } = this.props;
    const {
      userImage,
      image,
      isLoggedIn,
      taxaId,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess,
      speciesSeenImage,
      commonAncestor
    } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#175f67" }} />
        <SafeAreaView style={styles.safeView}>
          <ScrollView>
            <LinearGradient
              colors={["#175f67", "#297f87"]}
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
                <Image
                  style={styles.imageCell}
                  source={{ uri: speciesSeenImage }}
                />
              </View>
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={[styles.headerText, { color: colors.seekTeal }]}>{i18n.t( "results.believe" ).toLocaleUpperCase()}</Text>
              <Text style={styles.speciesText}>{commonAncestor}</Text>
              <Text style={styles.text}>{i18n.t( "results.common_ancestor" )}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonBlue]}
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
                    color={colors.seekTeal}
                    taxaInfo={{
                      taxaName: commonAncestor,
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

export default AncestorScreen;
