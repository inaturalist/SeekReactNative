import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";

import en from "./translations/en.json";
import fr from "./translations/fr.json";
import da from "./translations/da.json";
import de from "./translations/de.json";
import es from "./translations/es.json";
import it from "./translations/it.json";
import ja from "./translations/ja.json";
import nl from "./translations/nl.json";
import zh from "./translations/zh.json";
import ru from "./translations/ru.json";
import tr from "./translations/tr.json";

i18n.translations = {
  en,
  fr,
  da,
  de,
  es,
  it,
  ja,
  nl,
  zh,
  ru,
  tr
};
i18n.fallbacks = true;

const fallback = { languageTag: "en", isRTL: false };
const languages = Object.keys( i18n.translations );
const { languageTag } = RNLocalize.findBestAvailableLanguage( languages ) || fallback;

i18n.locale = languageTag;

export default i18n;
