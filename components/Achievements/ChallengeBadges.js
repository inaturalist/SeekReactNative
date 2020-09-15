import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import Realm from "realm";

import realmConfig from "../../models";
import i18n from "../../i18n";
import ChallengeModal from "../Modals/ChallengeEarnedModal";
import ChallengeUnearnedModal from "../Modals/ChallengeUnearnedModal";
import BannerHeader from "./BannerHeader";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/achievements";
import Modal from "../UIComponents/Modals/Modal";

const ChallengeBadges = () => {
  const [showModal, setModal] = useState( false );
  const [selectedChallenge, setChallenge] = useState( null );
  const [challengeBadges, setChallengeBadges] = useState( [] );

  const openModal = useCallback( () => setModal( true ), [] );
  const closeModal = useCallback( () => setModal( false ), [] );

  const createPlaceholderBadges = ( badges ) => {
    const badgePlaceholders = badges;

    const oct2020challenge = {
      name: "",
      availableDate: new Date( 2020, 9, 1 ),
      index: 14
    };

    if ( badgePlaceholders.length === 14 ) {
      badgePlaceholders.push( oct2020challenge );
    }

    return badgePlaceholders;
  };

  const fetchChallenges = useCallback( () => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", false );
      const badges = challenges.map( ( challenge ) => challenge );

      const badgesWithPlaceholders = createPlaceholderBadges( badges );

      setChallengeBadges( badgesWithPlaceholders );
    } ).catch( () => {
      // console.log( "[DEBUG] Failed to open realm, error: ", err );
    } );
  }, [] );

  useEffect( () => { fetchChallenges(); }, [fetchChallenges] );

  const renderChallengeBadge = ( { item } ) => {
    const openChallengeBadgeModal = () => {
      openModal();
      setChallenge( item );
    };

    let badgeIcon;
    if ( item.percentComplete === 100 ) {
      badgeIcon = badgeImages[item.earnedIconName];
    } else {
      badgeIcon = badgeImages.badge_empty;
    }
    return (
      <TouchableOpacity
        onPress={openChallengeBadgeModal}
        style={styles.gridCell}
      >
        <Image source={badgeIcon} style={styles.badgeIcon} />
      </TouchableOpacity>
    );
  };

  const renderChallengesRow = ( start, finish ) => (
    <FlatList
      alwaysBounceHorizontal={false}
      data={challengeBadges.slice( start, finish )}
      horizontal
      keyExtractor={( challenge, index ) => `${challenge.name}${index}`}
      renderItem={renderChallengeBadge}
    />
  );

  return (
    <View style={styles.center}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={selectedChallenge && selectedChallenge.percentComplete === 100 ? (
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
      <BannerHeader text={i18n.t( "badges.challenge_badges" ).toLocaleUpperCase()} />
      {renderChallengesRow( 0, 3 )}
      {renderChallengesRow( 3, 5 )}
      {renderChallengesRow( 5, 8 )}
      {renderChallengesRow( 8, 10 )}
      {renderChallengesRow( 10, 13 )}
      {renderChallengesRow( 13, 15 )}
      <View style={styles.marginLarge} />
    </View>
  );
};

export default ChallengeBadges;
