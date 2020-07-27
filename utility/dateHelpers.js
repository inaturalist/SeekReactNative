import Realm from "realm";
import {
  subYears,
  isAfter,
  parseISO,
  format,
  getUnixTime,
  formatISO,
  fromUnixTime,
  subDays,
  differenceInHours,
  isSameMonth
} from "date-fns";
import {
  af,
  ar,
  ca,
  cs,
  da,
  de,
  es,
  fi,
  fr,
  he,
  it,
  ja,
  nb,
  nl,
  ro,
  ru,
  sv,
  tr,
  zh
} from "date-fns/locale";

import realmConfig from "../models/index";
import i18n from "../i18n";

const locales = {
  af,
  ar,
  ca,
  cs,
  da,
  de,
  es,
  fi,
  fr,
  he,
  it,
  ja,
  nb,
  nl,
  ro,
  ru,
  sv,
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
  const thirteen = subYears( new Date(), 13 );
  const formattedBirthday = parseISO( birthday );

  return isAfter( formattedBirthday, thirteen );
};

const checkIfChallengeAvailable = ( date ) => date <= new Date();

const isWithinPastYear = ( reviewShownDate ) => {
  const lastYear = subYears( new Date(), 1 );

  return isAfter( reviewShownDate, lastYear );
};

const isWithinCurrentMonth = ( date ) => isSameMonth( date, new Date() );

const isWithin7Days = ( date ) => {
  const sevenDaysAgo = subDays( new Date(), 7 );

  return isAfter( date, sevenDaysAgo );
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

const createTimestamp = () => getUnixTime( new Date() );

const serverBackOnlineTime = ( gmtTime ) => differenceInHours( new Date( gmtTime ), new Date() );

const namePhotoByTime = () => format( new Date(), "ddMMyy_HHmmSSSS" );

const setISOTime = ( time ) => formatISO( fromUnixTime( time ) );

const formatYearMonthDay = ( date ) => {
  if ( date && typeof date === "string" ) {
    return format( parseISO( date ), "yyyy-MM-dd" );
  }
  if ( date && typeof date === "object" ) {
    return format( date, "yyyy-MM-dd" );
  }
  return format( new Date(), "yyyy-MM-dd" );
};

const formatHourMonthSecond = () => format( new Date(), "H:mm:ss" );

const createShortMonthsList = () => {
  const months = [];

  for ( let i = 0; i <= 11; i += 1 ) {
    const month = format( new Date( 2020, i, 1 ), "MMMMM", { locale: setLocale() } );

    months.push( month );
  }

  return months;
};

const formatMonthYear = ( date ) => format( date, "MMMM yyyy", { locale: setLocale() } );

const formatMonth = ( date ) => format( date, "MMMM", { locale: setLocale() } );

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
  createShortMonthsList,
  isWithin7Days,
  formatHourMonthSecond,
  formatMonthYear,
  formatMonth,
  serverBackOnlineTime,
  isWithinCurrentMonth
};
