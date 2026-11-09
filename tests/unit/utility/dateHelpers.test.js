jest.mock( "realm", () => ( {
  open: jest.fn( () => Promise.resolve( {
    objects: jest.fn( () => [] ),
  } ) ),
  Object: class {},
} ) );

jest.mock( "../../../models/index", () => ( {} ) );

jest.mock( "../../../i18n", () => ( {
  __esModule: true,
  default: {
    locale: "en",
    t: ( key ) => key,
  },
} ) );

jest.mock( "react-native-localize", () => jest.requireActual( "react-native-localize/mock/jest" ) );

jest.mock( "@lodev09/react-native-exify", () => ( {
  read: jest.fn(),
} ) );

import * as Exify from "@lodev09/react-native-exify";
import * as TimeZone from "date-fns-tz";
import { getTimeZone } from "react-native-localize";

import {
  formatGMTTimeWithTimeZone,
  setISOTime,
  unixTimeFromPhotoDate,
} from "../../../utility/dateHelpers";
import readExifFromMultiplePhotos from "../../../utility/parseExif";

const defaultGetTimeZone = jest.requireActual( "react-native-localize/mock" ).getTimeZone;

const restoreDefaultTimeZone = () => {
  getTimeZone.mockReset();
  getTimeZone.mockImplementation( defaultGetTimeZone );
};

const postedDateForExif = async ( tags ) => {
  Exify.read.mockResolvedValue( tags );
  const exif = await readExifFromMultiplePhotos( ["file:///photo.jpg"] );
  return formatGMTTimeWithTimeZone(
    setISOTime( unixTimeFromPhotoDate( exif.observed_on_string ) ),
  );
};

