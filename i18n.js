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

export default i18n;
