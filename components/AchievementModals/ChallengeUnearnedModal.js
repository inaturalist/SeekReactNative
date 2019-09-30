// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import moment from "moment";
import ProgressCircle from "react-native-progress-circle";

import i18n from "../../i18n";
import styles from "../../styles/badges/challengeBadgeUnearned";
import BannerHeader from "../Achievements/BannerHeader";
import badgeImages from "../../assets/badges";
import { checkIfChallengeAvailable } from "../../utility/dateHelpers";
import { setChallengeIndex } from "../../utility/challengeHelpers";
import { colors } from "../../styles/global";
import circleStyles from "../../styles/badges/progressCircle";
import BackButton from "./ModalBackButton";

type Props = {
  +toggleChallengeModal: Function,
  +challenge: Object,
  +navigation: any
};

const ChallengeUnearnedModal = ( { toggleChallengeModal, challenge, navigation }: Props ) => (
  <React.Fragment>
    <View style={styles.innerContainer}>
      <BannerHeader
        modal
        text={`${i18n.t( "challenges.op" ).toLocaleUpperCase()} ${i18n.t( "challenges.badge" ).toLocaleUpperCase()}`}
      />
      {challenge.started && challenge.percentComplete !== 100 ? (
        <ImageBackground
          imageStyle={styles.imageStyle}
          source={badgeImages[challenge.unearnedIconName]}
          style={[styles.image, circleStyles.center]}
        >
          <ProgressCircle
            bgColor={colors.white}
            borderWidth={3}
            color={colors.seekiNatGreen}
            outerCircleStyle={circleStyles.circleStyle}
            percent={challenge.percentComplete}
            radius={113 / 2}
            shadowColor={colors.circleGray}
          >
            <Text style={circleStyles.circleText}>
              {challenge.percentComplete}
              {" %"}
            </Text>
          </ProgressCircle>
        </ImageBackground>
      ) : (
        <Image
          source={badgeImages[challenge.unearnedIconName]}
          style={[styles.image, styles.imageStyle]}
        />
      )}
      <Text style={styles.headerText}>{i18n.t( "badges.to_earn" ).toLocaleUpperCase()}</Text>
      <Text style={styles.nameText}>
        {i18n.t( "challenges.how_to", { month: i18n.t( challenge.month ).split( " " )[0] } )}
      </Text>
      {checkIfChallengeAvailable( challenge.availableDate ) ? (
        <TouchableOpacity
          onPress={() => {
            setChallengeIndex( challenge.index );
            navigation.navigate( "ChallengeDetails" );
            toggleChallengeModal();
          }}
          style={styles.greenButton}
        >
          <Text style={styles.buttonText}>
            {i18n.t( "notifications.view_challenges" ).toLocaleUpperCase() }
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.italicText}>
          {i18n.t( "challenges.released", { date: moment( challenge.availableDate ).format( "MMMM DD, YYYY" ) } )}
        </Text>
      )}
    </View>
    <BackButton toggleModal={toggleChallengeModal} />
  </React.Fragment>
);

export default ChallengeUnearnedModal;
