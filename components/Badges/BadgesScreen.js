// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";

import i18n from "../../i18n";
import badgeImages from "../../assets/badges";
import taxonIds from "../../utility/taxonDict";
import realmConfig from "../../models";
import styles from "../../styles/badges/badges";
import Footer from "../Home/Footer";
import Padding from "../Padding";
import BannerHeader from "./BannerHeader";
import LevelModal from "./LevelModal";

type Props = {
  navigation: any
}

class BadgesScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      speciesBadges: [],
      challengeBadges: [],
      level: null,
      nextLevelCount: null,
      badgesEarned: null,
      speciesCount: null,
      showModal: false
    };

    this.toggleLevelModal = this.toggleLevelModal.bind( this );
  }

  fetchBadges() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const badges = realm.objects( "BadgeRealm" );
        const badgesEarned = badges.filtered( "earned == true" ).length;

        const taxaIds = Object.keys( taxonIds ).map( id => taxonIds[id] );

        const speciesBadges = [];

        taxaIds.forEach( ( id ) => {
          const tempBadges = badges.filtered( `iconicTaxonName != null AND iconicTaxonId == ${id}` );
          const sorted = tempBadges.sorted( "earnedDate", true );
          speciesBadges.push( sorted[0] );
        } );

        const levelsEarned = badges.filtered( "iconicTaxonName == null AND earned == true" ).sorted( "count", true );
        const nextLevel = badges.filtered( "iconicTaxonName == null AND earned == false" ).sorted( "count" );

        speciesBadges.sort( ( a, b ) => {
          if ( a.earnedDate > b.earnedDate ) {
            return -1;
          }
          return 1;
        } );

        this.setState( {
          speciesBadges,
          level: levelsEarned.length > 0 ? levelsEarned[0] : nextLevel[0],
          nextLevelCount: nextLevel[0].count,
          badgesEarned
        } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  fetchSpeciesCount() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const speciesCount = realm.objects( "ObservationRealm" ).length;
        this.setState( { speciesCount } );
      } ).catch( () => {
        // console.log( "[DEBUG] Failed to open realm, error: ", err );
      } );
  }

  toggleLevelModal() {
    const { showModal } = this.state;
    this.setState( { showModal: !showModal } );
  }

  render() {
    const {
      speciesBadges,
      level,
      nextLevelCount,
      badgesEarned,
      speciesCount,
      showModal
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.fetchBadges();
            this.fetchSpeciesCount();
          }}
        />
        <ScrollView>
          <LinearGradient
            colors={["#22784d", "#38976d"]}
            style={styles.header}
          >
            <Modal
              isVisible={showModal}
              onSwipe={() => this.toggleLevelModal()}
              onBackdropPress={() => this.toggleLevelModal()}
              swipeDirection="down"
            >
              <LevelModal
                level={level}
                toggleLevelModal={this.toggleLevelModal}
              />
            </Modal>
            {level ? (
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => this.toggleModal()}
                >
                  <Image source={badgeImages[level.earnedIconName]} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.headerText}>{level.name.toLocaleUpperCase()}</Text>
                  <Text style={styles.text}>{i18n.t( "badges.observe", { number: nextLevelCount } )}</Text>
                </View>
              </View>
            ) : null}
          </LinearGradient>
          <View style={styles.secondTextContainer}>
            <BannerHeader text={i18n.t( "badges.species_badges" ).toLocaleUpperCase()} />
          </View>
          <FlatList
            data={speciesBadges}
            style={styles.badgesContainer}
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
                  onPress={() => console.log( "modal will pop up here" )}
                >
                  <View style={styles.gridCellContents}>
                    <Image
                      source={badgeIcon}
                      style={styles.badgeIcon}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <View style={styles.secondTextContainer}>
            <BannerHeader text={i18n.t( "badges.challenge_badges" ).toLocaleUpperCase()} />
            <View style={styles.stats}>
              <View>
                <Text style={styles.secondHeaderText}>{i18n.t( "badges.observed" ).toLocaleUpperCase()}</Text>
                <Text style={styles.number}>{speciesCount}</Text>
              </View>
              <View>
                <Text style={styles.secondHeaderText}>{i18n.t( "badges.earned" ).toLocaleUpperCase()}</Text>
                <Text style={styles.number}>{badgesEarned}</Text>
              </View>
            </View>
          </View>
          <Padding />
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default BadgesScreen;
