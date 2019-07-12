// @flow

import React, { Component } from "react";
import {
  ScrollView,
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

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  fetchObservations() {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const observations = [];

        const species = realm.objects( "ObservationRealm" );
        const taxaIdList = Object.keys( taxaIds );

        taxaIdList.forEach( ( id ) => {
          const data = species
            .filtered( `taxon.iconicTaxonId == ${id}` )
            .sorted( "date", true );

          observations.push( {
            id,
            data: data.length > 0 ? data : []
          } );
        } );

        observations.sort( ( a, b ) => {
          if ( a.data.length > b.data.length ) {
            return -1;
          }
          return 1;
        } );

        this.setState( {
          observations: species.length > 0 ? observations : [],
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
        <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
          <View style={styles.secondTextContainer}>
            <SectionList
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
              keyExtractor={( item, index ) => item + index}
              renderSectionFooter={( { section: { id, data } } ) => this.renderEmptySection( id, data )}
            />
          </View>
          <Padding />
        </ScrollView>
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
