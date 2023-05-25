import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getScientificNames,
  toggleLanguage,
  getLanguage,
  getAutoCapture,
  getSeasonality
} from "../../../utility/settingsHelpers";

describe( "getScientificNames", () => {
  it( "should return false if scientific_names is null", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( null );
    const result = await getScientificNames();
    expect( result ).toBe( false );
  } );

  it( "should return false if scientific_names is \"false\"", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( "false" );
    const result = await getScientificNames();
    expect( result ).toBe( false );
  } );

  it( "should return true if scientific_names is not null or \"false\"", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( "true" );
    const result = await getScientificNames();
    expect( result ).toBe( true );
  } );
} );

describe( "toggleLanguage", () => {
  it( "should set the language in AsyncStorage", () => {
    jest.spyOn( AsyncStorage, "setItem" ).mockResolvedValueOnce();
    toggleLanguage( "en" );
    expect( AsyncStorage.setItem ).toHaveBeenCalledWith( "language", "en" );
  } );
} );

describe( "getLanguage", () => {
  it( "should return the language from AsyncStorage if it exists", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( "en" );
    const result = await getLanguage();
    expect( result ).toBe( "en" );
  } );

  it( "should return false if there is an error getting the language from AsyncStorage", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockRejectedValueOnce();
    const result = await getLanguage();
    expect( result ).toBe( false );
  } );
} );

describe( "getAutoCapture", () => {
  it( "should return false if camera is null", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( null );
    const result = await getAutoCapture();
    expect( result ).toBe( false );
  } );

  it( "should return false if camera is \"false\"", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( "false" );
    const result = await getAutoCapture();
    expect( result ).toBe( false );
  } );

  it( "should return true if camera is not null or \"false\"", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( "true" );
    const result = await getAutoCapture();
    expect( result ).toBe( true );
  } );
} );

describe( "getSeasonality", () => {
  it( "should return false if seasonality is null", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( null );
    const result = await getSeasonality();
    expect( result ).toBe( false );
  } );

  it( "should return false if seasonality is \"false\"", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( "false" );
    const result = await getSeasonality();
    expect( result ).toBe( false );
  } );

  it( "should return true if seasonality is not null or \"false\"", async () => {
    jest.spyOn( AsyncStorage, "getItem" ).mockResolvedValueOnce( "true" );
    const result = await getSeasonality();
    expect( result ).toBe( true );
  } );
} );
