// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/results/results";
import icons from "../../assets/icons";

type Props = {
  toggleFlagModal: Function,
  deleteObservation: Function,
  userImage: string,
  speciesSeenImage: string,
  speciesText: string,
  seenDate: string
};

const FlagModal = ( {
  toggleFlagModal,
  deleteObservation,
  userImage,
  speciesSeenImage,
  speciesText,
  seenDate
}: Props ) => {
  const gradientColorDark = "#404040";
  const gradientColorLight = "#5e5e5e";

  return (
    <View style={styles.innerContainer}>
      <View style={styles.flagHeaderContainer}>
        <LinearGradient
          colors={[gradientColorDark, gradientColorLight]}
          style={styles.flagHeader}
        >
          <TouchableOpacity
            style={styles.flagBackButton}
            hitSlop={styles.touchable}
            onPress={() => toggleFlagModal() }
          >
            <Image source={icons.closeWhite} />
          </TouchableOpacity>
          <View style={[styles.imageContainer, styles.flagButtonContainer]}>
            <Image
              style={styles.flagImageCell}
              source={{ uri: userImage }}
            />
            {speciesSeenImage ? (
              <Image
                style={styles.flagImageCell}
                source={{ uri: speciesSeenImage }}
              />
            ) : null}
          </View>
        </LinearGradient>
      </View>
      <View style={styles.flagContainer}>
        <View style={{ marginTop: 40 }} />
        <Text style={styles.speciesText}>{speciesText}</Text>
        <Text style={[styles.text, { width: 261 }]}>{i18n.t( "results.incorrect" )}</Text>
        <View style={{ marginTop: 31 }} />
        <TouchableOpacity
          style={[styles.flagButton, { backgroundColor: gradientColorLight }]}
          onPress={() => {
            if ( seenDate ) {
              toggleFlagModal( true );
            } else {
              deleteObservation();
              toggleFlagModal( true );
            }
          }}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "results.yes" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 17 }} />
        <TouchableOpacity
          style={[styles.flagButton, { backgroundColor: gradientColorLight }]}
          onPress={() => toggleFlagModal()}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "results.no" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 32 }} />
      </View>
    </View>
  );
};

export default FlagModal;
