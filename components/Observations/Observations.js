// @flow

import React, { Component } from "react";
import {
  View,
  Platform,
  SectionList,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";
import Modal from "react-native-modal";

import i18n from "../../i18n";
import realmConfig from "../../models";
import styles from "../../styles/observations/observations";
import badges from "../../assets/badges";
import icons from "../../assets/icons";
import taxaIds from "../../utility/iconicTaxonDictById";
import GreenHeader from "../UIComponents/GreenHeader";
import SafeAreaView from "../UIComponents/SafeAreaView";
import NoObservations from "./NoObservations";
import ObservationCard from "./ObsCard";
import DeleteModal from "./DeleteModal";
import { sortNewestToOldest, removeFromCollection } from "../../utility/helpers";

type Props = {
  +navigation: any
}

class Observations extends Component<Props> {
  constructor() {
    super();

    this.state = {
      observations: [],
      showDeleteModal: false,
      itemToDelete: null,
      itemScrolledId: null
    };

    this.toggleDeleteModal = this.toggleDeleteModal.bind( this );
    this.deleteObservation = this.deleteObservation.bind( this );
    this.updateItemScrolledId = this.updateItemScrolledId.bind( this );
  }

  resetObservations() {
    this.setState( {
      observations: []
    } );
  }

  updateItemScrolledId( itemScrolledId ) {
    this.setState( { itemScrolledId } );
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

    const taxaIdList = Object.keys( taxaIds ).reverse();
    taxaIdList.pop();

    taxaIdList.forEach( ( id ) => {
      const data = species
        .filtered( `taxon.iconicTaxonId == ${id}` )
        .sorted( "date", true );

      const badgeCount = realm.objects( "BadgeRealm" )
        .filtered( `iconicTaxonId == ${id} AND earned == true` ).length;

      observations.push( {
        id,
        data: data.length > 0 ? data : [],
        badgeCount,
        open: true
      } );
    } );

    sortNewestToOldest( observations );

    const otherData = species
      .filtered( "taxon.iconicTaxonId == 1 OR taxon.iconicTaxonId == 47686 OR taxon.iconicTaxonId == 48222" )
      .sorted( "date", true );
    // added protozoans here because they weren't saving with iconicTaxonId == 1 on iOS

    observations.push( {
      id: 1,
      data: otherData,
      badgeCount: -1,
      open: true
    } );

    return species.length > 0 ? observations : [];
  }

  fetchObservations() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = this.createSectionList( realm );

        this.setState( { observations } );
      } )
      .catch( () => {
        // console.log( "Err: ", err )
      } );
  }

  removeFromObsList() {
    this.setState( { observations: [] } );
    this.fetchObservations();
  }

  async deleteObservation( id ) {
    await removeFromCollection( id );
    this.removeFromObsList();
  }

  toggleDeleteModal( id, photo, commonName, scientificName, iconicTaxonId ) {
    const { showDeleteModal } = this.state;

    this.setState( {
      showDeleteModal: !showDeleteModal,
      itemToDelete: {
        id,
        photo,
        commonName,
        scientificName,
        iconicTaxonId
      }
    } );
  }

  toggleSection( id ) {
    const { observations } = this.state;

    const section = observations.find( item => item.id === id );

    if ( section.open === true ) {
      section.open = false;
    } else {
      section.open = true;
    }

    this.setState( {
      observations
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

  render() {
    const {
      observations,
      showDeleteModal,
      itemToDelete,
      itemScrolledId
    } = this.state;
    const { navigation } = this.props;

    let content;

    if ( observations.length > 0 ) {
      content = (
        <SectionList
          ref={( ref ) => { this.scrollView = ref; }}
          contentContainerStyle={{ paddingBottom: Platform.OS === "android" ? 40 : 60 }}
          extraData={observations}
          initialNumToRender={6}
          keyExtractor={( item, index ) => item + index}
          renderItem={( { item, section } ) => {
            if ( section.open === true ) {
              return (
                <ObservationCard
                  item={item}
                  itemScrolledId={itemScrolledId}
                  navigation={navigation}
                  toggleDeleteModal={this.toggleDeleteModal}
                  updateItemScrolledId={this.updateItemScrolledId}
                />
              );
            }
            return null;
          }}
          renderSectionFooter={( { section: { id, data, open } } ) => this.renderEmptySection( id, data, open )}
          renderSectionHeader={( {
            section: {
              id,
              data,
              badgeCount,
              open
            }
          } ) => {
            let badge;

            if ( badgeCount === -1 ) {
              badge = null;
            } else if ( badgeCount === 0 ) {
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
                onPress={() => this.toggleSection( id )}
                style={styles.headerRow}
              >
                <Text style={styles.secondHeaderText}>
                  {i18n.t( taxaIds[id] ).toLocaleUpperCase()}
                </Text>
                <View style={styles.row}>
                  <Text style={styles.numberText}>{data.length}</Text>
                  {badgeCount === -1
                    ? <View style={{ marginRight: 7 }} />
                    : null}
                  {badgeCount !== -1
                    ? <Image source={badge} style={styles.badgeImage} />
                    : null}
                  {badgeCount !== -1
                    ? <View style={{ marginRight: open ? 15 : 19 }} />
                    : null}
                  <View style={{ marginRight: badge === badges.badge_empty_small ? -1 : null }} />
                  <Image source={open ? icons.dropdownOpen : icons.dropdownClosed} />
                </View>
              </TouchableOpacity>
            );
          }}
          sections={observations}
          stickySectionHeadersEnabled={false}
        />
      );
    } else {
      content = <NoObservations navigation={navigation} />;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
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
        <Modal isVisible={showDeleteModal}>
          <DeleteModal
            deleteObservation={this.deleteObservation}
            itemToDelete={itemToDelete}
            toggleDeleteModal={this.toggleDeleteModal}
          />
        </Modal>
        {content}
      </View>
    );
  }
}

export default Observations;
