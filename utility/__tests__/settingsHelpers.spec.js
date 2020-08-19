import { getLanguage, toggleLanguage } from "../settingsHelpers";
import i18n from "../../i18n";

describe( "getLanguage", () => {
  it( "returns device locale by default", async () => {
    const result = await getLanguage();

    expect( result ).toEqual( "device" );
  } );

  it( "returns the user's saved language preference", async () => {
    // using the same language as the __mocks__ findBestAvailableLanguage function
    toggleLanguage( "en-US" );

    const result = await getLanguage();
    const expected = i18n.locale;

    expect( result ).toEqual( expected );
  } );
} );
