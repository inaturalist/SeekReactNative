// @flow

import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground
} from "react-native";
import { withNavigation } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/modals/challengeUnearnedModal";
import BannerHeader from "../Achievements/BannerHeader";
import badgeImages from "../../assets/badges";
import { checkIfChallengeAvailable, formatMonthYear, formatMonth } from "../../utility/dateHelpers";
import { setChallengeIndex } from "../../utility/challengeHelpers";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import PercentCircle from "../UIComponents/PercentCircle";
import { setRoute } from "../../utility/helpers";
import WhiteModal from "../UIComponents/WhiteModal";

type Props = {
  +closeModal: Function,
  +challenge: Object,
  +navigation: any
};

const ChallengeUnearnedModal = ( { closeModal, challenge, navigation }: Props ) => (
  <WhiteModal closeModal={closeModal}>
    <View style={styles.center}>
      <BannerHeader
        modal
        text={i18n.t( "seek_challenges.badge" ).toLocaleUpperCase()}
      />
      {challenge.startedDate && challenge.percentComplete !== 100 ? (
        <ImageBackground
          imageStyle={styles.imageStyle}
          source={badgeImages.badge_empty}
          style={[styles.image, styles.center]}
        >
          <PercentCircle challenge={challenge} large />
        </ImageBackground>
      ) : (
        <Image
          source={badgeImages.badge_empty}
          style={[styles.image, styles.imageStyle]}
        />
      )}
    </View>
    <View style={styles.margins}>
      <GreenText
        center
        text="badges.to_earn"
      />
    </View>
    <Text style={styles.nameText}>
      {i18n.t( "challenges.how_to", { month: formatMonth( challenge.availableDate ) } )}
    </Text>
    {checkIfChallengeAvailable( challenge.availableDate ) ? (
      <View style={styles.container}>
        <GreenButton
          handlePress={() => {
            setChallengeIndex( challenge.index );
            setRoute( "Achievements" );
            navigation.navigate( "ChallengeDetails" );
            closeModal();
          }}
          text="notifications.view_challenges"
        />
      </View>
    ) : (
      <Text style={[styles.italicText, styles.centerSelf]}>
        {i18n.t( "challenges.released", { date: formatMonthYear( challenge.availableDate ) } )}
      </Text>
    )}
  </WhiteModal>
);

export default withNavigation( ChallengeUnearnedModal );
