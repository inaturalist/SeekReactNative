// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import styles from "../../../styles/uiComponents/modals/modalWithGradient";
import { colors } from "../../../styles/global";
import iconicTaxa from "../../../assets/iconicTaxa";

type Props = {
  +children: any,
  +closeModal: Function,
  +color: string,
  +userImage: string,
  +originalImage: ?string,
  +displayDate?: ?Date
};

const ModalWithGradient = ( {
  children,
  closeModal,
  color,
  userImage,
  originalImage,
  displayDate
}: Props ) => (
  <View style={styles.container}>
    <LinearGradient
      colors={[colors[`${color}GradientDark`], colors[`${color}GradientLight`]]}
      style={styles.header}
    >
      <View style={[styles.headerTextContainer, styles.row]}>
        <Text allowFontScaling={false} style={[styles.buttonText, styles.paddingSmall]}>
          {color === "green"
            ? i18n.t( "replace_photo.header" ).toLocaleUpperCase()
            : i18n.t( "results.flag" ).toLocaleUpperCase()}
        </Text>
        <TouchableOpacity
          onPress={() => closeModal()}
          style={styles.backButton}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      <View style={[styles.images, styles.row]}>
        <Image
          source={{ uri: userImage }}
          style={styles.imageCell}
        />
        {( color === "green" && originalImage ) && (
          <ImageBackground
            source={iconicTaxa[1]} // for cases where uri exists but photo is blank
            style={[styles.imageCell, styles.marginLeft]}
            imageStyle={styles.imageCell}
          >
            <Image
              source={{ uri: originalImage }}
              style={styles.imageCell}
            />
          </ImageBackground>
        )}
        <View>
          {( color === "gray" && originalImage ) && (
            <Image
              source={{ uri: originalImage }}
              style={[styles.imageCell, styles.marginLeft]}
            />
          )}
          {displayDate && (
            <View style={styles.grayButton}>
              <Text style={styles.grayButtonText}>{displayDate}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
    <View style={styles.innerContainer}>
      <View style={styles.marginLarge} />
      {children}
      <View style={styles.marginMedium} />
    </View>
  </View>
);

ModalWithGradient.defaultProps = {
  displayDate: null
};

export default ModalWithGradient;
