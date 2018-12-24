import React, { Component } from "react";

import {
  ScrollView,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import styles from "../../styles/taxonPicker";
import speciesImages from "../../assets/species";
import { capitalizeNames } from "../../utility/helpers";

type Props = {
  navigation: any,
}

class TaxonPickerScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const { taxaType, latitude, longitude } = navigation.state.params;

    this.state = {
      taxaType,
      latitude,
      longitude
    };
  }

  setTaxonId( taxaType ) {
    const { latitude, longitude } = this.state;
    const { navigation } = this.props;

    this.setState( {
      taxaType
    } );

    navigation.push( "Main", {
      taxaName: null,
      id: null,
      taxaType,
      latitude,
      longitude
    } );
  }

  render() {
    const { taxaType } = this.state;

    const taxaImages = [];
    const taxaList = ["all", "plants", "amphibians", "fungi", "fish", "reptiles", "arachnids", "birds", "insects", "mollusks", "mammals"];

    taxaList.forEach( ( taxa ) => {
      const image = (
        <View key={`image-${taxa}`}>
          <TouchableOpacity
            style={[styles.imageCell, taxaType === taxa && styles.highlightedImageCell]}
            underlayColor="transparent"
            onPress={() => this.setTaxonId( taxa )}
          >
            <Image
              style={[styles.image, taxaType === taxa && styles.highlightedImage]}
              source={speciesImages[taxa]}
            />
            <Text
              style={[styles.text, taxaType === taxa && styles.highlightedText]}
            >
              {capitalizeNames( taxa )}
            </Text>
          </TouchableOpacity>
        </View>
      );
      taxaImages.push( image );
    } );

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require( "../../assets/backgrounds/background.png" )}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Show me...</Text>
          </View>
          <View style={styles.gridContainer}>
            <ScrollView
              contentContainerStyle={styles.row}
              scrollEnabled={false}
            >
              {taxaImages}
              <TouchableOpacity
                style={[styles.imageCell, { backgroundColor: "transparent" }]}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default TaxonPickerScreen;
