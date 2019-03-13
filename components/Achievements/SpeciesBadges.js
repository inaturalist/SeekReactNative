// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";

import i18n from "../../i18n";
import BannerHeader from "./BannerHeader";
import badgeImages from "../../assets/badges";
import styles from "../../styles/badges/badges";

type Props = {
  speciesBadges: Object
}

class SpeciesBadges extends Component<Props> {
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

    return (
      <View style={styles.secondTextContainer}>
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
