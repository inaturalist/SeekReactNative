// @flow
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";

import af from "./translations/af.json";
import ca from "./translations/ca.json";
import cs from "./translations/cs.json";
import da from "./translations/da.json";
import de from "./translations/de.json";
import en from "./translations/en.json";
import es from "./translations/es.json";
import fi from "./translations/fi.json";
import fr from "./translations/fr.json";
import he from "./translations/he.json";
import it from "./translations/it.json";
import ja from "./translations/ja.json";
import nl from "./translations/nl.json";
import nb from "./translations/nb.json";
import ru from "./translations/ru.json";
import sv from "./translations/sv.json";
import tr from "./translations/tr.json";
import zh from "./translations/zh.json";

i18n.translations = {
  af,
  ca,
  cs,
  da,
  de,
  en,
  es,
  fi,
  fr,
  he,
  it,
  ja,
  nl,
  nb,
  ru,
  sv,
  tr,
  zh
};
i18n.fallbacks = true;

const fallback = { languageTag: "en", isRTL: false };
const languages = Object.keys( i18n.translations );
const { languageTag } = RNLocalize.findBestAvailableLanguage( languages ) || fallback;

i18n.locale = languageTag;

// these pluralization rules are from the iNaturalist web app
const eastSlavic = ( count ) => {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if ( mod10 === 1 && mod100 !== 11 ) {
    return ["one"];
  }
  if (
    ( mod10 >= 2 && mod10 <= 4 )
    && !( mod100 >= 12 && mod100 <= 14 )
  ) {
    return ["few"];
  }
  if (
    mod10 === 0
    || ( mod10 >= 5 && mod10 <= 9 )
    || ( mod100 >= 11 && mod100 <= 14 )
  ) {
    return ["many"];
  }
  return ["other"];
};

const oneUptoTwoOther = ( count ) => {
  return count && count >= 0 && count < 2 ? ["one"] : ["other"];
};

const other = () => ["other"];

i18n.pluralization.fr = function ( count ) { return oneUptoTwoOther( count ); };
i18n.pluralization.ja = other;
i18n.pluralization.ru = function ( count ) { return eastSlavic( count ); };
i18n.pluralization["zh-TW"] = other;

export default i18n;
