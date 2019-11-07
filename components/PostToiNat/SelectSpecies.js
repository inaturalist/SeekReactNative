// @flow

import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
  TextInput,
  Keyboard
} from "react-native";
import { NavigationEvents } from "react-navigation";
import inatjs from "inaturalistjs";

import styles from "../../styles/posting/selectSpecies";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import postingIcons from "../../assets/posting";
import Padding from "../UIComponents/Padding";
import SpeciesCard from "../UIComponents/SpeciesCard";
import { capitalizeNames } from "../../utility/helpers";
import GreenText from "../UIComponents/GreenText";
import SafeAreaView from "../UIComponents/SafeAreaView";

type Props = {
  +toggleSpeciesModal: Function,
  +image: string,
  +commonName: string,
  +scientificName: string,
  +updateTaxon: Function,
  +seekId: Number
}


class SelectSpecies extends Component<Props> {
  constructor() {
    super();

    this.state = {
      suggestions: [],
      isSearching: false
    };
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  searchForSpecies( speciesName ) {
    this.setState( { isSearching: true } );
    const params = {
      q: speciesName,
      per_page: 5,
      is_active: true,
      locale: i18n.currentLocale()
    };

    inatjs.taxa.autocomplete( params ).then( ( { results } ) => {
      const suggestions = [];

      if ( results.length > 0 ) {
        results.forEach( ( suggestion ) => {
          const suggestedSpecies = {
            image: suggestion.defaultPhoto && suggestion.defaultPhoto.medium_url
              ? suggestion.defaultPhoto.medium_url
              : null,
            commonName: capitalizeNames( suggestion.preferred_common_name || suggestion.name ),
            scientificName: suggestion.name,
            id: suggestion.id,
            iconicTaxonId: suggestion.iconic_taxon_id
          };

          suggestions.push( suggestedSpecies );
        } );
      }

      this.setState( { suggestions } );
    } ).catch( ( err ) => {
      console.log( err, "catch error" );
    } );
  }

  render() {
    const { suggestions, isSearching } = this.state;
    const {
      toggleSpeciesModal,
      updateTaxon,
      image,
      commonName,
      scientificName,
      seekId
    } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <StatusBar barStyle="light-content" />
        <NavigationEvents
          onWillFocus={() => this.scrollToTop()}
        />
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.back" )}
            accessible
            hitSlop={styles.touchable}
            onPress={() => toggleSpeciesModal()}
            style={styles.backButton}
          >
            <Image source={icons.backButton} />
          </TouchableOpacity>
          <Text style={styles.text}>
            {i18n.t( "posting.what_seen" ).toLocaleUpperCase()}
          </Text>
        </View>
        <ScrollView
          ref={( ref ) => { this.scrollView = ref; }}
          keyboardDismissMode="on-drag"
          onScroll={() => Keyboard.dismiss()}
          scrollEventThrottle={1}
        >
          <View style={styles.photoContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <View style={styles.row}>
            <Image source={postingIcons.search} />
            <TextInput
              onChangeText={text => this.searchForSpecies( text )}
              placeholder={i18n.t( "posting.look_up" )}
              placeholderTextColor="#828282"
              style={styles.inputField}
            />
          </View>
          <View style={styles.textContainer}>
            {!isSearching
              ? (
                <View style={styles.headerMargins}>
                  <GreenText text={i18n.t( "posting.id" ).toLocaleUpperCase()} />
                </View>
              ) : null}
            {!isSearching ? (
              <SpeciesCard
                commonName={commonName}
                handlePress={() => {
                  updateTaxon( seekId, commonName, scientificName );
                  toggleSpeciesModal();
                }}
                photo={{ uri: image }}
                scientificName={scientificName}
              />
            ) : (
              suggestions.map( ( item, index ) => (
                <View
                  key={`${item.scientificName}${index}`}
                  style={styles.card}
                >
                  <SpeciesCard
                    commonName={item.commonName}
                    handlePress={() => {
                      updateTaxon( item.id, item.commonName, item.scientificName );
                      toggleSpeciesModal();
                    }}
                    iconicTaxonId={item.iconicTaxonId}
                    photo={{ uri: item.image }}
                    scientificName={item.scientificName}
                  />
                </View>
              ) ) )}
          </View>
          <Padding />
        </ScrollView>
      </View>
    );
  }
}

export default SelectSpecies;
