// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import ChallengeModal from "../Modals/ChallengeEarnedModal";
import ChallengeUnearnedModal from "../Modals/ChallengeUnearnedModal";
import BannerHeader from "./BannerHeader";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/badges";
import Modal from "../UIComponents/Modal";

type Props = {
  +challengeBadges: Array<Object>
}

type State = {
  showModal: boolean,
  selectedChallenge: Object
}

class ChallengeBadges extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      showModal: false,
      selectedChallenge: null
    };

    ( this:any ).closeModal = this.closeModal.bind( this );
  }

  setChallenge( selectedChallenge: Object ) {
    this.setState( { selectedChallenge } );
  }

  openModal() {
    this.setState( { showModal: true } );
  }

  closeModal() {
    this.setState( { showModal: false } );
  }

  renderChallengesRow( challengeBadges: Array<Object> ) {
    return (
      <FlatList
        alwaysBounceHorizontal={false}
        data={challengeBadges}
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
                this.openModal();
                this.setChallenge( item );
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
  }

  render() {
    const { challengeBadges } = this.props;
    const { showModal, selectedChallenge } = this.state;

    return (
      <View style={styles.center}>
        <Modal
          showModal={showModal}
          closeModal={this.closeModal}
          modal={selectedChallenge && selectedChallenge.percentComplete === 100 ? (
            <ChallengeModal
              challenge={selectedChallenge}
              closeModal={this.closeModal}
            />
          ) : (
            <ChallengeUnearnedModal
              challenge={selectedChallenge}
              closeModal={this.closeModal}
            />
          )}
        />
        <BannerHeader text={i18n.t( "badges.challenge_badges" ).toLocaleUpperCase()} />
        {this.renderChallengesRow( challengeBadges.slice( 0, 3 ) )}
        {this.renderChallengesRow( challengeBadges.slice( 3, 5 ) )}
        {this.renderChallengesRow( challengeBadges.slice( 5, 8 ) )}
        <View style={styles.marginLarge} />
      </View>
    );
  }
}

export default ChallengeBadges;
