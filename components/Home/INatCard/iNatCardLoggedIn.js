// @flow

import * as React from "react";
import { View, Platform } from "react-native";

import { viewStyles } from "../../../styles/home/inatCard";

import BulletedList from "../../iNaturalist/BulletedList";
import OpenINatButton from "../../UIComponents/Buttons/OpenINatButton";
import ProfileImageAndLogin from "../../iNaturalist/ProfileImageAndLogin";

const INatCardLoggedIn = ( ): React.Node => (
  <View style={viewStyles.textContainer}>
    <ProfileImageAndLogin />
    <BulletedList text="about_inat.logged_in_bullet_1" />
    <BulletedList text="about_inat.logged_in_bullet_2" />
    <View style={viewStyles.marginOpenINat} />
    {Platform.OS === "android" && <OpenINatButton />}
  </View>
);

export default INatCardLoggedIn;
