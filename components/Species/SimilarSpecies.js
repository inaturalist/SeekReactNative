import React, { Component } from "react";
import { View } from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../i18n";
import styles from "../../styles/species/similarSpecies";
import SpeciesNearbyList from "../UIComponents/SpeciesNearbyList";
import GreenText from "../UIComponents/GreenText";

type Props = {
  +id: ?Number,
  +fetchiNatData: Function
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
      per_page: 20,
      taxon_id: id,
      without_taxon_id: 43584,
      locale: i18n.currentLocale()
    };

    inatjs.identifications.similar_species( params ).then( ( { results } ) => {
      const taxa = results.map( r => r.taxon );
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
      <SpeciesNearbyList fetchiNatData={() => fetchiNatData( "similarSpecies" )} taxa={similarSpecies} />
    );

    return (
      <View>
        <View style={styles.similarSpeciesMargins}>
          <GreenText text={i18n.t( "species_detail.similar" ).toLocaleUpperCase()} />
        </View>
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
