import { render, screen } from "@testing-library/react-native";
import React from "react";

import CameraHelpScreen from "../../../../components/Camera/CameraHelpScreen";
import i18n from "../../../../i18n";

const englishRanks = ["KINGDOM", "PHYLUM", "CLASS", "ORDER", "FAMILY", "GENUS", "SPECIES"];
const russianRanks = ["ЦАРСТВО", "ТИП", "КЛАСС", "ОТРЯД", "СЕМЕЙСТВО", "РОД", "ВИД"];
// Longest labels in the app. They have to stay whole, not clipped to a shorter word.
const greekRanks = ["ΒΑΣΊΛΕΙΟ", "ΣΥΝΟΜΟΤΑΞΊΑ", "ΟΜΟΤΑΞΊΑ", "ΤΆΞΗ", "ΟΙΚΟΓΈΝΕΙΑ", "ΓΈΝΟΣ", "ΕΊΔΟΣ"];

const renderHelp = ( ) => {
  render( <CameraHelpScreen /> );
};

describe( "CameraHelpScreen", ( ) => {
  const previousLocale = i18n.locale;

  afterEach( ( ) => {
    i18n.locale = previousLocale;
  } );

  test( "shows the seven taxonomic ranks in English", ( ) => {
    i18n.locale = "en";
    renderHelp( );
    englishRanks.forEach( ( rank ) => {
      expect( screen.getByText( rank ) ).toBeOnTheScreen( );
    } );
  } );

  test( "shows the taxonomic ranks in the current language", ( ) => {
    i18n.locale = "ru";
    renderHelp( );
    russianRanks.forEach( ( rank ) => {
      expect( screen.getByText( rank ) ).toBeOnTheScreen( );
    } );
    expect( screen.queryByText( "KINGDOM" ) ).toBeNull( );
  } );

  test( "shows a long rank name in full", ( ) => {
    i18n.locale = "el";
    renderHelp( );
    greekRanks.forEach( ( rank ) => {
      expect( screen.getByText( rank ) ).toBeOnTheScreen( );
    } );
  } );
} );
