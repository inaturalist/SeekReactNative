// @flow

import * as React from "react";
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
import { viewStyles, textStyles } from "../../../styles/uiComponents/modals/modalWithGradient";
import { colors } from "../../../styles/global";
import iconicTaxa from "../../../assets/iconicTaxa";

type Props = {
  +children: any,
  +closeModal: Function,
  +color: string,
  +userImage: string,
  +originalImage: ?string,
  +displayDate?: ?string
};

const ModalWithGradient = ( {
  children,
  closeModal,
  color,
  userImage,
  originalImage,
  displayDate
}: Props ): React.Node => (
  <View style={viewStyles.container}>
    {/* $FlowFixMe */}
    <LinearGradient
      colors={[colors[`${color}GradientDark`], colors[`${color}GradientLight`]]}
      style={viewStyles.header}
    >
      <View style={[viewStyles.headerTextContainer, viewStyles.row]}>
        <Text allowFontScaling={false} style={textStyles.buttonText}>
          {color === "green"
            ? i18n.t( "replace_photo.header" ).toLocaleUpperCase()
            : i18n.t( "results.flag" ).toLocaleUpperCase()}
        </Text>
        <TouchableOpacity
          onPress={closeModal}
          style={viewStyles.backButton}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
      </View>
      <View style={[viewStyles.images, viewStyles.row]}>
        <Image
          source={{ uri: userImage }}
          style={viewStyles.imageCell}
        />
        {color === "green" && (
          <ImageBackground
            source={iconicTaxa[1]} // for cases where uri exists but photo is blank
            style={[viewStyles.imageCell, viewStyles.marginLeft]}
            imageStyle={viewStyles.imageCell}
          >
            <Image
              source={{ uri: originalImage }}
              style={viewStyles.imageCell}
            />
          </ImageBackground>
        )}
        <View>
          {( color === "gray" && originalImage ) && (
            <Image
              source={{ uri: originalImage }}
              style={[viewStyles.imageCell, viewStyles.marginLeft]}
            />
          )}
          {displayDate && (
            <View style={viewStyles.grayButton}>
              <Text style={textStyles.grayButtonText}>{displayDate}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
    <View style={viewStyles.innerContainer}>
      <View style={viewStyles.marginLarge} />
      {children}
      <View style={viewStyles.marginMedium} />
    </View>
  </View>
);

ModalWithGradient.defaultProps = {
  displayDate: null
};

export default ModalWithGradient;
