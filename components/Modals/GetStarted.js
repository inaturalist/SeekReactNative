// @flow

import * as React from "react";
import {
  View,
  Image
} from "react-native";

import i18n from "../../i18n";
import { viewStyles, imageStyles } from "../../styles/modals/getStarted";
import icons from "../../assets/icons";
import GreenText from "../UIComponents/GreenText";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import DescriptionText from "../UIComponents/DescriptionText";

type Props = {
  +closeModal: Function
}

const GetStarted = ( { closeModal }: Props ): React.Node => (
  <View
    style={viewStyles.container}
    accessible
    accessibilityLabel={i18n.t( "accessibility.get_started_modal" )}
  >
    <View style={viewStyles.headerMargin}>
      <GreenText allowFontScaling={false} text="get_started.header" />
    </View>
    <View style={viewStyles.marginTop} />
    <View style={[viewStyles.row, viewStyles.margin]}>
      <Image source={icons.cameraGreen} style={imageStyles.image} />
      <View style={viewStyles.textContainer}>
        <DescriptionText allowFontScaling={false} text={i18n.t( "get_started.tip_1" )} />
      </View>
    </View>
    <View style={viewStyles.marginMiddle} />
    <View style={[viewStyles.row, viewStyles.margin]}>
      <Image source={icons.speciesNearby} style={imageStyles.image} />
      <View style={viewStyles.textContainer}>
        <DescriptionText allowFontScaling={false} text={i18n.t( "get_started.tip_2" )} />
      </View>
    </View>
    <View style={viewStyles.marginMiddle} />
    <View style={[viewStyles.row, viewStyles.margin]}>
      <Image source={icons.birdBadge} style={imageStyles.image} />
      <View style={viewStyles.textContainer}>
        <DescriptionText allowFontScaling={false} text={i18n.t( "get_started.tip_3" )} />
      </View>
    </View>
    <View style={viewStyles.button}>
      <GreenButton
        handlePress={closeModal}
        text="onboarding.continue"
        allowFontScaling={false}
      />
    </View>
  </View>
);

export default GetStarted;
