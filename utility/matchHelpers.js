// @flow

import i18n from "../i18n";
import { colors } from "../styles/global";

const renderHeaderText = ( screenType: string, rank: number ): string => {
  let headerText;

  if ( screenType === "resighted" ) {
    headerText = "results.resighted";
  } else if ( screenType === "newSpecies" ) {
    headerText = "results.observed_species";
  } else if ( screenType === "commonAncestor" ) {
    if ( rank === 20 ) {
      headerText = "results.genus";
    } else if ( rank <= 30 ) {
      headerText = "results.family";
    } else if ( rank <= 40 ) {
      headerText = "results.order";
    } else if ( rank <= 50 ) {
      headerText = "results.class";
    } else {
      headerText = "results.believe";
    }
  } else {
    headerText = "results.no_identification";
  }
  return i18n.t( headerText ).toLocaleUpperCase();
};

const renderText = ( screenType: string, seenDate: ?string, image: { latitude: number } ): string => {
  let text: string;

  if ( screenType === "resighted" ) {
    text = i18n.t( "results.date_observed", { seenDate } );
  } else if ( screenType === "newSpecies" ) {
    text = ( image.latitude ) ? i18n.t( "results.learn_more" ) : i18n.t( "results.learn_more_no_location" );
  } else if ( screenType === "commonAncestor" ) {
    text = i18n.t( "results.common_ancestor" );
  } else {
    text = i18n.t( "results.sorry" );
  }

  return text;
};

const setGradients = ( screenType: string ): { gradientDark: string, gradientLight: string } => {
  let gradientDark;
  let gradientLight;

  if ( screenType === "resighted" || screenType === "newSpecies" ) {
    gradientDark = colors.greenGradientDark;
    gradientLight = colors.seekForestGreen;
  } else if ( screenType === "commonAncestor" ) {
    gradientDark = colors.tealGradientDark;
    gradientLight = colors.seekTeal;
  } else {
    gradientDark = colors.grayGradientDark;
    gradientLight = colors.grayGradientLight;
  }

  return { gradientDark, gradientLight };
};

const setScreenType = ( taxon: { taxaId: number, rank: number }, seenDate: ?string ): string => {
  if ( !taxon ) { return "unidentified"; }

  const { taxaId, rank } = taxon;

  if ( seenDate ) {
    return "resighted";
  } else if ( taxaId && !rank ) {
    return "newSpecies";
  } else if ( rank ) {
    return "commonAncestor";
  } else {
    return "unidentified";
  }
};

export {
  renderHeaderText,
  renderText,
  setGradients,
  setScreenType
};
