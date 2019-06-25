// @flow

import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert
} from "react-native";
import { NavigationEvents } from "react-navigation";
import inatjs from "inaturalistjs";

import styles from "../../styles/posting/selectSpecies";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import postingIcons from "../../assets/posting";
import Padding from "../Padding";
import SpeciesCard from "./SpeciesCard";
import { capitalizeNames } from "../../utility/helpers";

type Props = {
  toggleSpeciesModal: Function,
  image: string,
  commonName: string,
  scientificName: string,
  updateTaxon: Function
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
            image: suggestion.defaultPhoto.medium_url,
            commonName: capitalizeNames( suggestion.preferred_common_name || suggestion.name ),
            scientificName: suggestion.name,
            id: suggestion.id
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
      scientificName
    } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <StatusBar barStyle="light-content" />
          <NavigationEvents
            onWillFocus={() => this.scrollToTop()}
          />
          <View style={styles.header}>
            <TouchableOpacity
              hitSlop={styles.touchable}
              style={styles.backButton}
              onPress={() => toggleSpeciesModal()}
            >
              <Image source={icons.backButton} />
            </TouchableOpacity>
            <Text style={styles.text}>
              {i18n.t( "posting.what_seen" ).toLocaleUpperCase()}
            </Text>
          </View>
          <ScrollView ref={( ref ) => { this.scrollView = ref; }}>
            <View style={styles.photoContainer}>
              <Image source={{ uri: image }} style={styles.image} />
            </View>
            <View style={styles.row}>
              <Image source={postingIcons.search} />
              <TextInput
                style={styles.inputField}
                placeholder={i18n.t( "posting.look_up" )}
                onChangeText={text => this.searchForSpecies( text )}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>{i18n.t( "posting.id" ).toLocaleUpperCase()}</Text>
              {!isSearching ? (
                <SpeciesCard
                  image={image}
                  commonName={commonName || scientificName}
                  scientificName={scientificName}
                  toggleSpeciesModal={toggleSpeciesModal}
                  updateTaxon={updateTaxon}
                />
              ) : (
                <FlatList
                  data={suggestions}
                  keyExtractor={item => `${item.scientificName}`.toString()}
                  initialNumToRender={3}
                  renderItem={( { item } ) => (
                    <SpeciesCard
                      image={item.image}
                      commonName={item.commonName}
                      scientificName={item.scientificName}
                      id={item.id}
                      toggleSpeciesModal={toggleSpeciesModal}
                      updateTaxon={updateTaxon}
                    />
                  ) }
                />
              )}
            </View>
            <Padding />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default SelectSpecies;
