import moment from "moment";
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

// import i18n from "../i18n";
import realmConfig from "../models/index";

const today = new Date();

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

// const setMonthLocales = () => {
//   const monthsShort = [
//     i18n.t( "months_short.1" ),
//     i18n.t( "months_short.2" ),
//     i18n.t( "months_short.3" ),
//     i18n.t( "months_short.4" ),
//     i18n.t( "months_short.5" ),
//     i18n.t( "months_short.6" ),
//     i18n.t( "months_short.7" ),
//     i18n.t( "months_short.8" ),
//     i18n.t( "months_short.9" ),
//     i18n.t( "months_short.10" ),
//     i18n.t( "months_short.11" ),
//     i18n.t( "months_short.12" )
//   ];

//   const locale = i18n.locale.split( "-" )[0];

//   moment.locale( locale );

//   moment.updateLocale( locale, {
//     monthsShort
//   } );
// };

const formatShortMonthDayYear = ( date ) => format( date, "PP" );

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
    return moment( date ).format( "YYYY-MM-DD" );
  }
  return moment().format( "YYYY-MM-DD" );
};

const formatMonthDayYear = ( date ) => moment( date ).format( "MMMM DD, YYYY" );

const createShortMonthsList = () => moment.monthsShort();

export {
  checkIfChallengeAvailable,
  requiresParent,
  isWithinPastYear,
  // setMonthLocales,
  fetchSpeciesSeenDate,
  createTimestamp,
  namePhotoByTime,
  setISOTime,
  formatYearMonthDay,
  formatMonthDayYear,
  formatShortMonthDayYear,
  createShortMonthsList
};
