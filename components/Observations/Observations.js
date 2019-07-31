// @flow

import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  SectionList,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";

import i18n from "../../i18n";
import realmConfig from "../../models";
import styles from "../../styles/observations/observations";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import Padding from "../Padding";
import taxaIds from "../../utility/iconicTaxonDictById";
import LoadingWheel from "../LoadingWheel";
import GreenHeader from "../GreenHeader";
import NoObservations from "./NoObservations";
import ObservationCard from "./ObsCard";
import { sortNewestToOldest } from "../../utility/helpers";

type Props = {
  navigation: any
}

class Observations extends Component<Props> {
  constructor() {
    super();

    this.state = {
      observations: [],
      loading: true
    };
  }

  resetObservations() {
    this.setState( {
      observations: [],
      loading: true
    } );
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollToLocation( {
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: 70,
        animated: Platform.OS === "android"
      } );
    }
  }

  createSectionList( realm ) {
    const observations = [];
    const species = realm.objects( "ObservationRealm" );
    const badges = realm.objects( "BadgeRealm" );

    const taxaIdList = Object.keys( taxaIds );

    taxaIdList.forEach( ( id ) => {
      const data = species
        .filtered( `taxon.iconicTaxonId == ${id}` )
        .sorted( "date", true );

      const badgeCount = badges
        .filtered( `iconicTaxonId == ${id} AND earned == true` ).length;

      observations.push( {
        id,
        data: data.length > 0 ? data : [],
        badgeCount,
        open: true
      } );
    } );

    sortNewestToOldest( observations );

    return species.length > 0 ? observations : [];
  }

  fetchObservations() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = this.createSectionList( realm );

        this.setState( {
          observations,
          loading: false
        } );
      } )
      .catch( () => {
        // console.log( "Err: ", err )
      } );
  }

  renderEmptySection( id, data, open ) {
    if ( data.length === 0 && open ) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {i18n.t( "observations.not_seen", { iconicTaxon: i18n.t( taxaIds[id] ) } )}
          </Text>
        </View>
      );
    }
    return null;
  }

  toggleSection( id ) {
    const { observations } = this.state;

    const section = observations.find( item => item.id === id );
    if ( section.open === true ) {
      section.open = false;
    } else {
      section.open = true;
    }
    console.log( section, "section" );

    this.setState( { observations } );
  }

  render() {
    const { observations, loading } = this.state;
    const { navigation } = this.props;

    let content;

    if ( loading ) {
      content = (
        <View style={styles.loadingWheel}>
          <LoadingWheel color="black" />
        </View>
      );
    } else if ( observations.length > 0 ) {
      content = (
        <View>
          <SectionList
            ref={( ref ) => { this.scrollView = ref; }}
            renderItem={( { item, section } ) => {
              if ( section.open === true ) {
                return (
                  <ObservationCard
                    navigation={navigation}
                    item={item}
                  />
                );
              }
              return null;
            }}
            renderSectionHeader={( {
              section: {
                id,
                data,
                badgeCount,
                open
              }
            } ) => {
              let badge;

              if ( badgeCount === 0 ) {
                badge = badges.badge_empty_small;
              } else if ( badgeCount === 1 ) {
                badge = badges.badge_bronze;
              } else if ( badgeCount === 2 ) {
                badge = badges.badge_silver;
              } else if ( badgeCount === 3 ) {
                badge = badges.badge_gold;
              }

              return (
                <TouchableOpacity
                  style={styles.headerRow}
                  onPress={() => this.toggleSection( id )}
                >
                  <Text style={styles.secondHeaderText}>
                    {i18n.t( taxaIds[id] ).toLocaleUpperCase()}
                  </Text>
                  <View style={styles.row}>
                    <Text style={styles.numberText}>
                      {data.length}
                    </Text>
                    <Image source={badge} style={styles.badgeImage} />
                    <View style={{ marginRight: badge === badges.badge_empty_small ? 14 : 15 }} />
                    <Image source={open ? icons.dropdownOpen : icons.dropdownClosed} />
                  </View>
                </TouchableOpacity>
              );
            }}
            sections={observations}
            initialNumToRender={7}
            stickySectionHeadersEnabled={false}
            keyExtractor={( item, index ) => item + index}
            renderSectionFooter={( { section: { id, data, open } } ) => this.renderEmptySection( id, data, open )}
          />
          <Padding />
        </View>
      );
    } else {
      content = <NoObservations navigation={navigation} />;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <NavigationEvents
            onDidFocus={() => {
              this.scrollToTop();
              this.fetchObservations();
            }}
            onWillBlur={() => this.resetObservations()}
          />
          <GreenHeader
            header={i18n.t( "observations.header" )}
            navigation={navigation}
          />
          {content}
        </SafeAreaView>
      </View>
    );
  }
}

export default Observations;
