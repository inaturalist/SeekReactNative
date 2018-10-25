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
import styles from "../../styles/species";

type Props = {
  navigation: any
}

class SpeciesDetail extends Component {
  constructor( { navigation }: Props ) {
    super();

    const { id, taxaType } = navigation.state.params;

    this.state = {
      id,
      photos: [],
      commonName: null,
      scientificName: null,
      about: null,
      timesSeen: null,
      taxaType: `Category: ${taxaType}`
    };
  }

  componentDidMount() {
    this.fetchTaxonDetails();
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
        timesSeen: `${taxa.observations_count} times worldwide`
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

  render() {
    const {
      photos,
      commonName,
      scientificName,
      about,
      timesSeen,
      taxaType
    } = this.state;

    const {
      navigation
    } = this.props;

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
            <Text style={styles.largeHeaderText}>{commonName}</Text>
            <Text style={styles.headerText}>Scientific Name:</Text>
            <Text style={styles.text}>{scientificName}</Text>
            <Text>{taxaType}</Text>
            <Text>Map of places seen</Text>
            <Text>Chart: best time to find it</Text>
            <Text style={styles.headerText}>About</Text>
            <Text style={styles.text}>
              {about}
            </Text>
            <Text style={styles.headerText}>Seen using iNaturalist</Text>
            <Text style={styles.text}>
              {timesSeen}
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Found it!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SpeciesDetail;
