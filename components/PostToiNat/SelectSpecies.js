// @flow

import React, { useState, useRef, useCallback } from "react";
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import { colors } from "../../styles/global";
import { viewStyles, textStyles, imageStyles } from "../../styles/posting/selectSpecies";
import i18n from "../../i18n";
import posting from "../../assets/posting";
import SpeciesCard from "../UIComponents/SpeciesCard";
import GreenText from "../UIComponents/GreenText";
import icons from "../../assets/icons";
import Padding from "../UIComponents/Padding";
import { useSearchSpecies } from "./hooks/postingHooks";
import { iconicTaxaNames, iconicScientificNames } from "../../utility/dictionaries/iconicTaxonDictSelectSpecies";
import { capitalizeNames } from "../../utility/helpers";
import StyledText from "../UIComponents/StyledText";

type Props = {
  toggleSpeciesModal: Function,
  image: string,
  updateTaxon: Function,
  seekId: Object
}

const SelectSpecies = ( {
  toggleSpeciesModal,
  image,
  updateTaxon,
  seekId
}: Props ): Node => {
  const sectionList = useRef( null );

  const seekSuggestion = [{
    image,
    commonName: seekId.preferredCommonName,
    scientificName: seekId.name,
    id: seekId.taxaId,
    iconicTaxonId: null
  }];
  const [textInput, setTextInput] = useState( null );

  // the order is important here: showing most frequently observed first
  const majorTaxaIds = [47126, 1, 47170, 3, 47158, 47119, 40151, 20978, 26036, 47178, 47115, 47686, 48222];

  const majorTaxa = majorTaxaIds.map( taxonId => {
    return {
      commonName: capitalizeNames( i18n.t( iconicTaxaNames[taxonId] ) ),
      scientificName: iconicScientificNames[taxonId],
      id: taxonId,
      iconicTaxonId: taxonId
    };
  } );

  const suggestions = useSearchSpecies( textInput );

  let data = [];
  if ( suggestions.length === 0 ) {
    data = [
      { header: "posting.id", type: "header" },
      ...seekSuggestion
    ];
  } else {
    data = [
      { header: "posting.id", type: "headerNoText" },
      ...suggestions
    ];
  }
  data = data.concat( [
      { header: "posting.major_taxa", type: "header" },
      ...majorTaxa
  ] );

  const handleTextChange = useCallback( text => setTextInput( text ), [] );

  const renderItem = ( item ) => {
    const handlePress = ( ) => {
      updateTaxon( item.id, item.commonName, item.scientificName );
      toggleSpeciesModal( );
    };

    const taxon = {
      preferredCommonName: item.commonName,
      name: item.scientificName,
      iconicTaxonId: item.iconicTaxonId
    };

    const photo = item.image && { uri: item.image }; // account for null case

    return (
      <View key={`${item.scientificName}${item.id}`} style={viewStyles.card}>
        <SpeciesCard
          taxon={taxon}
          handlePress={handlePress}
          photo={photo}
        />
      </View>
    );
  };

  const extractKey = ( item, index ) => item + index;

  const renderPadding = ( ) => <Padding />;
  const dismissKeyboard = ( ) => Keyboard.dismiss( );

  return (
    <SafeAreaProvider>
      <SafeAreaView
        testID="select-species-container"
        style={viewStyles.container}
        edges={["top"]}
      >
        <StatusBar barStyle="light-content" />
        <View style={viewStyles.header}>
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.back" )}
            accessible
            onPress={toggleSpeciesModal}
            style={viewStyles.backButton}
          >
            <Image source={icons.backButton} />
          </TouchableOpacity>
          <StyledText style={textStyles.topHeader}>
            {i18n.t( "posting.what_seen" ).toLocaleUpperCase()}
          </StyledText>
        </View>
        <View style={viewStyles.photoContainer}>
          {image && <Image source={{ uri: image }} style={imageStyles.image} />}
        </View>
        <View style={viewStyles.row}>
          {/* $FlowFixMe */}
          <Image
            source={posting.searchGreen}
            tintColor={colors.white}
            style={imageStyles.search}
          />
          <TextInput
            onChangeText={handleTextChange}
            placeholder={i18n.t( "posting.look_up" )}
            placeholderTextColor={colors.placeholderGray}
            style={textStyles.inputField}
            defaultValue={textInput}
          />
        </View>
        <FlashList
          ref={sectionList}
          estimatedItemSize={100}
          contentContainerStyle={viewStyles.whiteContainer}
          data={data}
          initialNumToRender={5}
          stickySectionHeadersEnabled={false}
          keyExtractor={extractKey}
          ListFooterComponent={renderPadding}
          renderItem={( { item } ) => {
            if ( item.type === "header" ) {
              return (
                <View style={viewStyles.headerMargins}>
                  <GreenText text={item.header} />
                </View>
              );
            }
            if ( item.type === "headerNoText" ) {
              return <View style={viewStyles.suggestionsTopMargin} />;
            }
            return renderItem( item );
          }}
          getItemType={( item ) => {
            if ( item.hasOwnProperty( "type" ) ) {
              return item.type;
            }
            return "suggestion";
          }}
          keyboardDismissMode="on-drag"
          onScroll={dismissKeyboard}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SelectSpecies;
