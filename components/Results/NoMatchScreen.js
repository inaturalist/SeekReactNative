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
import { NavigationEvents } from "react-navigation";

import { fetchAccessToken } from "../../utility/loginHelpers";
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

class NoMatchScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      userImage,
      image,
      taxaId,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess,
      speciesSeenImage,
      taxaName,
      seenDate,
      commonAncestor
    } = navigation.state.params;

    this.state = {
      userImage,
      image,
      taxaId,
      scientificName,
      latitude,
      longitude,
      time,
      postingSuccess,
      speciesSeenImage,
      taxaName,
      seenDate,
      commonAncestor,
      isLoggedIn: false
    };
  }

  async getLoggedIn() {
    const login = await fetchAccessToken();
    if ( login ) {
      this.setLoggedIn( true );
    }
  }

  setLoggedIn( isLoggedIn ) {
    this.setState( { isLoggedIn } );
  }

  resetState() {
    this.setState( {
      userImage: null,
      image: null,
      taxaId: null,
      scientificName: null,
      latitude: null,
      longitude: null,
      time: null,
      postingSuccess: null,
      speciesSeenImage: null,
      taxaName: null,
      seenDate: null,
      commonAncestor: null,
      isLoggedIn: false
    } );
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
      seenDate,
      commonAncestor
    } = this.state;

    let headerText;
    let gradientColorDark;
    let gradientColorLight;
    let text;
    let numOfImages;

    if ( seenDate ) {
      headerText = i18n.t( "results.resighted" ).toLocaleUpperCase();
      gradientColorDark = "#22784d";
      gradientColorLight = colors.seekForestGreen;
      numOfImages = 2;
      text = i18n.t( "results.date_observed", { seenDate } );
    } else if ( commonAncestor ) {
      headerText = i18n.t( "results.believe" ).toLocaleUpperCase();
      gradientColorDark = "#175f67";
      gradientColorLight = colors.seekTeal;
      numOfImages = 2;
      text = i18n.t( "results.common_ancestor" );
    } else {
      headerText = i18n.t( "results.no_identification" ).toLocaleUpperCase();
      gradientColorDark = "#404040";
      gradientColorLight = "#5e5e5e";
      numOfImages = 1;
      text = i18n.t( "results.sorry" );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 0, backgroundColor: gradientColorDark }} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onWillFocus={() => this.getLoggedIn()}
            onWillBlur={() => this.resetState()}
          />
          <ScrollView>
            <LinearGradient
              colors={[gradientColorDark, gradientColorLight]}
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
                {numOfImages === 2 ? (
                  <Image
                    style={styles.imageCell}
                    source={{ uri: speciesSeenImage }}
                  />
                ) : null}
              </View>
            </LinearGradient>
            <View style={styles.textContainer}>
              <Text style={[styles.headerText, { color: gradientColorLight }]}>{headerText}</Text>
              {seenDate || commonAncestor
                ? <Text style={styles.speciesText}>{taxaName || commonAncestor}</Text>
                : null}
              <Text style={styles.text}>{text}</Text>
              {seenDate ? (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: gradientColorLight }]}
                  onPress={() => {
                    setSpeciesId( taxaId ); // not sure why these are here
                    setRoute( "Camera" ); // not sure why these are here
                    navigation.navigate( "Species" );
                  }}
                >
                  <Text style={styles.buttonText}>
                    {i18n.t( "results.view_species" ).toLocaleUpperCase()}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: gradientColorLight }]}
                  onPress={() => navigation.navigate( "Camera" )}
                >
                  <Text style={styles.buttonText}>
                    {i18n.t( "results.take_photo" ).toLocaleUpperCase()}
                  </Text>
                </TouchableOpacity>
              )}
              {seenDate ? (
                <TouchableOpacity
                  style={styles.link}
                  onPress={() => navigation.navigate( "Camera" )}
                >
                  <Text style={styles.linkText}>{i18n.t( "results.back" )}</Text>
                </TouchableOpacity>
              ) : null}
              <View style={{ marginBottom: 28 }} />
              {isLoggedIn && latitude && longitude && !postingSuccess
                ? (
                  <PostToiNat
                    navigation={navigation}
                    color={gradientColorLight}
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
