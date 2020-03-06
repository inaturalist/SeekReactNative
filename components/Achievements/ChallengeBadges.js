import React, { useState, useEffect } from "react";
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
import Modal from "../UIComponents/Modal";

const ChallengeBadges = () => {
  const [showModal, setModal] = useState( false );
  const [selectedChallenge, setChallenge] = useState( null );
  const [challengeBadges, setChallengeBadges] = useState( [] );

  const openModal = () => setModal( true );
  const closeModal = () => setModal( false );

  const fetchChallenges = () => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const challenges = realm.objects( "ChallengeRealm" ).sorted( "availableDate", false );
        const badges = challenges.map( ( challenge ) => challenge );

        setChallengeBadges( badges );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  };

  useEffect( () => {
    fetchChallenges();
  }, [] );

  const renderChallengesRow = ( start, finish ) => (
    <FlatList
      alwaysBounceHorizontal={false}
      data={challengeBadges.slice( start, finish )}
      horizontal
      keyExtractor={( challenge, index ) => `${challenge.name}${index}`}
      renderItem={( { item } ) => {
        let badgeIcon;
        if ( item.percentComplete === 100 ) {
          badgeIcon = badgeImages[item.earnedIconName];
        } else {
          badgeIcon = badgeImages[item.unearnedIconName];
        }
        return (
          <TouchableOpacity
            onPress={() => {
              openModal();
              setChallenge( item );
            }}
            style={styles.gridCell}
          >
            <Image
              source={badgeIcon}
              style={styles.badgeIcon}
            />
          </TouchableOpacity>
        );
      }}
    />
  );

  return (
    <View style={styles.center}>
      {selectedChallenge && (
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
      )}
      <BannerHeader text={i18n.t( "badges.challenge_badges" ).toLocaleUpperCase()} />
      {renderChallengesRow( 0, 3 )}
      {renderChallengesRow( 3, 5 )}
      {renderChallengesRow( 5, 8 )}
      <View style={styles.marginLarge} />
    </View>
  );
};

export default ChallengeBadges;
