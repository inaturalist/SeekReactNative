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
import styles from "../../styles/modals/flagModal";
import icons from "../../assets/icons";
import Button from "../UIComponents/Buttons/Button";

type Props = {
  +closeModal: Function,
  +deleteObservation: Function,
  +userImage: string,
  +speciesSeenImage?: ?string,
  +speciesText?: ?string,
  +seenDate?: ?string
};

const FlagModal = ( {
  closeModal,
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
      <LinearGradient
        colors={[gradientColorDark, gradientColorLight]}
        style={styles.flagHeader}
      >
        <View style={styles.flagTextContainer}>
          <Text style={[styles.buttonText, styles.paddingSmall]}>
            {i18n.t( "results.flag" ).toLocaleUpperCase()}
          </Text>
          <TouchableOpacity
            onPress={() => closeModal()}
            style={styles.flagBackButton}
          >
            <Image source={icons.closeWhite} />
          </TouchableOpacity>
        </View>
        <View style={[styles.imageContainer, styles.flagButtonContainer]}>
          <Image
            source={{ uri: userImage }}
            style={styles.flagImageCell}
          />
          {speciesSeenImage ? (
            <Image
              source={{ uri: speciesSeenImage }}
              style={styles.flagImageCell}
            />
          ) : null}
        </View>
      </LinearGradient>
      <View style={styles.flagContainer}>
        <View style={styles.marginLarge} />
        <Text style={styles.speciesText}>{speciesText}</Text>
        <Text style={styles.text}>{i18n.t( "results.incorrect" )}</Text>
        <View style={styles.marginSmall} />
        <Button
          handlePress={() => {
            if ( seenDate ) {
              closeModal( true );
            } else {
              deleteObservation();
              closeModal( true );
            }
          }}
          text={seenDate
            ? "results.yes_resighted"
            : "results.yes"}
          large
        />
        <View style={styles.marginSmall} />
        <Button
          handlePress={() => closeModal()}
          text="results.no"
          color={gradientColorLight}
        />
        <View style={styles.marginMedium} />
      </View>
    </View>
  );
};

FlagModal.defaultProps = {
  seenDate: null,
  speciesSeenImage: null,
  speciesText: null
};

export default FlagModal;
