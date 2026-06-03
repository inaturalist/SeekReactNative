import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Image, View } from "react-native";

import logos from "../../../assets/logos";
import i18n from "../../../i18n";
import { imageStyles, textStyles, viewStyles } from "../../../styles/challenges/challengeDetails";
import { baseTextStyles } from "../../../styles/textStyles";
import GreenText from "../../UIComponents/GreenText";
import StyledText from "../../UIComponents/StyledText";
import ChallengeMissionCard from "./ChallengeMissionCard";
import SpeciesNearbyChallenge from "./SpeciesNearbyChallenge";
import SpeciesObserved from "./SpeciesObserved";

interface Props {
  challenge: {
    index: number;
    percentComplete: number;
    startedDate: Date;
    description: string;
    photographer?: string;
    action: string;
    logo: string;
    secondLogo: string;
  };
}

const ChallengeDetailsContainer = ( { challenge }: Props ) => {
  const { navigate } = useNavigation( );

  const navToChallenges = ( ) => navigate( "Challenges" );

  // only show for WWFOP, not NatGeo or future sponsors
  const photographerLogo = challenge.logo === "op" ? logos[challenge.secondLogo] : null;

  return (
    <View style={viewStyles.whiteContainer}>
      <View style={viewStyles.textContainer}>
        {challenge.startedDate && <ChallengeMissionCard challenge={challenge} />}
        <View style={viewStyles.marginSmall} />
        <StyledText style={baseTextStyles.body}>{i18n.t( challenge.description )}</StyledText>
        <View style={viewStyles.marginLarge} />
      </View>
      <SpeciesNearbyChallenge challenge={challenge} />
      {challenge.percentComplete > 0 && <SpeciesObserved challenge={challenge} />}
      <View style={viewStyles.textContainer}>
        <GreenText
          text={challenge.logo === "iNatWhite"
            ? "inat_signup.learn_more"
            : "challenges.get_involved"
          }
        />
        <View style={viewStyles.marginSmall} />
        <StyledText style={baseTextStyles.body}>
          {i18n.t( challenge.action )}
        </StyledText>
        {challenge.photographer && (
          <>
            {photographerLogo && <Image source={photographerLogo} style={viewStyles.opContainer} />}
            <StyledText style={[baseTextStyles.bodySmall, textStyles.photographerText]}>
              {i18n.t( challenge.photographer )}
            </StyledText>
          </>
        )}
        {challenge.secondLogo === "BeesChallengeChallengeDetail" && <Image source={logos[challenge.secondLogo]} style={imageStyles.myGardenContainer} />}
        <View style={viewStyles.marginMedium} />
        <StyledText
          onPress={navToChallenges}
          style={[baseTextStyles.bodyTeal, textStyles.viewText]}
        >
          {i18n.t( "challenges_card.view_all" )}
        </StyledText>
        <View style={viewStyles.marginMedium} />
      </View>
    </View>
  );
};

export default ChallengeDetailsContainer;
