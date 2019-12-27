// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";

import i18n from "../../i18n";
import realmConfig from "../../models";
import BannerHeader from "./BannerHeader";
import BadgeModal from "../Modals/BadgeModal";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/badges";

type Props = {
  +speciesBadges: Array<Object>
}

type State = {
  showModal: boolean,
  iconicTaxonBadges: Array<Object>,
  iconicSpeciesCount: ?number
}

class SpeciesBadges extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      showModal: false,
      iconicTaxonBadges: [],
      iconicSpeciesCount: null
    };

    ( this:any ).closeModal = this.closeModal.bind( this );
  }

  fetchBadgesByIconicId( taxaId ) {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" ).filtered( `iconicTaxonId == ${taxaId}` ).sorted( "index" );
        const collectedTaxa = realm.objects( "TaxonRealm" );
        const collection = collectedTaxa.filtered( `iconicTaxonId == ${taxaId}` ).length;

        this.setState( {
          iconicTaxonBadges: badges,
          iconicSpeciesCount: collection
        }, () => this.openModal() );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  openModal() {
    this.setState( { showModal: true } );
  }

  closeModal() {
    this.setState( { showModal: false } );
  }

  renderBadgesRow( data ) {
    return (
      <FlatList
        alwaysBounceHorizontal={false}
        data={data}
        horizontal
        keyExtractor={( badge, index ) => `${badge.name}${index}`}
        renderItem={( { item } ) => {
          let badgeIcon;
          if ( item.earned ) {
            badgeIcon = badgeImages[item.earnedIconName];
          } else {
            badgeIcon = badgeImages[item.unearnedIconName];
          }
          return (
            <TouchableOpacity
              onPress={() => this.fetchBadgesByIconicId( item.iconicTaxonId )}
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
    const { speciesBadges } = this.props;
    const { iconicTaxonBadges, showModal, iconicSpeciesCount } = this.state;

    return (
      <View style={styles.center}>
        {iconicTaxonBadges.length > 0 ? (
          <Modal
            isVisible={showModal}
            onBackdropPress={() => this.closeModal()}
          >
            <BadgeModal
              badges={iconicTaxonBadges}
              iconicSpeciesCount={iconicSpeciesCount}
              closeModal={this.closeModal}
            />
          </Modal>
        ) : null}
        <BannerHeader text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()} />
        {this.renderBadgesRow( speciesBadges.slice( 0, 3 ) )}
        {this.renderBadgesRow( speciesBadges.slice( 3, 5 ) )}
        {this.renderBadgesRow( speciesBadges.slice( 5, 8 ) )}
        {this.renderBadgesRow( speciesBadges.slice( 8, 10 ) )}
        <View style={styles.margin} />
      </View>
    );
  }
}

export default SpeciesBadges;
