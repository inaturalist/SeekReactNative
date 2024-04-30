import { ImageSourcePropType } from "react-native";

type Posting = {
  [key: string]: ImageSourcePropType;
};

const posting: Posting = {
  captive: require( "./posting/icon-captive.webp" ),
  crosshair: require( "./posting/icon-crosshair.webp" ),
  date: require( "./posting/icon-date.webp" ),
  geoprivacy: require( "./posting/icon-geoprivacy.webp" ),
  bird: require( "./logos/iNatStatsSpeciesDetail-Bird.webp" ),
  location: require( "./posting/icon-location.webp" ),
  searchGreen: require( "./posting/icon-search-green.webp" ),
  postingHelp: require( "./posting/icon-help.webp" ),
  postingSuccess: require( "./posting/img-PostingtoiNat-success.webp" ),
  postingNoInternet: require( "./posting/img-PostingtoiNat-NoInternet.webp" ),
  internet: require( "./posting/icon-internet-green.webp" ),
  edit: require( "./posting/icon-edit.webp" )
};

export default posting;
