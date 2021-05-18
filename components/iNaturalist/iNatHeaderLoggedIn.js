// @flow

import React from "react";
import { View } from "react-native";
import type { Node } from "react";
import LinearGradient from "react-native-linear-gradient";

import { viewStyles } from "../../styles/iNaturalist/iNatStats";
import { colors } from "../../styles/global";
import BulletedList from "./BulletedList";
import OpenINatButton from "../UIComponents/Buttons/OpenINatButton";
import ProfileImageAndLogin from "./ProfileImageAndLogin";

const INatHeaderLoggedIn = ( ): Node => (
  <>
    <LinearGradient
      colors={[colors.greenGradientDark, colors.greenGradientLight]}
      style={[viewStyles.linearGradient]}
    >
      <ProfileImageAndLogin />
      <OpenINatButton />
    </LinearGradient>
    <View style={viewStyles.loggedInHeaderMargin} />
    <View style={viewStyles.textContainer}>
    <BulletedList text="about_inat.logged_in_bullet_1" />
    <BulletedList text="about_inat.logged_in_bullet_2" />
    <BulletedList text="about_inat.logged_in_bullet_3" />
    </View>
  </>
);

export default INatHeaderLoggedIn;
