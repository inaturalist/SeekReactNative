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
import TimeZone from "date-fns-tz";
import * as RNLocalize from "react-native-localize";
import {
  af,
  ar,
  ca,
  cs,
  da,
  de,
  es,
  enUS,
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
import { localeNoHyphens } from "./languageHelpers";

const locales = {
  af,
  ar,
  ca,
  cs,
  da,
  de,
  en: enUS,
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
  } else if ( locales[localeNoHyphens( i18n.locale )] ) {
    return { locale: locales[localeNoHyphens( i18n.locale )] };
  }

  return { };
};

const requiresParent = ( birthday: string ): boolean => {
  const thirteen = subYears( new Date(), 13 );
  const formattedBirthday = parseISO( birthday );

  return isAfter( formattedBirthday, thirteen );
};

const checkIfChallengeAvailable = ( date: Date ): boolean => date <= new Date();

const isWithinPastYear = ( reviewShownDate: Date ): boolean => {
  const lastYear = subYears( new Date(), 1 );

  return isAfter( reviewShownDate, lastYear );
};

const isWithinCurrentMonth = ( date: Date ): boolean => isSameMonth( date, new Date() );

const isWithin7Days = ( date: number ): boolean => {
  const sevenDaysAgo = subDays( new Date(), 7 );

  return isAfter( date, sevenDaysAgo );
};

const formatShortMonthDayYear = ( date: Date ): string => format( date, "PP", setLocale( ) );

const fetchSpeciesSeenDate = ( taxaId: number ): Promise<?string> => (
  // $FlowFixMe
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

const createTimestamp = (): number => getUnixTime( new Date() );

const serverBackOnlineTime = ( gmtTime: string ): number => differenceInHours( new Date( gmtTime ), new Date() );

const namePhotoByTime = (): string => format( new Date(), "ddMMyy_HHmmSSSS" );

const formatPostingToINat = ( date: any ): string => format( date, "PPPPpaaa", { locale: locales[i18n.locale] } );

const setISOTime = ( time: number ): string => formatISO( fromUnixTime( time ) );

// format like iNatIOS: https://github.com/inaturalist/INaturalistIOS/blob/b668c19cd5dc917eac52b5ba740c60a00266b030/INaturalistIOS/INatModel.m#L57
// Javascript-like date format, e.g. @"Sun Mar 18 2012 17:07:20 GMT-0700 (PDT)"
const formatGMTTimeWithTimeZone = ( date: any ): {
  dateForServer: ?string,
  dateForDisplay: ?string
} => {
  if ( !date ) { return {
    dateForServer: null,
    dateForDisplay: null
  }; }
  const { utcToZonedTime } = TimeZone;

  const timeZone = RNLocalize.getTimeZone( );
  const zonedDate = utcToZonedTime( date, timeZone );
  const pattern = "EEE MMM dd yyyy HH:mm:ss 'GMT' xxxx (zzz)";
  return {
    dateForServer: TimeZone.format( zonedDate, pattern, { timeZone, locale: enUS } ),
    dateForDisplay: formatPostingToINat( zonedDate )
  };
};

const formatYearMonthDay = ( date: any ): string => {
  if ( date && typeof date === "string" ) {
    return format( parseISO( date ), "yyyy-MM-dd" );
  }
  if ( date && typeof date === "object" ) {
    return format( date, "yyyy-MM-dd" );
  }
  return format( new Date(), "yyyy-MM-dd" );
};

const formatHourMonthSecond = (): string => format( new Date(), "H:mm:ss" );

const createShortMonthsList = ( ): Array<string> => {
  const months = Array.from( { length: 12 }, ( v, i ) => i + 1 );

  return months.map( i => {
    return format( new Date( 2020, i, 0 ), "MMMMM", setLocale( ) );
  } );
};

const formatMonthYear = ( date: Date ): string => format( date, "MMMM yyyy", setLocale( ) );

const formatMonth = ( date: Date ): string => format( date, "MMMM", setLocale( ) );

const isAndroidDateInFuture = ( selectedDate: Date ): boolean => {
  if ( Platform.OS === "android" && isAfter( selectedDate, new Date() ) ) {
    return true;
  }
  return false;
};

const isDateInFuture = ( selectedDate: Date ): boolean => isAfter( selectedDate, new Date( ) );

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
  isAndroidDateInFuture,
  formatGMTTimeWithTimeZone,
  isDateInFuture
};
