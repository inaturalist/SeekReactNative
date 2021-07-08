// @flow

import * as React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../../styles/challenges/challengeDetails";
import i18n from "../../../i18n";
import logos from "../../../assets/logos";
import ChallengeMissionCard from "./ChallengeMissionCard";
import GreenText from "../../UIComponents/GreenText";
import SpeciesObserved from "./SpeciesObserved";
import SpeciesNearbyChallenge from "./SpeciesNearbyChallenge";

type Props = {
  challenge: {
    percentComplete: number,
    startedDate: Date,
    description: string,
    photographer: ?string,
    action: string,
    logo: string,
    secondLogo: string
  }
}

const ChallengeDetailsContainer = ( { challenge }: Props ): React.Node => {
  const { navigate } = useNavigation( );

  const navToChallenges = ( ) => navigate( "Challenges" );

  // only show for WWFOP, not NatGeo or future sponsors
  const photographerLogo = challenge.logo === "op" ? logos[challenge.secondLogo] : null;

  return (
    <View style={viewStyles.whiteContainer}>
      <View style={viewStyles.textContainer}>
        {challenge.startedDate && <ChallengeMissionCard challenge={challenge} />}
        <View style={viewStyles.marginSmall} />
        <Text style={textStyles.descriptionText}>{i18n.t( challenge.description )}</Text>
        <View style={viewStyles.marginLarge} />
      </View>
      {/* <SpeciesNearbyChallenge challenge={challenge} /> */}
      {challenge.percentComplete > 0 && <SpeciesObserved challenge={challenge} />}
      <View style={viewStyles.textContainer}>
        <GreenText
          text={challenge.logo === "iNatWhite"
            ? "inat_signup.learn_more"
            : "challenges.get_involved"
          }
        />
        <View style={viewStyles.marginSmall} />
        <Text style={textStyles.descriptionText}>
          {i18n.t( challenge.action )}
        </Text>
        {challenge.photographer && (
          <>
            {photographerLogo && <Image source={photographerLogo} style={viewStyles.opContainer} />}
            <Text style={[textStyles.descriptionText, textStyles.photographerText]}>
              {i18n.t( challenge.photographer )}
            </Text>
          </>
        )}
        <View style={viewStyles.marginMedium} />
        <Text
          onPress={navToChallenges}
          style={textStyles.viewText}
        >
          {i18n.t( "challenges_card.view_all" )}
        </Text>
        <View style={viewStyles.marginMedium} />
      </View>
    </View>
  );
};

export default ChallengeDetailsContainer;
