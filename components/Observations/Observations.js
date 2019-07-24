// @flow

import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  SectionList,
  Text
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";

import i18n from "../../i18n";
import realmConfig from "../../models";
import styles from "../../styles/observations";
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
    const taxaIdList = Object.keys( taxaIds );

    taxaIdList.forEach( ( id ) => {
      const data = species
        .filtered( `taxon.iconicTaxonId == ${id}` )
        .sorted( "date", true );

        console.log( data.length, "data length", id );

      observations.push( {
        id,
        data: data.length > 0 ? data : []
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

  renderEmptySection( id, data ) {
    if ( data.length === 0 ) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {i18n.t( "observations.not_seen", { iconicTaxon: i18n.t( taxaIds[id] ) } )}
          </Text>
        </View>
      );
    }
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
            style={styles.secondTextContainer}
            renderItem={( { item } ) => (
              <ObservationCard
                navigation={navigation}
                item={item}
              />
            )}
            renderSectionHeader={( { section: { id } } ) => (
              <Text style={styles.secondHeaderText}>
                {i18n.t( taxaIds[id] ).toLocaleUpperCase()}
              </Text>
            )}
            sections={observations}
            initialNumToRender={5}
            stickySectionHeadersEnabled={false}
            keyExtractor={( item, index ) => item + index}
            renderSectionFooter={( { section: { id, data } } ) => this.renderEmptySection( id, data )}
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
