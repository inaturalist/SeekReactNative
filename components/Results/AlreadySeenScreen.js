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

import { colors } from "../../styles/global";
import icons from "../../assets/icons";
import styles from "../../styles/results/results";
import backStyles from "../../styles/backArrow";
import Footer from "../Home/Footer";
import PostToiNat from "./PostToiNat";
import Padding from "../Padding";
import i18n from "../../i18n";
import { setSpeciesId, setRoute } from "../../utility/helpers";

type Props = {
  navigation: any
}

class AlreadySeenScreen extends Component<Props> {
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
      taxaName,
      seenDate
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
      taxaName,
      seenDate
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
      taxaName,
      seenDate
    } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#22784d" }} />
        <SafeAreaView style={styles.safeView}>
          <ScrollView>
            <LinearGradient
              colors={["#22784d", "#38976d"]}
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
              <Text style={styles.headerText}>{i18n.t( "results.resighted" ).toLocaleUpperCase()}</Text>
              <Text style={styles.speciesText}>{taxaName}</Text>
              <Text style={styles.text}>{i18n.t( "results.date_observed", { seenDate } )}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setSpeciesId( taxaId );
                  setRoute( "Camera" );
                  navigation.navigate( "Species" );
                }}
              >
                <Text
                  style={styles.buttonText}
                >
                  {i18n.t( "results.view_species" ).toLocaleUpperCase()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate( "Camera" )}
              >
                <Text style={styles.linkText}>{i18n.t( "results.back" )}</Text>
              </TouchableOpacity>
              <View style={{ marginBottom: 28 }} />
              {isLoggedIn && latitude && longitude && !postingSuccess
                ? (
                  <PostToiNat
                    navigation={navigation}
                    color={colors.seekForestGreen}
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

export default AlreadySeenScreen;
