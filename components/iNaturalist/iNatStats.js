// @flow

import React, { useContext } from "react";
import { View, Text } from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../styles/iNaturalist/iNatStats";
import i18n from "../../i18n";
import GreenText from "../UIComponents/GreenText";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import INatPhotos from "./iNatPhotos";
import BulletedList from "./BulletedList";
import { UserContext, AppOrientationContext } from "../UserContext";
import AppIconSubHeader from "./AppIconSubHeader";
import INatHeaderLoggedOut from "./iNatHeaderLoggedOut";
import INatHeaderLoggedIn from "./iNatHeaderLoggedIn";
import LoginCard from "../UIComponents/Login/LoginCard";

const INatDetails = ( ): Node => {
  const { login } = useContext( UserContext );
  const { isTablet } = useContext( AppOrientationContext );

  return (
    <ScrollWithHeader header="about_inat.inaturalist" footer>
      {login ? <INatHeaderLoggedIn /> : <INatHeaderLoggedOut />}
      <View style={[viewStyles.textContainer, isTablet && viewStyles.tabletContainer]}>
        <View style={viewStyles.sectionMargin} />
        <GreenText text="about_inat.inat_vs_seek" />
      </View>
      <AppIconSubHeader
        text={i18n.t( "about_inat.inat_is_an_online_community" )}
        icon="inat"
      />
      <View style={[viewStyles.textContainer, isTablet && viewStyles.tabletContainer]}>
        <BulletedList text="about_inat.inat_bullet_1" />
        <BulletedList text="about_inat.inat_bullet_2" />
        <BulletedList text="about_inat.inat_bullet_3" />
        <View style={viewStyles.smallSectionMargin} />
      </View>
      <AppIconSubHeader
        text={i18n.t( "about_inat.seek_is_an_id_app" )}
        icon="seek"
      />
      <View style={[viewStyles.textContainer, isTablet && viewStyles.tabletContainer]}>
        <BulletedList text="about_inat.seek_bullet_1" />
        <BulletedList text="about_inat.seek_bullet_2" />
        <BulletedList text="about_inat.seek_bullet_3" />
        <View style={viewStyles.sectionMargin} />
        <GreenText text="about_inat.your_obs_could_make_difference" />
        <Text style={[textStyles.text, textStyles.everydayObs]}>{i18n.t( "about_inat.everyday_obs_help_scientists" )}</Text>
      </View>
      <INatPhotos />
      <View style={[viewStyles.textContainer, isTablet && viewStyles.tabletContainer]}>
        <GreenText text="about_inat.faqs" />
        <BulletedList text="about_inat.faq_1" />
        <BulletedList text="about_inat.faq_2" />
        <LoginCard />
      </View>
    </ScrollWithHeader>
  );
};

export default INatDetails;
