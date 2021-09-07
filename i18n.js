// @flow
import i18n from "i18n-js";

import af from "./translations/af.json";
import ar from "./translations/ar.json";
import ca from "./translations/ca.json";
import cs from "./translations/cs.json";
import da from "./translations/da.json";
import de from "./translations/de.json";
import el from "./translations/el.json";
import en from "./translations/en.json";
import es from "./translations/es.json";
import esMX from "./translations/es-MX.json";
import eu from "./translations/eu.json";
import fi from "./translations/fi.json";
import fr from "./translations/fr.json";
import he from "./translations/he.json";
import id from "./translations/id.json";
import it from "./translations/it.json";
import ja from "./translations/ja.json";
import nl from "./translations/nl.json";
import nb from "./translations/nb.json";
import pl from "./translations/pl.json";
import ptBR from "./translations/pt-BR.json";
import ro from "./translations/ro.json";
import ru from "./translations/ru.json";
import si from "./translations/si.json";
import sv from "./translations/sv.json";
import tr from "./translations/tr.json";
import zh from "./translations/zh-TW.json";

i18n.translations = {
  af,
  ar,
  ca,
  cs,
  da,
  de,
  el,
  en,
  es,
  "es-MX": esMX,
  eu,
  fi,
  fr,
  he,
  id,
  it,
  ja,
  nl,
  nb,
  pl,
  "pt-BR": ptBR,
  ro,
  ru,
  si,
  sv,
  tr,
  zh
};
i18n.fallbacks = true;

