import RNLanguages from "react-native-languages";
import i18n from "i18n-js";

import en from "./translations/en.json";

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en };
i18n.currentLocale();

export default i18n;
