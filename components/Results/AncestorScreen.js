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
import { colors } from "../../styles/global";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import i18n from "../../i18n";
import BackArrow from "../BackArrow";
import PostToiNat from "./PostToiNat";

type Props = {
  speciesSeenImage: string,
  commonAncestor: string,
  userImage: string,
  navigation: any,
  isLoggedIn: boolean,
  taxaId: number,
  scientificName: string
}

const MatchScreen = ( {
  commonAncestor,
  speciesSeenImage,
  userImage,
  navigation,
  isLoggedIn,
  taxaId,
  scientificName
}: Props ) => (
  <View style={styles.container}>
    <SafeAreaView style={{ flex: 0, backgroundColor: "#175f67" }} />
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        <LinearGradient
          colors={["#175f67", "#297f87"]}
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
          <Text style={styles.headerText}>{i18n.t( "results.believe" ).toLocaleUpperCase()}</Text>
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
          {isLoggedIn
            ? (
              <PostToiNat
                navigation={navigation}
                color={colors.seekTeal}
                taxaInfo={{
                  taxaName: commonAncestor,
                  taxaId,
                  userImage,
                  scientificName
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

export default MatchScreen;