// https://github.com/inaturalist/inaturalist/blob/main/app/assets/javascripts/i18n/pluralizations.js
( function ( ) {
  // Takes a count that might be a localized string with delimiters and turns it
  // into a number we can use for determining the right plural form
  function normalizeCount( count, locale ) {
    var separator = i18n.t( "number.format.separator", { locale: locale } );
    var delimiter = i18n.t( "number.format.delimiter", { locale: locale } );
    var pieces = count.toString().split( separator );
    var parsableString = pieces.join( "." );
    if ( pieces.length === 2 ) {
      parsableString = pieces[0].replace( delimiter, "" ) + "." + pieces[1];
    } else {
      parsableString = pieces[0].replace( delimiter, "" );
    }
    return parseFloat( parsableString );
  }

  // Common pluralization rules
  function eastSlavic( count, locale ) {
    var n = normalizeCount( count, locale ) || 0;
    var mod10 = n % 10;
    var mod100 = n % 100;
    var isWhole = parseInt( n, 0 ) === n;
    if ( mod10 === 1 && mod100 !== 11 ) {
      return ["one"];
    }
    if (
      ( mod10 >= 2 && mod10 <= 4 && isWhole )
      && !( mod100 >= 12 && mod100 <= 14 && isWhole )
    ) {
      return ["few"];
    }
    if (
      mod10 === 0
      || ( mod10 >= 5 && mod10 <= 9 && isWhole )
      || ( mod100 >= 11 && mod100 <= 14 && isWhole )
    ) {
      return ["many"];
    }
    return ["other"];
  }

  function westSlavic( count, locale ) {
    var n = normalizeCount( count, locale ) || 0;
    var isWhole = parseInt( n, 0 ) === n;
    if ( n === 1 ) {return ["one"];}
    if ( n >= 2 && n <= 4 && isWhole ) {return ["few"];}
    return ["other"];
  }

  function oneUptoTwoOther( count, locale ) {
    var n = normalizeCount( count, locale ) || 0;
    var isWhole = parseInt( n, 0 ) === n;
    return n && n >= 0 && n < 2 && isWhole ? ["one"] : ["other"];
  }

  function other( ) {
    return ["other"];
  }

  // Override default to deal with English-style delimiters
  i18n.pluralization.default = function ( count ) {
    switch ( normalizeCount( count, i18n.locale || "en" ) ) {
      case 0: return ["zero", "other"];
      case 1: return ["one"];
      default: return ["other"];
    }
  };

  // Add pluralization rules for locales
  i18n.pluralization.ar = function ( count ) {
    var n = normalizeCount( count, "ar" ) || 0;
    var mod100 = n % 100;
    var isWhole = parseInt( n, 0 ) === n;
    if ( n === 0 ) {
      return ["zero"];
    }
    if ( n === 1 ) {
      return ["one"];
    }
    if ( isWhole && mod100 >= 3 && mod100 <= 10 ) {
      return ["few"];
    }
    if ( isWhole && mod100 >= 11 && mod100 <= 99 ) {
      return ["many"];
    }
    return ["other"];
  };
  i18n.pluralization.br = function ( count ) {
    var n = normalizeCount( count, "br" ) || 0;
    var mod10 = n % 10;
    var mod100 = n % 100;
    if ( mod10 === 1 && [11, 71, 91].indexOf( mod100 ) < 0 ) {
      return ["one"];
    }
    if ( mod10 === 2 && [12, 72, 92].indexOf( mod100 ) < 0 ) {
      return ["two"];
    }
    if ( n % 1000000 === 0 && n !== 0 ) {
      return ["many"];
    }
    return ["other"];
  };
  i18n.pluralization.cs = function ( count ) { return westSlavic( count, "cs" ); };
  i18n.pluralization.fr = function ( count ) { return oneUptoTwoOther( count, "fr" ); };
  i18n.pluralization.id = other;
  i18n.pluralization.ja = other;
  i18n.pluralization.ko = other;
  i18n.pluralization.lt = function ( count ) {
    var n = normalizeCount( count, "lt" ) || 0;
    var mod10 = n % 10;
    var mod100 = n % 100;
    var isWhole = parseInt( n, 0 ) === n;
    if (
      mod10 === 1
      && !( mod100 >= 11 && mod100 <= 19 )
      && isWhole
    ) {
      return ["one"];
    }
    if (
      mod10 >= 2
      && mod10 <= 9
      && !( mod100 >= 11 && mod100 <= 19 )
      && isWhole
    ) {
      return ["few"];
    }
    return ["other"];
  };
  i18n.pluralization.mk = function ( count ) {
    var n = normalizeCount( count, "mk" ) || 0;
    var isWhole = parseInt( n, 0 ) === n;
    if (
      n % 10 === 1
      && n !== 11
      && isWhole
    ) {
      return ["one"];
    }
    return ["other"];
  };
  i18n.pluralization.pl = function ( count ) {
    var n = normalizeCount( count, "pl" ) || 0;
    var mod10 = n % 10;
    var mod100 = n % 100;
    var isWhole = parseInt( n, 0 ) === n;
    if ( n === 1 ) {
      return ["one"];
    }
    if (
      ( mod10 >= 2 && mod10 <= 4 )
      && !( mod100 >= 12 && mod100 <= 14 )
      && isWhole
    ) {
      return ["few"];
    }
    if (
      [0, 1, 5, 6, 7, 8, 9].indexOf( mod10 ) >= 0
      || [12, 13, 14].indexOf( mod100 ) >= 0
    ) {
      return ["many"];
    }
    return ["other"];
  };
  i18n.pluralization.ro = function ( count ) {
    var n = normalizeCount( count, "ro" ) || 0;
    var mod100 = n % 100;
    var isWhole = parseInt( n, 0 ) === n;
    if ( n === 1 ) {
      return ["one"];
    }
    if (
      n === 0
      || ( mod100 >= 1 && mod100 <= 19 && isWhole )
    ) {
      return ["few"];
    }
    return ["other"];
  };
  i18n.pluralization.ru = function ( count ) { return eastSlavic( count, "ru" ); };
  i18n.pluralization.sk = function ( count ) { return westSlavic( count, "sk" ); };
  i18n.pluralization.uk = function ( count ) { return eastSlavic( count, "uk" ); };
  i18n.pluralization.zh = other;
  i18n.pluralization["zh-CN"] = other;
  i18n.pluralization["zh-HK"] = other;
  i18n.pluralization["zh-TW"] = other;
}( ) );

export default i18n;
