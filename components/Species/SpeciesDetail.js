// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import inatjs from "inaturalistjs";

import NavBar from "../NavBar";
import SpeciesChart from "./SpeciesChart";
import SpeciesMap from "./SpeciesMap";
import styles from "../../styles/species";

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

type Props = {
  navigation: any
}

class SpeciesDetail extends Component {
  constructor( { navigation }: Props ) {
    super();

    const { id, latitude, longitude } = navigation.state.params;

    this.state = {
      id,
      photos: [],
      commonName: null,
      scientificName: null,
      about: null,
      timesSeen: null,
      taxaType: null,
      urlTemplate: "",
      region: {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
      },
      observationsByMonth: []
    };
  }

  componentDidMount() {
    this.fetchTaxonDetails();
    this.fetchHistogram();
  }

  fetchTaxonDetails() {
    const {
      id
    } = this.state;

    inatjs.taxa.fetch( id ).then( ( response ) => {
      const taxa = response.results[0];
      this.setState( {
        photos: taxa.taxon_photos,
        commonName: this.capitalizeNames( taxa.preferred_common_name ),
        scientificName: taxa.name,
        about: `${taxa.wikipedia_summary.replace( /<[^>]+>/g, "" )} (reference: Wikipedia)`,
        timesSeen: `${taxa.observations_count} times worldwide`,
        taxaType: taxa.iconic_taxon_name
      } );
      console.log( taxa, "taxa details" );
    } ).catch( ( err ) => {
      console.log( err, "error fetching taxon details" );
    } );
  }

  capitalizeNames( name: string ) {
    const titleCaseName = name.split( " " )
      .map( string => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
      .join( " " );
    return titleCaseName;
  }

  fetchHistogram() {
    const { id, observationsByMonth } = this.state;

    const params = {
      date_field: "observed",
      interval: "month_of_year",
      taxon_id: id
    };

    inatjs.observations.histogram( params ).then( ( response ) => {
      const months = response.results.month_of_year;

      for ( let i = 1; i <= 12; i += 1 ) {
        observationsByMonth.push( months[i] );
      }
      this.setState( {
        observationsByMonth
      } );
    } ).catch( ( err ) => {
      console.log( err, "error fetching histogram" );
    } );
  }

  render() {
    const {
      photos,
      commonName,
      scientificName,
      about,
      id,
      observationsByMonth,
      region,
      timesSeen,
      taxaType
    } = this.state;

    const {
      navigation
    } = this.props;

    let taxaPhoto;
    let category;

    if ( taxaType === "Plantae" ) {
      category = "Plants";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-plants.png" )}
        /> );
    } else if ( taxaType === "Amphibia" ) {
      category = "Amphibians";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-amphibians.png" )}
        /> );
    } else if ( taxaType === "Fungi" ) {
      category = "Fungi";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-fungi.png" )}
        /> );
    } else if ( taxaType === "Actinopterygii" ) {
      category = "Fish";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-fish.png" )}
        /> );
    } else if ( taxaType === "Reptilia" ) {
      category = "Reptiles";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-reptiles.png" )}
        /> );
    } else if ( taxaType === "Arachnida" ) {
      category = "Arachnids";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-arachnids.png" )}
        /> );
    } else if ( taxaType === "Aves" ) {
      category = "Birds";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-birds.png" )}
        /> );
    } else if ( taxaType === "Insecta" ) {
      category = "Insects";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-insects.png" )}
        /> );
    } else if ( taxaType === "Mollusca" ) {
      category = "Mollusks";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-mollusks.png" )}
        /> );
    } else if ( taxaType === "Mammalia" ) {
      category = "Mammals";
      taxaPhoto = (
        <Image
          style={styles.greenImage}
          source={require( "../../assets/taxa/icn-iconic-taxa-mammals.png" )}
        /> );
    }

    const photoList = [];

    photos.forEach( ( photo, i ) => {
      if ( i <= 7 ) {
        const image = (
          <Image
            key={`image${photo.taxon_id}${i}`}
            source={{ uri: photo.photo.original_url }}
            style={styles.image}
          />
        );
        photoList.push( image );
      }
    } );

    return (
      <View style={styles.container}>
        <NavBar navigation={navigation} />
        <View style={styles.infoContainer}>
          <ScrollView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator
              scrollEventThrottle
              pagingEnabled
              nestedScrollEnabled
              indicatorStyle="white"
            >
              {photoList}
            </ScrollView>
            <View style={styles.headerContainer}>
              <Text style={styles.largeHeaderText}>{commonName}</Text>
              <Text style={styles.headerText}>Scientific Name:</Text>
              <Text style={[styles.text, { fontStyle: "italic" }]}>{scientificName}</Text>
              <View style={[styles.categoryRow, styles.categoryContainer]}>
                <Text style={styles.greenText}>Category: {category}</Text>
                {taxaPhoto}
              </View>
            </View>
            <Text style={styles.headerText}>Where are people seeing it nearby?</Text>
            <SpeciesMap
              region={region}
              id={id}
            />
            <Text style={styles.headerText}>When is the best time to find it</Text>
            <SpeciesChart data={observationsByMonth} />
            <Text style={styles.headerText}>About</Text>
            <Text style={styles.text}>
              {about}
            </Text>
            <Text style={styles.headerText}>Seen using iNaturalist</Text>
            <View style={styles.logoRow}>
              <Image
                source={require( "../../assets/logos/logo-inaturalist-bird.png" )}
                style={styles.smallImage}
              />
              <Text style={styles.text}>
                {timesSeen}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Found it!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SpeciesDetail;
