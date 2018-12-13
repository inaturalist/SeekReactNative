// @flow
import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Animated
} from "react-native";
import Realm from "realm";

import styles from "../styles/banner";
import speciesImages from "../assets/species";
import realmConfig from "../models/index";

type Props = {
  bannerText: string,
  taxaName: string,
  id: number,
  main: boolean
}

class Banner extends Component {
  constructor( {
    bannerText,
    taxaName,
    id,
    main
  }: Props ) {
    super();

    this.state = {
      bannerText,
      taxaName,
      id,
      iconicTaxonId: 0,
      main
    };

    this.animatedValue = new Animated.Value( -120 );
  }

  componentDidMount() {
    this.showToast();
  }

  fetchTaxonId() {
    const { taxaName, id } = this.state;

    if ( taxaName ) {
      Realm.open( realmConfig )
        .then( ( realm ) => {
          const observations = realm.objects( "ObservationRealm" );
          const seenTaxa = observations.filtered( `taxon.id == ${id}` );
          console.log( seenTaxa, "seen taxa" );
          const { iconicTaxonId } = seenTaxa[0].taxon;
          console.log( iconicTaxonId, "in fetch banner" );
          this.setState( {
            iconicTaxonId
          } );
        } ).catch( ( err ) => {
          console.log( "[DEBUG] Failed to fetch taxon id, error: ", err );
        } );
    }
  }

  showToast() {
    this.fetchTaxonId();

    Animated.timing(
      this.animatedValue,
      {
        toValue: 0,
        duration: 750
      }
    ).start( this.hideToast() );
  }

  hideToast() {
    setTimeout( () => {
      Animated.timing(
        this.animatedValue,
        {
          toValue: -120,
          duration: 350
        }
      ).start();
    }, 2000 );
  }

  render() {
    const { bannerText, iconicTaxonId, main } = this.state;

    let banner;

    if ( main ) {
      banner = (
        <Animated.View style={[
          styles.animatedStyle,
          {
            transform: [{ translateY: this.animatedValue }]
          }
        ]}
        >
          <View style={[styles.row, styles.animatedRow]}>
            <Image
              source={speciesImages[iconicTaxonId.toString()]}
              style={styles.mainBannerImage}
            />
            <Text style={[styles.text, styles.mainText]}>{bannerText}</Text>
          </View>
        </Animated.View>
      );
    } else {
      banner = (
        <View style={styles.banner}>
          <View style={styles.row}>
            <Image
              source={require( "../assets/results/icn-results-match.png" )}
              style={styles.speciesBannerImage}
            />
            <Text style={styles.text}>{bannerText}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {banner}
      </View>
    );
  }
}

export default Banner;
