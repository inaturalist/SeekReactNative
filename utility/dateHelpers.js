import Realm from "realm";
import {
  subYears,
  isAfter,
  parseISO,
  format,
  getUnixTime,
  formatISO,
  fromUnixTime
} from "date-fns";
import {
  ca,
  da,
  de,
  es,
  fr,
  it,
  ja,
  no,
  nl,
  ru,
  tr,
  zh
} from "date-fns/locale";

import realmConfig from "../models/index";
import i18n from "../i18n";

const today = new Date();

const locales = {
  ca,
  da,
  de,
  es,
  fr,
  it,
  ja,
  no,
  nl,
  ru,
  tr,
  zh
};

const setLocale = () => {
  if ( locales[i18n.currentLocale()] ) {
    return locales[i18n.currentLocale()];
  }
  return null;
};

const requiresParent = ( birthday ) => {
  const thirteen = subYears( today, 13 );
  const formattedBirthday = parseISO( birthday );

  return isAfter( formattedBirthday, thirteen );
};

const checkIfChallengeAvailable = ( date ) => date <= today;

const isWithinPastYear = ( reviewShownDate ) => {
  const lastYear = subYears( today, 1 );

  return isAfter( reviewShownDate, lastYear );
};

const formatShortMonthDayYear = ( date ) => format( date, "PP", { locale: setLocale() } );

const fetchSpeciesSeenDate = ( taxaId ) => (
  new Promise( ( resolve ) => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const seenTaxaIds = realm.objects( "TaxonRealm" ).map( ( t ) => t.id );
        if ( seenTaxaIds.includes( taxaId ) ) {
          const seenTaxa = realm.objects( "ObservationRealm" ).filtered( `taxon.id == ${taxaId}` );
          const seenDate = formatShortMonthDayYear( seenTaxa[0].date );
          resolve( seenDate );
        } else {
          resolve( null );
        }
      } ).catch( () => {
        resolve( null );
      } );
  } )
);

const createTimestamp = ( time ) => {
  if ( time ) {
    return getUnixTime( time );
  }
  return getUnixTime( today );
};

const namePhotoByTime = () => format( today, "ddMMyy_HHmmSSS" );

const setISOTime = ( time ) => formatISO( fromUnixTime( time ) );

const formatYearMonthDay = ( date ) => {
  if ( date ) {
    return format( date, "yyyy-MM-dd" );
  }
  return format( today, "yyyy-MM-dd" );
};

const createShortMonthsList = () => {
  const months = [];

  for ( let i = 0; i <= 11; i += 1 ) {
    const month = format( new Date( 2020, i, 1 ), "MMMMM", { locale: setLocale() } );

    months.push( month );
  }

  return months;
};

export {
  checkIfChallengeAvailable,
  requiresParent,
  isWithinPastYear,
  fetchSpeciesSeenDate,
  createTimestamp,
  namePhotoByTime,
  setISOTime,
  formatYearMonthDay,
  formatShortMonthDayYear,
  createShortMonthsList
};
