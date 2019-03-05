// @flow

import React from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "../../styles/results/results";
import icons from "../../assets/icons";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import i18n from "../../i18n";

type Props = {
  speciesSeenImage: string,
  taxaName: string,
  taxaId: number,
  userImage: string,
  navigation: any,
  seenDate: string
}

const AlreadySeenScreen = ( {
  taxaName,
  taxaId,
  speciesSeenImage,
  userImage,
  navigation,
  seenDate
}: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={styles.safeViewTop} />
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        <LinearGradient
          colors={["#22784d", "#38976d"]}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.buttonContainer}
          >
            <Image
              source={icons.backButton}
              style={styles.backButton}
            />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
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
            onPress={() => navigation.push( "Species", {
              id: taxaId,
              commonName: taxaName,
              scientificName: null
            } )
            }
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
        </View>
        <Padding />
      </ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  </View>
);

export default AlreadySeenScreen;
