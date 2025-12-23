import * as React from "react";
import {
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, imageStyles, textStyles } from "../../styles/modals/challengeUnearnedModal";
import BannerHeader from "../UIComponents/BannerHeader";
import badgeImages from "../../assets/badges";
import { checkIfChallengeAvailable, formatMonthYear, formatMonth } from "../../utility/dateHelpers";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import PercentCircle from "../UIComponents/PercentCircle";
import WhiteModal from "../UIComponents/Modals/WhiteModal";
import StyledText from "../UIComponents/StyledText";
import { useChallenge } from "../Providers/ChallengeProvider";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly closeModal: ( ) => void;
  readonly challenge: {
    index: number;
    percentComplete: number;
    startedDate: Date;
    availableDate: Date;
  };
}

const ChallengeUnearnedModal = ( { closeModal, challenge }: Props ) => {
  const { setIndex } = useChallenge( );
  const navigation = useNavigation( );

  const navToChallengeDetails = ( ) => {
    setIndex( challenge.index );
    navigation.navigate( "ChallengeDetails" );
    closeModal();
  };

  return (
    <WhiteModal closeModal={closeModal}>
      <View style={viewStyles.center}>
        <BannerHeader
          modal
          text={i18n.t( "seek_challenges.badge" ).toLocaleUpperCase( )}
        />
        {challenge.startedDate && challenge.percentComplete !== 100 ? (
          <ImageBackground
            imageStyle={imageStyles.imageStyle}
            source={badgeImages.badge_empty}
            style={[imageStyles.emptyBadgeImage, viewStyles.center]}
          >
            <PercentCircle challenge={challenge} large />
          </ImageBackground>
        ) : (
          <Image
            source={badgeImages.badge_empty}
            style={[imageStyles.emptyBadgeImage, imageStyles.imageStyle]}
          />
        )}
      </View>
      <View style={viewStyles.margins}>
        <GreenText
          center
          text="badges.to_earn"
          allowFontScaling={false}
        />
      </View>
      <StyledText allowFontScaling={false} style={[baseTextStyles.body, textStyles.nameText]}>
        {i18n.t( "challenges.how_to", { month: formatMonth( challenge.availableDate ) } )}
      </StyledText>
      {checkIfChallengeAvailable( challenge.availableDate ) ? (
        <View style={viewStyles.container}>
          <GreenButton
            handlePress={navToChallengeDetails}
            text="notifications.view_challenges"
            allowFontScaling={false}
          />
        </View>
      ) : (
        <StyledText allowFontScaling={false} style={[baseTextStyles.bodyItalic, textStyles.italicText]}>
          {i18n.t( "challenges.released", { date: formatMonthYear( challenge.availableDate ) } )}
        </StyledText>
      )}
    </WhiteModal>
  );
};

export default ChallengeUnearnedModal;
