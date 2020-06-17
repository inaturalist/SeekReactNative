// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import styles from "../../../styles/uiComponents/modals/modalWithGradient";
import { colors } from "../../../styles/global";

type Props = {
  +children: any,
  +closeModal: Function,
  +color: string,
  +userImage: string,
  +speciesSeenImage: ?string,
  +seenDate?: ?Date
};

const ModalWithGradient = ( {
  children,
  closeModal,
  color,
  userImage,
  speciesSeenImage,
  seenDate
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
        {speciesSeenImage && (
          <Image
            source={{ uri: speciesSeenImage }}
            style={[styles.imageCell, styles.marginLeft]}
          />
        )}
        {seenDate && (
          <View style={styles.grayButton}>
            <Text style={styles.grayButtonText}>{seenDate}</Text>
          </View>
        )}
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
  seenDate: null
};

export default ModalWithGradient;
