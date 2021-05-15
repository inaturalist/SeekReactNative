// @flow

import React, { useContext } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import { viewStyles, textStyles } from "../../styles/iNaturalist/iNatStats";
import i18n from "../../i18n";
// import icons from "../../assets/icons";
// import backgrounds from "../../assets/backgrounds";
// import logos from "../../assets/logos";
import GreenText from "../UIComponents/GreenText";
import ScrollWithHeader from "../UIComponents/Screens/ScrollWithHeader";
import INatPhotos from "./iNatPhotos";
import INatLogin from "./iNatLogin";
import INatValueProps from "./iNatValueProps";
import INatSignOut from "./iNatSignOut";
import BulletedList from "./BulletedList";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import { UserContext } from "../UserContext";

const INatDetails = ( ): Node => {
  const { login } = useContext( UserContext );
  const navigation = useNavigation( );
  const logIntoiNat = ( ) => navigation.navigate( "LoginOrSignup" );

 return (
    <ScrollWithHeader header="about_inat.inaturalist">
      <View style={viewStyles.textContainer}>
      <Text style={textStyles.secondHeaderText}>{i18n.t( "about_inat.log_in_to_post_observations" )}</Text>
        <GreenButton
          handlePress={logIntoiNat}
          text="about_inat.log_in_with_inat"
        />
        <GreenText text="about_inat.use_inat_to" />
        <INatValueProps />
        <GreenText text="about_inat.inat_vs_seek" />
        <Text style={textStyles.secondHeaderText}>{i18n.t( "about_inat.inat_is_an_online_community" )}</Text>
        {[1, 2, 3].map( item => (
          <BulletedList text={`about_inat.inat_bullet_${item}`} />
        ) )}
        <Text style={textStyles.secondHeaderText}>{i18n.t( "about_inat.seek_is_an_id_app" )}</Text>
        {[1, 2, 3].map( item => (
          <BulletedList text={`about_inat.seek_bullet_${item}`} />
        ) )}
        <GreenText text="about_inat.your_obs_could_make_difference" />
        <Text style={textStyles.text}>{i18n.t( "about_inat.everyday_obs_help_scientists" )}</Text>
      </View>
      <INatPhotos />
      <View style={viewStyles.textContainer}>
        <GreenText text="about_inat.faqs" />
        {[1, 2].map( itemNumber => (
          <BulletedList text={`about_inat.faq_${itemNumber}`} />
        ) )}
        {login ? <INatSignOut /> : <INatLogin />}
      </View>
    </ScrollWithHeader>
  );
};

export default INatDetails;
