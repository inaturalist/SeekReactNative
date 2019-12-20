// @flow

import React from "react";
import {
  View,
  Text,
  Image,
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
import BackButton from "../UIComponents/ModalBackButton";
import GreenButton from "../UIComponents/GreenButton";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +closeModal: Function,
  +challenge: Object,
  +navigation: any
};

const ChallengeUnearnedModal = ( { closeModal, challenge, navigation }: Props ) => (
  <>
    <View style={styles.innerContainer}>
      <View style={styles.center}>
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
      </View>
      <View style={styles.margins}>
        <GreenText
          center
          text={i18n.t( "badges.to_earn" ).toLocaleUpperCase()}
        />
      </View>
      <Text style={styles.nameText}>
        {i18n.t( "challenges.how_to", { month: i18n.t( challenge.month ).split( " " )[0] } )}
      </Text>
      {checkIfChallengeAvailable( challenge.availableDate ) ? (
        <View style={styles.container}>
          <GreenButton
            handlePress={() => {
              setChallengeIndex( challenge.index );
              navigation.navigate( "ChallengeDetails" );
              closeModal();
            }}
            text={i18n.t( "notifications.view_challenges" )}
          />
        </View>
      ) : (
        <Text style={[styles.italicText, styles.centerSelf]}>
          {i18n.t( "challenges.released", { date: moment( challenge.availableDate ).format( "MMMM DD, YYYY" ) } )}
        </Text>
      )}
    </View>
    <BackButton closeModal={closeModal} />
  </>
);

export default ChallengeUnearnedModal;