describe( "photo date to observation date", () => {
  afterEach( () => {
    restoreDefaultTimeZone();
    Exify.read.mockReset();
  } );

  it( "keeps the localize mock's default time zone", () => {
    expect( getTimeZone() ).toBe( "Europe/Paris" );
  } );
  it( "does not invent an observation date when the photo has none", () => {
    expect( unixTimeFromPhotoDate( null ) ).toBeNull( );
    expect( unixTimeFromPhotoDate( undefined ) ).toBeNull( );
    expect( unixTimeFromPhotoDate( "" ) ).toBeNull( );
    expect( unixTimeFromPhotoDate( "not-a-date" ) ).toBeNull( );

    expect( formatGMTTimeWithTimeZone( setISOTime( null ) ) ).toEqual( {
      dateForServer: null,
      dateForDisplay: null,
    } );
    expect( formatGMTTimeWithTimeZone( setISOTime( undefined ) ) ).toEqual( {
      dateForServer: null,
      dateForDisplay: null,
    } );
  } );

  it( "keeps a photo date's wall-clock time", () => {
    // Photo dates have no offset. Parsing uses the process zone, so formatting
    // has to use that same zone. The device-zone mock does not parse the string.
    getTimeZone.mockReturnValue( Intl.DateTimeFormat( ).resolvedOptions( ).timeZone );

    const { dateForServer } = formatGMTTimeWithTimeZone(
      setISOTime( unixTimeFromPhotoDate( "2018-03-30T21:14:00" ) ),
    );

    expect( dateForServer ).toMatch( /Mar 30 2018 21:14:00/ );
  } );

  it( "returns null for a missing time and for zero", () => {
    expect( setISOTime( null ) ).toBeNull();
    expect( setISOTime( undefined ) ).toBeNull();
    expect( setISOTime( NaN ) ).toBeNull();
    expect( setISOTime( 0 ) ).toBeNull();

    expect( setISOTime( 1e13 ) ).toBeNull();
    expect( setISOTime( -1e13 ) ).toBeNull();
    expect( formatGMTTimeWithTimeZone( setISOTime( 1e13 ) ).dateForServer ).toBeNull();
  } );

  it( "does not post an epoch date when the photo has no EXIF date", async () => {
    getTimeZone.mockReturnValue( Intl.DateTimeFormat( ).resolvedOptions( ).timeZone );

    const missing = await postedDateForExif( {} );
    expect( missing.dateForServer ).toBeNull();

    const dated = await postedDateForExif( {
      DateTimeOriginal: "2018:03:30 21:14:00",
    } );
    expect( dated.dateForServer ).toMatch( /Mar 30 2018 21:14:00/ );

    const zeroed = await postedDateForExif( {
      DateTimeOriginal: "0000:00:00 00:00:00",
    } );
    expect( zeroed.dateForServer ).toBeNull();

    const rolledMinute = await postedDateForExif( {
      DateTimeOriginal: "2018:03:30 10:61:00",
    } );
    const rolledSecond = await postedDateForExif( {
      DateTimeOriginal: "2018:03:30 10:00:75",
    } );
    const rolledHour = await postedDateForExif( {
      DateTimeOriginal: "2018:03:30 24:00:00",
    } );
    expect( rolledMinute.dateForServer ).toBeNull();
    expect( rolledSecond.dateForServer ).toBeNull();
    expect( rolledHour.dateForServer ).toBeNull();

    const belowFloor = await postedDateForExif( {
      DateTimeOriginal: "1899:12:31 00:00:00",
    } );
    expect( belowFloor.dateForServer ).toBeNull();

    const atFloor = await postedDateForExif( {
      DateTimeOriginal: "1900:01:01 00:00:00",
    } );
    expect( atFloor.dateForServer ).toMatch( /Jan 0?1 1900 00:00:00/ );

    const resetClockThatCouldBeReal = await postedDateForExif( {
      DateTimeOriginal: "1904:01:01 00:00:00",
    } );
    expect( resetClockThatCouldBeReal.dateForServer ).toMatch( /Jan 0?1 1904 00:00:00/ );

    const future = await postedDateForExif( {
      DateTimeOriginal: "2099:01:01 00:00:00",
    } );
    expect( future.dateForServer ).toBeNull();

    const pad = ( n ) => String( n ).padStart( 2, "0" );
    const exifHoursAhead = ( hours ) => {
      const when = new Date( Date.now() + hours * 60 * 60 * 1000 );
      return `${when.getUTCFullYear()}:${pad( when.getUTCMonth() + 1 )}:${pad( when.getUTCDate() )} ${pad( when.getUTCHours() )}:${pad( when.getUTCMinutes() )}:${pad( when.getUTCSeconds() )}`;
    };
    const withinADay = await postedDateForExif( {
      DateTimeOriginal: exifHoursAhead( 12 ),
    } );
    const pastADay = await postedDateForExif( {
      DateTimeOriginal: exifHoursAhead( 48 ),
    } );
    expect( withinADay.dateForServer ).toEqual( expect.any( String ) );
    expect( pastADay.dateForServer ).toBeNull();
  } );

  describe( "in America/Los_Angeles", () => {
    beforeEach( () => {
      getTimeZone.mockReturnValue( "America/Los_Angeles" );
    } );

    it( "does not pre-fill 31 December 1969 for unix time 0", () => {
      expect( formatGMTTimeWithTimeZone( setISOTime( 0 ) ) ).toEqual( {
        dateForServer: null,
        dateForDisplay: null,
      } );
    } );
  } );
} );

