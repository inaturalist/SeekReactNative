// @flow

import React, { useState, useCallback, useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import type { Node } from "react";

import ChallengeModal from "../Modals/ChallengeEarnedModal";
import ChallengeUnearnedModal from "../Modals/ChallengeUnearnedModal";
import badgeImages from "../../assets/badges";
import { imageStyles, viewStyles } from "../../styles/badges/achievements";
import Modal from "../UIComponents/Modals/Modal";
import { createBadgeSetList } from "../../utility/badgeHelpers";
import BadgeContainer from "../Achievements/BadgeContainer";

const SeekYearInReviewChallengeBadges = ( { challengeBadges } ): Node => {
  const [showModal, setModal] = useState( false );
  const [selectedChallenge, setChallenge] = useState( null );

  const sets = createBadgeSetList( challengeBadges );

  const openModal = useCallback( () => setModal( true ), [] );
  const closeModal = useCallback( () => setModal( false ), [] );

  const renderChallengesGrid = useMemo( ( ) => sets.map( ( set, index ) => {
    const setOfFive = challengeBadges.slice( sets[index], sets[index + 1] );

    const renderChallengeBadge = ( item: Object ) => {
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
