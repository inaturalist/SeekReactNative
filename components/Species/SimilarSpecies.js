import React, { Component } from "react";
import { View } from "react-native";
import inatjs from "inaturalistjs";

import i18n from "../../i18n";
import styles from "../../styles/species/similarSpecies";
import SpeciesNearbyList from "../UIComponents/SpeciesNearbyList";
import GreenText from "../UIComponents/GreenText";
import createUserAgent from "../../utility/userAgent";

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

  componentDidUpdate( prevProps: Object ) {
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

    const options = { user_agent: createUserAgent() };

    inatjs.identifications.similar_species( params, options ).then( ( { results } ) => {
      const similarSpecies = results.map( r => r.taxon );

      this.setState( {
        similarSpecies,
        loading: false
      } );
    } ).catch( ( error ) => console.log( error, "error fetching similar species" ) );
  }

  render() {
    const { similarSpecies, loading } = this.state;
    const { fetchiNatData } = this.props;
    const { length } = similarSpecies;

    const species = (
      <SpeciesNearbyList fetchiNatData={() => fetchiNatData( "similarSpecies" )} taxa={similarSpecies} />
    );

    return (
      <>
        <View>
          {length > 0 && (
            <View style={styles.similarSpeciesMargins}>
              <GreenText text="species_detail.similar" />
            </View>
          )}
          {length > 0 && (
            <View style={[
              styles.similarSpeciesContainer,
              loading && styles.loading
            ]}
            >
              {species}
            </View>
          )}
        </View>
        <View style={[styles.bottomPadding, length === 0 && styles.empty]} />
      </>
    );
  }
}

export default SimilarSpecies;
