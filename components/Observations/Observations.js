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
import EmptyState from "../UIComponents/EmptyState";
import ObservationCard from "./ObsCard";
import DeleteModal from "../Modals/DeleteModal";
import { removeFromCollection } from "../../utility/helpers";
import createSectionList from "../../utility/observationHelpers";

type Props = {
  +navigation: any
}

class Observations extends Component<Props> {
  constructor() {
    super();

    this.state = {
      observations: [],
      showModal: false,
      itemToDelete: null,
      itemScrolledId: null
    };

    this.openModal = this.openModal.bind( this );
    this.closeModal = this.closeModal.bind( this );
    this.deleteObservation = this.deleteObservation.bind( this );
    this.updateItemScrolledId = this.updateItemScrolledId.bind( this );
  }

  setObservations( observations ) {
    this.setState( { observations } );
  }

  resetObservations() {
    this.setState( { observations: [] } );
  }

  updateItemScrolledId( itemScrolledId ) {
    this.setState( { itemScrolledId } );
  }

  scrollToTop() {
    if ( this.sectionList ) {
      this.sectionList.scrollToLocation( {
        sectionIndex: 0,
        itemIndex: 0,
        viewOffset: 70,
        animated: Platform.OS === "android"
      } );
    }
  }

  fetchObservations() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = createSectionList( realm );

        this.setObservations( observations );
      } )
      .catch( () => {
        // console.log( "Err: ", err )
      } );
  }

  async deleteObservation( id ) {
    await removeFromCollection( id );
    this.resetObservations();
    this.fetchObservations();
  }

  openModal( id, photo, commonName, scientificName, iconicTaxonId ) {
    this.setState( {
      showModal: true,
      itemToDelete: {
        id,
        photo,
        commonName,
        scientificName,
        iconicTaxonId
      }
    } );
  }

  closeModal() {
    this.setState( { showModal: false } );
  }

  toggleSection( id ) {
    const { observations } = this.state;

    const section = observations.find( item => item.id === id );

    if ( section.open === true ) {
      section.open = false;
    } else {
      section.open = true;
    }

    this.setObservations( observations );
  }

  render() {
    const {
      observations,
      showModal,
      itemToDelete,
      itemScrolledId
    } = this.state;
    const { navigation } = this.props;

    let content;

    if ( observations.length > 0 ) {
      content = (
        <SectionList
          ref={( ref ) => { this.sectionList = ref; }}
          contentContainerStyle={styles.padding}
          initialNumToRender={6}
          keyExtractor={( item, index ) => item + index}
          renderItem={( { item, section } ) => {
            if ( section.open === true ) {
              return (
                <ObservationCard
                  item={item}
                  itemScrolledId={itemScrolledId}
                  navigation={navigation}
                  openModal={this.openModal}
                  updateItemScrolledId={this.updateItemScrolledId}
                />
              );
            }
            return null;
          }}
          renderSectionFooter={( {
            section: {
              id,
              data,
              open
            }
          } ) => {
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
                onPress={() => this.toggleSection( id )}
                style={styles.headerRow}
              >
                <Text style={styles.secondHeaderText}>
                  {i18n.t( taxaIds[id] ).toLocaleUpperCase()}
                </Text>
                <View style={styles.row}>
                  <Text style={styles.numberText}>{data.length}</Text>
                  {badgeCount !== -1 ? (
                    <>
                      <View style={styles.marginSmall} />
                      <Image source={badge} style={styles.badgeImage} />
                      <View style={[styles.margin, open && styles.marginOpen]} />
                    </>
                  ) : null}
                  <View style={[
                    styles.noMargin,
                    badgeCount === -1 && styles.marginBadgeEmpty]}
                  />
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
      content = <EmptyState navigation={navigation} screen="observations" />;
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <NavigationEvents
          onWillBlur={() => {
            this.scrollToTop();
            this.resetObservations();
          }}
          onWillFocus={() => this.fetchObservations()}
        />
        <GreenHeader
          header={i18n.t( "observations.header" )}
          navigation={navigation}
        />
        <Modal isVisible={showModal}>
          <DeleteModal
            deleteObservation={this.deleteObservation}
            itemToDelete={itemToDelete}
            closeModal={this.closeModal}
          />
        </Modal>
        {content}
      </View>
    );
  }
}

export default Observations;
