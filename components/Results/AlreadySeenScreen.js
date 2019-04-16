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
import BackArrow from "../BackArrow";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import i18n from "../../i18n";
import { setSpeciesId } from "../../utility/helpers";

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
    <SafeAreaView style={{ flex: 0, backgroundColor: "#22784d" }} />
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        <LinearGradient
          colors={["#22784d", "#38976d"]}
          style={styles.header}
        >
          <BackArrow navigation={navigation} />
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
        </View>
        <Padding />
      </ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  </View>
);

export default AlreadySeenScreen;
