// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import moment from "moment";

import i18n from "../../i18n";
import styles from "../../styles/badges/challengeBadgeUnearned";
import BannerHeader from "../Achievements/BannerHeader";
import icons from "../../assets/icons";
import badgeImages from "../../assets/badges";
import { setChallengeIndex } from "../../utility/challengeHelpers";

type Props = {
  toggleChallengeModal: Function,
  challenge: Object,
  navigation: any
};

const ChallengeUnearnedModal = ( { toggleChallengeModal, challenge, navigation }: Props ) => (
  <SafeAreaView style={styles.safeView}>
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <BannerHeader
          text={`${i18n.t( "challenges.op" ).toLocaleUpperCase()} ${i18n.t( "challenges.badge" ).toLocaleUpperCase()}`}
          modal
        />
        <Image
          source={badgeImages[challenge.unearnedIconName]}
          style={[styles.image, styles.imageStyle]}
        />
        <Text style={styles.headerText}>{i18n.t( "badges.to_earn" ).toLocaleUpperCase()}</Text>
        <Text style={styles.nameText}>
          {i18n.t( "challenges.how_to", { month: i18n.t( challenge.month ).split( " " )[0] } )}
        </Text>
        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => {
            setChallengeIndex( challenge.index );
            navigation.navigate( "ChallengeDetails" );
            toggleChallengeModal();
          }}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "notifications.view_challenges" ).toLocaleUpperCase() }
          </Text>
        </TouchableOpacity>
        {/* <Text style={styles.italicText}>
          {i18n.t( "challenges.released", { date: moment( challenge.availableDate ).format( "MMMM DD, YYYY" ) } )}
        </Text> */}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => toggleChallengeModal()}>
        <Image source={icons.closeModal} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

export default ChallengeUnearnedModal;
