// @flow

import Realm from "realm";
import { Platform } from "react-native";
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
  eu,
  fi,
  fr,
  he,
  it,
  ja,
  pl,
  ptBR,
  nb,
  nl,
  ro,
  ru,
  sv,
  tr,
  zhTW
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
  "es-MX": es,
  eu,
  fi,
  fr,
  he,
  it,
  ja,
  nb,
  nl,
  pl,
  "pt-BR": ptBR,
  ro,
  ru,
  sv,
  tr,
  zh: zhTW
};

const setLocale = ( ) => {
  if ( locales[i18n.locale] ) {
    return { locale: locales[i18n.locale] };
  }

  return { };
};

const requiresParent = ( birthday: string ) => {
  const thirteen = subYears( new Date(), 13 );
  const formattedBirthday = parseISO( birthday );

  return isAfter( formattedBirthday, thirteen );
};

const checkIfChallengeAvailable = ( date: Date ) => date <= new Date();

const isWithinPastYear = ( reviewShownDate: Date ) => {
  const lastYear = subYears( new Date(), 1 );

  return isAfter( reviewShownDate, lastYear );
};

const isWithinCurrentMonth = ( date: Date ) => isSameMonth( date, new Date() );

const isWithin7Days = ( date: number ) => {
  const sevenDaysAgo = subDays( new Date(), 7 );

  return isAfter( date, sevenDaysAgo );
};

const formatShortMonthDayYear = ( date: Date ) => format( date, "PP", setLocale( ) );

const fetchSpeciesSeenDate = ( taxaId: number ) => (
  new Promise<?string>( ( resolve ) => {
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

const serverBackOnlineTime = ( gmtTime: string ) => differenceInHours( new Date( gmtTime ), new Date() );

const namePhotoByTime = () => format( new Date(), "ddMMyy_HHmmSSSS" );

const setISOTime = ( time: number ) => formatISO( fromUnixTime( time ) );

const formatYearMonthDay = ( date: any ) => {
  if ( date && typeof date === "string" ) {
    return format( parseISO( date ), "yyyy-MM-dd" );
  }
  if ( date && typeof date === "object" ) {
    return format( date, "yyyy-MM-dd" );
  }
  return format( new Date(), "yyyy-MM-dd" );
};

const formatHourMonthSecond = () => format( new Date(), "H:mm:ss" );

const createShortMonthsList = ( ): Array<string> => {
  const months = Array.from( { length: 12 }, ( v, i ) => i + 1 );

  return months.map( i => {
    return format( new Date( 2020, i, 0 ), "MMMMM", setLocale( ) );
  } );
};

const formatMonthYear = ( date: Date ) => format( date, "MMMM yyyy", setLocale( ) );

const formatMonth = ( date: Date ) => format( date, "MMMM", setLocale( ) );

const isAndroidDateInFuture = ( selectedDate ) => {
  if ( Platform.OS === "android" && isAfter( selectedDate, new Date() ) ) {
    return true;
  }
  return false;
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
  createShortMonthsList,
  isWithin7Days,
  formatHourMonthSecond,
  formatMonthYear,
  formatMonth,
  serverBackOnlineTime,
  isWithinCurrentMonth,
  isAndroidDateInFuture
};
