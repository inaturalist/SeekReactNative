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

import * as TimeZone from "date-fns-tz";
import * as RNLocalize from "react-native-localize";

import { formatGMTTimeWithTimeZone } from "../../../utility/dateHelpers";

describe( "formatGMTTimeWithTimeZone", () => {
  let getTimeZoneSpy;

  beforeEach( () => {
    getTimeZoneSpy = jest.spyOn( RNLocalize, "getTimeZone" );
  } );

  afterEach( () => {
    getTimeZoneSpy.mockRestore( );
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
      getTimeZoneSpy.mockReturnValue( "Asia/Kolkata" );
    } );

    it( "posts wall-clock time with offset, not double-shifted", () => {
      const instant = "2024-01-10T08:30:25.000Z";
      const { dateForServer } = formatGMTTimeWithTimeZone( instant );

      expect( dateForServer ).toMatch( /Jan 10 2024 14:00:25 GMT \+0530/ );
    } );
  } );

  describe( "in America/Los_Angeles", () => {
    beforeEach( () => {
      getTimeZoneSpy.mockReturnValue( "America/Los_Angeles" );
    } );

    it( "posts a real timezone abbreviation when Intl resolves one", () => {
      const instant = "2024-01-10T20:00:00.000Z";
      const { dateForServer } = formatGMTTimeWithTimeZone( instant );

      expect( dateForServer ).toMatch( /\((PST|PDT)\)$/ );
    } );
  } );

  describe( "in UTC", () => {
    beforeEach( () => {
      getTimeZoneSpy.mockReturnValue( "UTC" );
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
      getTimeZoneSpy.mockReturnValue( "Australia/Sydney" );
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
      getTimeZoneSpy.mockReturnValue( "US/Eastern" );
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
