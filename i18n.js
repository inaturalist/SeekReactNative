import RNLanguages from "react-native-languages";
import i18n from "i18n-js";

import en from "./translations/en.json";
import de from "./translations/de.json";
import es from "./translations/es.json";
import hi from "./translations/hi.json";
import zh from "./translations/zh.json";
import pt from "./translations/pt.json";
import ptBR from "./translations/pt-BR.json";

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = {
  en,
  de,
  es,
  hi,
  zh,
  pt,
  ptBR
};
i18n.currentLocale();

export default i18n;
