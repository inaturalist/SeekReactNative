// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import Realm from "realm";
import Modal from "react-native-modal";

import i18n from "../../i18n";
import realmConfig from "../../models";
import BannerHeader from "./BannerHeader";
import BadgeModal from "../AchievementModals/BadgeModal";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/badges";

type Props = {
  speciesBadges: Array<Object>
}

class SpeciesBadges extends Component<Props> {
  constructor() {
    super();

    this.state = {
      showBadgeModal: false,
      iconicTaxonBadges: [],
      iconicSpeciesCount: null
    };

    this.toggleBadgeModal = this.toggleBadgeModal.bind( this );
  }

  fetchBadgesByIconicId( taxaId ) {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" ).filtered( `iconicTaxonId == ${taxaId}` ).sorted( "index" );
        const collectedTaxa = realm.objects( "TaxonRealm" );
        const collection = collectedTaxa.filtered( `iconicTaxonId == ${taxaId}` ).length;
        // Alert.alert( JSON.stringify( badges, "badge iconic" ) );

        this.setState( {
          iconicTaxonBadges: badges,
          iconicSpeciesCount: collection
        }, () => this.toggleBadgeModal() );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  toggleBadgeModal() {
    const { showBadgeModal } = this.state;
    this.setState( { showBadgeModal: !showBadgeModal } );
  }

  renderBadgesRow( data ) {
    return (
      <FlatList
        data={data}
        contentContainerStyle={styles.badgesContainer}
        keyExtractor={badge => badge.name}
        numColumns={3}
        renderItem={( { item } ) => {
          let badgeIcon;
          if ( item.earned ) {
            badgeIcon = badgeImages[item.earnedIconName];
          } else {
            badgeIcon = badgeImages[item.unearnedIconName];
          }
          return (
            <TouchableOpacity
              style={styles.gridCell}
              onPress={() => this.fetchBadgesByIconicId( item.iconicTaxonId )}
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
    // console.log( speciesBadges, "species badges" );
    const { iconicTaxonBadges, showBadgeModal, iconicSpeciesCount } = this.state;
    // Alert.alert( JSON.stringify( iconicTaxonBadges ) );

    return (
      <View style={styles.secondTextContainer}>
        { iconicTaxonBadges.length > 0 ? (
          <Modal
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
              paddingBottom: 70
            }}
            isVisible={showBadgeModal}
            onBackdropPress={() => this.toggleBadgeModal()}
          >
            <BadgeModal
              badges={iconicTaxonBadges}
              iconicSpeciesCount={iconicSpeciesCount}
              toggleBadgeModal={this.toggleBadgeModal}
            />
          </Modal>
        ) : null}
        <BannerHeader text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()} />
        {this.renderBadgesRow( speciesBadges.slice( 0, 3 ) )}
        {this.renderBadgesRow( speciesBadges.slice( 3, 5 ) )}
        {this.renderBadgesRow( speciesBadges.slice( 5, 8 ) )}
        {this.renderBadgesRow( speciesBadges.slice( 8, 10 ) )}
        <View style={{ marginTop: 12 }} />
      </View>
    );
  }
}

export default SpeciesBadges;
