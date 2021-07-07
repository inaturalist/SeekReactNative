// @flow

import * as React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles/challenges/challengeDetails";
import i18n from "../../i18n";
import logos from "../../assets/logos";
import ChallengeMissionCard from "./ChallengeMissionCard";
import GreenText from "../UIComponents/GreenText";
import SpeciesObserved from "./SpeciesObserved";
import TapToLoad from "../UIComponents/SpeciesNearby/TapToLoad";

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
  const { navigate } = useNavigation();

  const navToChallenges = ( ) => navigate( "Challenges" );

  // only show for WWFOP, not NatGeo or future sponsors
  const photographerLogo = challenge.logo === "op" ? logos[challenge.secondLogo] : null;

  return (
    <View style={styles.whiteContainer}>
      <View style={styles.textContainer}>
        {challenge.startedDate && <ChallengeMissionCard challenge={challenge} />}
        <View style={styles.marginSmall} />
        <Text style={styles.descriptionText}>{i18n.t( challenge.description )}</Text>
        <View style={styles.marginLarge} />
      </View>
      {/* <TapToLoad handlePress={( ) => console.log( "pressed in tap to load" )} backgroundColor="white" />
      <View style={styles.marginLarge} /> */}
      {challenge.percentComplete > 0 && <SpeciesObserved challenge={challenge} />}
      <View style={styles.textContainer}>
        <GreenText
          text={challenge.logo === "iNatWhite"
            ? "inat_signup.learn_more"
            : "challenges.get_involved"
          }
        />
        <View style={styles.marginSmall} />
        <Text style={styles.descriptionText}>
          {i18n.t( challenge.action )}
        </Text>
        {challenge.photographer && (
          <>
            {photographerLogo && <Image source={photographerLogo} style={styles.opContainer} />}
            <Text style={[styles.descriptionText, styles.photographerText]}>
              {i18n.t( challenge.photographer )}
            </Text>
          </>
        )}
        <View style={styles.marginMedium} />
        <Text
          onPress={navToChallenges}
          style={styles.viewText}
        >
          {i18n.t( "challenges_card.view_all" )}
        </Text>
        <View style={styles.marginMedium} />
      </View>
    </View>
  );
};

export default ChallengeDetailsContainer;
