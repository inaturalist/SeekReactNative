// @flow
// Copied from iNatNext on 2024-12-10
import { formatISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { readExif } from "react-native-exif-reader";

function formatISONoTimezone( date: Date ) {
  if ( !date ) {
    return "";
  }
  const formattedISODate = formatISO( date );
  if ( !formattedISODate ) {
    return "";
  }
  // Always take the first part of the time/date string,
  // without any extra timezone, etc (just "2022-12-31T23:59:59")
  return formattedISODate.substring( 0, 19 );
}

class UsePhotoExifDateFormatError extends Error {}

// https://wbinnssmith.com/blog/subclassing-error-in-modern-javascript/
Object.defineProperty( UsePhotoExifDateFormatError.prototype, "name", {
  value: "UsePhotoExifDateFormatError"
} );

// Parses EXIF date time into a date object
export const parseExifDateToLocalTimezone = ( datetime: string ): ?Date => {
  if ( !datetime ) {return null;}

  // react-native-exif-reader formats the date based on GMT time,
  // so we create a date object here using GMT time, not the user's local timezone
  const isoDate = `${datetime}Z`;
  const zonedDate = utcToZonedTime( isoDate, "GMT" );

  if ( !zonedDate || zonedDate.toString().match( /invalid/i ) ) {
    throw new UsePhotoExifDateFormatError( "Date was not formatted correctly" );
  }

  return zonedDate;
};

// Parses EXIF date time into a date object
export const parseExif = async ( photoUri: ?string ): Promise<Object> => {
  try {
    return readExif( photoUri );
  } catch ( e ) {
    console.error( e, "Couldn't parse EXIF" );
    return null;
  }
};

export const formatExifDateAsString = ( datetime: string ): string => {
  const zonedDate = parseExifDateToLocalTimezone( datetime );
  // this returns a string, in the same format as photos which fall back to the
  // photo timestamp instead of exif data
  return formatISONoTimezone( zonedDate );
};

// Parse the EXIF of all photos - fill out details (lat/lng/date) from all of these,
// in case the first photo is missing EXIF
export const readExifFromMultiplePhotos = async (
  photoUris: Array<string>
): Promise<Object> => {
  const unifiedExif = {};

  const responses = await Promise.allSettled( photoUris.map( parseExif ) );
  const allExifPhotos: Array<{
    latitude: number,
    longitude: number,
    positional_accuracy: number,
    date: string,
    // Flow will complain that value is undefined, but the filter call ensures
    // that it isn't
    // $FlowIgnore
  }> = responses.filter( ( r ) => r.value ).map( ( r ) => r.value );

  allExifPhotos
    .filter( ( x ) => x )
    .forEach( ( currentPhotoExif ) => {
      const {
        latitude,
        longitude,
        positional_accuracy: positionalAccuracy,
        date
      } = currentPhotoExif;

      if ( !unifiedExif.latitude ) {
        unifiedExif.latitude = latitude;
      }
      if ( !unifiedExif.longitude ) {
        unifiedExif.longitude = longitude;
      }
      if ( !unifiedExif.observed_on_string ) {
        unifiedExif.observed_on_string = formatExifDateAsString( date ) || null;
      }
      if ( positionalAccuracy && !unifiedExif.positional_accuracy ) {
        unifiedExif.positional_accuracy = positionalAccuracy;
      }
    } );
  return unifiedExif;
};
