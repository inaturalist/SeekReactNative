import React, { useCallback, useMemo, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

import badgeImages from "../../assets/badges";
import { imageStyles, viewStyles } from "../../styles/badges/achievements";
import { createBadgeSetList } from "../../utility/badgeHelpers";
import BadgeContainer from "../Achievements/BadgeContainer";
import ChallengeModal from "../Modals/ChallengeEarnedModal";
import Modal from "../UIComponents/Modals/Modal";

interface ChallengeBadge {
  availableDate: Date;
  backgroundName: string;
  sponsorName: string;
  secondLogo: string;
  earnedIconName: string;
  badgeName: string;
  percentComplete: number;
  name: string;
}

interface Props {
  challengeBadges: ChallengeBadge[];
}

const SeekYearInReviewChallengeBadges = ( { challengeBadges }: Props ) => {
  const [showModal, setModal] = useState( false );
  const [selectedChallenge, setChallenge] = useState<ChallengeBadge | null>( null );

  const sets = createBadgeSetList( challengeBadges );

  const openModal = useCallback( () => setModal( true ), [] );
  const closeModal = useCallback( () => setModal( false ), [] );

  const renderChallengesGrid = useMemo( ( ) => sets.map( ( set, index ) => {
    const setOfFive = challengeBadges.slice( sets[index], sets[index + 1] );

    const renderChallengeBadge = ( item: ChallengeBadge ) => {
      const openChallengeBadgeModal = () => {
        openModal();
        setChallenge( item );
      };
      const isComplete = item.percentComplete === 100;
      const Container = isComplete ? TouchableOpacity : View;
      return (
        <Container onPress={openChallengeBadgeModal} key={item.earnedIconName}>
          <Image
            source={isComplete ? badgeImages[item.earnedIconName] : badgeImages.badge_empty}
            style={imageStyles.badgeIcon}
          />
        </Container>
      );
    };

    return (
      <View key={`challenge-grid-${sets[index]}`}>
        <BadgeContainer
          data={setOfFive}
          renderItem={renderChallengeBadge}
        />
      </View>
    );
  } ), [challengeBadges, sets, openModal] );

  const isCompletedChallenge = selectedChallenge?.percentComplete === 100;

  return (
    <>
      {selectedChallenge && (
        <Modal
          showModal={isCompletedChallenge ? showModal : false}
          closeModal={closeModal}
          modal={
            isCompletedChallenge ? (
              <ChallengeModal
                challenge={selectedChallenge}
                closeModal={closeModal}
              />
            ) : null
          }
        />
      )}
      {challengeBadges.length > 0 && renderChallengesGrid}
      <View style={viewStyles.marginLarge} />
    </>
  );
};

export default SeekYearInReviewChallengeBadges;
