// @flow

import React, { useState, useCallback } from "react";
import { View, Image, TouchableOpacity, LogBox } from "react-native";
import type { Node } from "react";

import ChallengeModal from "../Modals/ChallengeEarnedModal";
import ChallengeUnearnedModal from "../Modals/ChallengeUnearnedModal";
import badgeImages from "../../assets/badges";
import { imageStyles, viewStyles } from "../../styles/badges/achievements";
import Modal from "../UIComponents/Modals/Modal";
import { createBadgeSetList } from "../../utility/badgeHelpers";
import BadgeList from "./BadgeList";
import { useFetchChallenges } from "./hooks/achievementHooks";

const ChallengeBadges = ( ): Node => {
  const challengeBadges = useFetchChallenges( );
  // FlatList renders twice, which throws the unique key error
  // FlatList within a ScrollView also isn't ideal, but it's fine here
  // since these are tiny lists, not long lists that need a ton of performance
  // and using Views instead of FlatList here caused the UI for the entire app
  // to stutter in Android
  LogBox.ignoreLogs( ["Each child in a list", "VirtualizedLists should never be nested"] );
  const [showModal, setModal] = useState( false );
  const [selectedChallenge, setChallenge] = useState( null );
  // const [challengeBadges, setChallengeBadges] = useState( [] );

  const sets = createBadgeSetList( challengeBadges );

  const openModal = useCallback( () => setModal( true ), [] );
  const closeModal = useCallback( () => setModal( false ), [] );

  const renderChallengeBadge = ( { item }: Object ) => {
    const openChallengeBadgeModal = () => {
      openModal();
      setChallenge( item );
    };

    return (
      <TouchableOpacity
        onPress={openChallengeBadgeModal}
        key={item.name}
      >
        <Image
          source={item.percentComplete === 100 ? badgeImages[item.earnedIconName] : badgeImages.badge_empty}
          style={imageStyles.badgeIcon}
        />
      </TouchableOpacity>
    );
  };

  const renderChallengesGrid = ( ) => sets.map( ( set, index ) => (
    <BadgeList
      data={challengeBadges.slice( sets[index], sets[index + 1] )}
      renderItem={renderChallengeBadge}
    />
  ) );

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
      {challengeBadges.length > 0 && renderChallengesGrid( )}
      <View style={viewStyles.marginLarge} />
    </>
  );
};

export default ChallengeBadges;