describe( "formatGMTTimeWithTimeZone", () => {
  beforeEach( () => {
    restoreDefaultTimeZone();
  } );

  afterEach( () => {
    restoreDefaultTimeZone();
    jest.restoreAllMocks( );
  } );

  it( "returns null when date is missing", () => {
    expect( formatGMTTimeWithTimeZone( null ) ).toEqual( {
      dateForServer: null,
      dateForDisplay: null,
    } );
  } );

  describe( "in Asia/Kolkata", () => {
    beforeEach( () => {
      getTimeZone.mockReturnValue( "Asia/Kolkata" );
    } );

    it( "posts wall-clock time with offset, not double-shifted", () => {
      const instant = "2024-01-10T08:30:25.000Z";
      const { dateForServer } = formatGMTTimeWithTimeZone( instant );

      expect( dateForServer ).toMatch( /Jan 10 2024 14:00:25 GMT \+0530/ );
    } );
  } );

  describe( "in America/Los_Angeles", () => {
    beforeEach( () => {
      getTimeZone.mockReturnValue( "America/Los_Angeles" );
    } );

    it( "posts a real timezone abbreviation when Intl resolves one", () => {
      const instant = "2024-01-10T20:00:00.000Z";
      const { dateForServer } = formatGMTTimeWithTimeZone( instant );

      expect( dateForServer ).toMatch( /\((PST|PDT)\)$/ );
    } );
  } );

  describe( "in UTC", () => {
    beforeEach( () => {
      getTimeZone.mockReturnValue( "UTC" );
    } );

    it( "allows a zero-offset timezone abbreviation", () => {
      const instant = "2024-01-10T14:00:25.000Z";
      const { dateForServer } = formatGMTTimeWithTimeZone( instant );

      expect( dateForServer ).toMatch( /Jan 10 2024 14:00:25 GMT \+0000 \((GMT|UTC)\)/ );
    } );
  } );

  describe( "when Intl mis-resolves the zone abbreviation (Hermes bug)", () => {
    let formatToPartsSpy;

    beforeEach( () => {
      getTimeZone.mockReturnValue( "Australia/Sydney" );
      const original = Intl.DateTimeFormat.prototype.formatToParts;
      formatToPartsSpy = jest.spyOn(
        Intl.DateTimeFormat.prototype,
        "formatToParts",
      ).mockImplementation( function mockFormatToParts( date ) {
        const parts = original.call( this, date );
        const resolvedOptions = this.resolvedOptions( );
        if ( !resolvedOptions.timeZoneName || resolvedOptions.timeZone !== "Australia/Sydney" ) {
          return parts;
        }
        return parts.map( part => (
          part.type === "timeZoneName"
            ? { ...part, value: "GMT" }
            : part
        ) );
      } );
    } );

    afterEach( () => {
      formatToPartsSpy.mockRestore( );
    } );

    it( "falls back to a numeric offset instead of the unreliable abbreviation", () => {
      const instant = "2024-01-10T08:00:00.000Z";
      const { dateForServer } = formatGMTTimeWithTimeZone( instant );

      expect( dateForServer ).toMatch( /GMT \+1100 \(GMT\+11\)/ );
      expect( dateForServer ).not.toMatch( /\(GMT\)$/ );
    } );
  } );

  describe( "when Intl rejects the device timezone (RangeError)", () => {
    let formatInTimeZoneSpy;

    beforeEach( () => {
      getTimeZone.mockReturnValue( "US/Eastern" );
      const actual = jest.requireActual( "date-fns-tz" );
      formatInTimeZoneSpy = jest.spyOn( TimeZone, "formatInTimeZone" ).mockImplementation(
        ( date, timeZone, pattern, options ) => {
          if ( timeZone === "US/Eastern" ) {
            throw new RangeError( "Invalid time zone specified: US/Eastern" );
          }
          return actual.formatInTimeZone( date, timeZone, pattern, options );
        },
      );
    } );

    it( "formats without throwing and omits the parenthetical zone", () => {
      const instant = "2024-01-10T20:00:00.000Z";
      const { dateForServer, dateForDisplay } = formatGMTTimeWithTimeZone( instant );

      expect( dateForServer ).toMatch( /Jan 10 2024 \d{2}:\d{2}:\d{2}/ );
      expect( dateForServer ).not.toMatch( /\([A-Z]+\)$/ );
      expect( dateForServer ).not.toMatch( /GMT[+-]/ );
      expect( dateForDisplay ).toBeTruthy( );
      expect( formatInTimeZoneSpy ).toHaveBeenCalled( );
    } );
  } );
} );
