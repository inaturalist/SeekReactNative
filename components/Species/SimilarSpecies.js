import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../i18n";
import { fonts, colors } from "../../styles/global";
import styles from "../../styles/home/speciesNearby";
import { capitalizeNames, setSpeciesId } from "../../utility/helpers";
import LoadingWheel from "../LoadingWheel";

type Props = {
  id: ?Number,
  fetchiNatData: Function
}

class SimilarSpecies extends Component<Props> {
  constructor() {
    super();

    this.state = {
      similarSpecies: [],
      loading: true
    };
  }

  componentDidUpdate( prevProps ) {
    const { id } = this.props;

    if ( id !== prevProps.id ) {
      this.resetState();
      this.fetchSimilarSpecies();
    }
  }

  resetState() {
    this.setState( {
      similarSpecies: [],
      loading: true
    } );
  }

  fetchSimilarSpecies() {
    const { id } = this.props;

    const params = {
      taxon_id: id,
      without_taxon_id: 43584,
      locale: i18n.currentLocale()
    };

    inatjs.identifications.similar_species( params ).then( ( response ) => {
      const shortenedList = response.results.slice( 0, 20 );
      const taxa = shortenedList.map( r => r.taxon );
      const taxaWithPhotos = [];
      taxa.forEach( ( taxon ) => {
        if ( taxon.default_photo && taxon.default_photo.medium_url ) {
          taxaWithPhotos.push( taxon );
        }
      } );

      this.setState( {
        similarSpecies: taxaWithPhotos,
        loading: false
      } );
    } ).catch( ( err ) => {
      console.log( err, ": couldn't fetch similar species" );
    } );
  }

  render() {
    const { similarSpecies, loading } = this.state;
    const { fetchiNatData } = this.props;

    const species = (
      <FlatList
        contentContainerStyle={styles.similarSpeciesList}
        data={similarSpecies}
        keyExtractor={taxon => `species-${taxon.id}`}
        horizontal
        bounces
        alwaysBounceHorizontal
        initialNumToRender={3}
        ListEmptyComponent={() => (
          <LoadingWheel color="black" />
        )}
        renderItem={ ( { item } ) => (
          <View style={styles.gridCell}>
            <TouchableOpacity
              onPress={ () => {
                setSpeciesId( item.id );
                fetchiNatData( "similarSpecies" );
              }}
            >
              <Image
                style={styles.cellImage}
                source={{ uri: item.default_photo.medium_url }}
              />
              <View style={styles.cellTitle}>
                <Text numberOfLines={3} style={styles.cellTitleText}>
                  {capitalizeNames( item.preferred_common_name || item.name )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    );

    return (
      <View>
        <Text style={{
          marginTop: 45,
          marginLeft: 28,
          marginBottom: 11,
          fontSize: 19,
          fontFamily: fonts.semibold,
          color: colors.seekForestGreen,
          letterSpacing: 1.12
        }}
        >
          {i18n.t( "species_detail.similar" ).toLocaleUpperCase()}
        </Text>
        <View style={[
          styles.similarSpeciesContainer,
          loading && styles.loading
        ]}
        >
          {species}
        </View>
      </View>
    );
  }
}

export default SimilarSpecies;
