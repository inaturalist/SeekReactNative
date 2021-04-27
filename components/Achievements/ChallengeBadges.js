import React, { useState, useEffect, useCallback } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Realm from "realm";
import { addMonths, isEqual } from "date-fns";

import realmConfig from "../../models";
import ChallengeModal from "../Modals/ChallengeEarnedModal";
import ChallengeUnearnedModal from "../Modals/ChallengeUnearnedModal";
import badgeImages from "../../assets/badges";
import { imageStyles, viewStyles } from "../../styles/badges/achievements";
import Modal from "../UIComponents/Modals/Modal";

const ChallengeBadges = () => {
  const [showModal, setModal] = useState( false );
  const [selectedChallenge, setChallenge] = useState( null );
  const [challengeBadges, setChallengeBadges] = useState( [] );

  const openModal = useCallback( () => setModal( true ), [] );
  const closeModal = useCallback( () => setModal( false ), [] );

  const createBadge = ( latestBadge, numOfMonths ) => ( {
    name: "",
    availableDate: addMonths( latestBadge.availableDate, numOfMonths ),
    index: latestBadge.index + numOfMonths
  } );

  const createPlaceholderBadges = useCallback( ( badges ) => {
    const remainderOfBadges = badges.length % 5;

    if ( remainderOfBadges === 0 || remainderOfBadges === 3 ) {
      // no placeholders needed
      return badges;
    }

    const badgePlaceholders = badges;
    const latestBadge = badges[badges.length - 1];

    let nextBadge = createBadge( latestBadge, 1 );

    // next challenge after Dec 2020 will be released Mar 2021
    if ( isEqual( new Date( 2020, 11, 1 ), new Date( latestBadge.availableDate ) ) ) {
      nextBadge = createBadge( latestBadge, 3 );
    }

    const badgeAfterNext = createBadge( latestBadge, 2 );

    if ( remainderOfBadges === 2 || remainderOfBadges === 4 ) {
      badgePlaceholders.push( nextBadge );
    }

    if ( remainderOfBadges === 1 ) {
      badgePlaceholders.push( nextBadge, badgeAfterNext );
    }

    return badgePlaceholders;
  }, [] );

  const fetchChallenges = useCallback( () => {
    Realm.open( realmConfig ).then( ( realm ) => {
      const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", false );
      const badges = challenges.map( ( challenge ) => challenge );

      const badgesWithPlaceholders = createPlaceholderBadges( badges );

      setChallengeBadges( badgesWithPlaceholders );
    } ).catch( () => {
      // console.log( "[DEBUG] Failed to open realm, error: ", err );
    } );
  }, [createPlaceholderBadges] );

  useEffect( () => { fetchChallenges(); }, [fetchChallenges] );

  const renderChallengeBadge = ( item ) => {
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

  const renderNextFiveChallenges = ( start, finish ) => (
    <View style={viewStyles.gridRowWrap} key={start}>
      {challengeBadges.slice( start, finish ).map( ( item, index ) => renderChallengeBadge( item ) )}
    </View>
  );

  const renderChallengesGrid = ( ) => {
    const numOfSets = Math.ceil( challengeBadges.length / 5 );
    const sets = [];

    for ( let i = 0; i < numOfSets; i += 1 ) {
      sets.push( i * 5 );
    }

    return sets.map( ( set, index ) => renderNextFiveChallenges( sets[index], sets[index + 1] ) );
  };

  return (
    <View>
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
      {challengeBadges.length > 0 && renderChallengesGrid( )}
      <View style={viewStyles.marginLarge} />
    </View>
  );
};

export default ChallengeBadges;
