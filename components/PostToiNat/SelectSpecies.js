// @flow

import React, { useState, useRef, useCallback } from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  SectionList,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Node } from "react";

import { colors } from "../../styles/global";
import { viewStyles, textStyles, imageStyles } from "../../styles/posting/selectSpecies";
import i18n from "../../i18n";
import posting from "../../assets/posting";
import SpeciesCard from "../UIComponents/SpeciesCard";
import GreenText from "../UIComponents/GreenText";
import icons from "../../assets/icons";
import Padding from "../UIComponents/Padding";
import useSearchSpecies from "./hooks/postingHooks";
import { iconicTaxaNames, iconicScientificNames } from "../../utility/dictionaries/iconicTaxonDictSelectSpecies";
import { capitalizeNames } from "../../utility/helpers";

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
  const userPhoto = { uri: image };

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

  const list = [{
    header: "posting.id",
    data: suggestions.length === 0 ? seekSuggestion : suggestions
  }, {
    header: "posting.major_taxa",
    data: majorTaxa
  }];

  const handleTextChange = useCallback( text => setTextInput( text ), [] );

  const renderItem = ( { item } ) => {
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

  const renderSectionHeader = ( { section } ) => {
    if ( section.header === "posting.id" && suggestions.length > 0 ) {
      return <View style={viewStyles.suggestionsTopMargin} />;
    }
    return (
      <View style={viewStyles.headerMargins}>
        <GreenText text={section.header} />
      </View>
    );
  };

  const extractKey = ( item, index ) => item + index;

  const renderPadding = ( ) => <Padding />;
  const dismissKeyboard = ( ) => Keyboard.dismiss( );

  return (
    <SafeAreaView style={viewStyles.container} edges={["top"]}>
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
        <Text style={textStyles.topHeader}>
          {i18n.t( "posting.what_seen" ).toLocaleUpperCase()}
        </Text>
      </View>
      <View style={viewStyles.photoContainer}>
        <Image source={userPhoto} style={imageStyles.image} />
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
      <SectionList
        ref={sectionList}
        contentContainerStyle={viewStyles.whiteContainer}
        sections={list}
        initialNumToRender={5}
        stickySectionHeadersEnabled={false}
        keyExtractor={extractKey}
        ListFooterComponent={renderPadding}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        keyboardDismissMode="on-drag"
        onScroll={dismissKeyboard}
      />
    </SafeAreaView>
  );
};

export default SelectSpecies;
