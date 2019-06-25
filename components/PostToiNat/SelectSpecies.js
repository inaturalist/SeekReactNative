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
  FlatList
} from "react-native";
import { NavigationEvents } from "react-navigation";
import inatjs from "inaturalistjs";

import styles from "../../styles/posting/selectSpecies";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import postingIcons from "../../assets/posting";
import Padding from "../Padding";

type Props = {
  toggleSpeciesModal: Function
}


class SelectSpecies extends Component<Props> {
  constructor() {
    super();

    this.state = {
      speciesName: "",
      suggestions: []
    };
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  updateSpeciesName( speciesName ) {
    this.setState( { speciesName } );
  }

  searchForSpecies( speciesName ) {
    const params = {
      q: speciesName,
      per_page: 5,
      is_active: true,
      locale: i18n.currentLocale()
    };

    inatjs.taxa.autocomplete( params ).then( ( { results } ) => {
      console.log( results, "response" );
      this.setState( { suggestions: results } );
    } ).catch( ( err ) => {
      console.log( err, "catch error" );
    } );
  }

  render() {
    const { speciesName, suggestions } = this.state;
    const { toggleSpeciesModal } = this.props;

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
              <Text>{speciesName}</Text>
            </View>
            <View style={styles.row}>
              <Image source={postingIcons.search} />
              <TextInput
                style={styles.inputField}
                placeholder={i18n.t( "posting.what_seen" )}
                onChangeText={text => this.searchForSpecies( text )}
              />
              {/* <FlatList
                data={suggestions}
                keyExtractor={item => `${item.name}-${item.id}`.toString()}
                initialNumToRender={3}
                renderItem={( { item } ) => (
                  <TouchableOpacity
                    onPress={() => console.log( "clicked" )}
                  >
                    <Image style={styles.image} source={item.photo} />
                    <View style={styles.speciesNameContainer}>
                      <Text style={styles.commonNameText}>
                        {item.preferred_common_name
                          ? item.preferred_common_name
                          : item.name}
                      </Text>
                      <Text style={styles.scientificNameText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                ) }
              /> */}
            </View>
            <Padding />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default SelectSpecies;
