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
import BadgeContainer from "./BadgeContainer";
import { useFetchChallenges } from "./hooks/achievementHooks";

const ChallengeBadges = ( ): Node => {
  const challengeBadges = useFetchChallenges( );
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

      return (
        <TouchableOpacity onPress={openChallengeBadgeModal} key={item.earnedIconName}>
          <Image
            source={item.percentComplete === 100 ? badgeImages[item.earnedIconName] : badgeImages.badge_empty}
            style={imageStyles.badgeIcon}
          />
        </TouchableOpacity>
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

  return (
    <>
      {selectedChallenge && (
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          modal={selectedChallenge.percentComplete === 100 ? (
            <ChallengeModal
              challenge={selectedChallenge}
              closeModal={closeModal}
            />
          ) : (
            <ChallengeUnearnedModal
              challenge={selectedChallenge}
              closeModal={closeModal}
            />
          )}
        />
      )}
      {challengeBadges.length > 0 && renderChallengesGrid}
      <View style={viewStyles.marginLarge} />
    </>
  );
};

export default ChallengeBadges;
