import { ImageSourcePropType } from "react-native";

type Notifications = {
  [key: string]: ImageSourcePropType;
};

const notifications: Notifications = {
  bird: require( "./logos/iNatStatsSpeciesDetail-Bird.webp" ),
  badge_empty: require( "./badges/Badge_Empty.webp" ),
  // switched this since OPBlack is no longer needed in Seek
  op: require( "./logos/logo-OPwhite.webp" )
};

export default notifications;
