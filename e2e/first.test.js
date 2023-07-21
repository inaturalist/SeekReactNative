import { device, element, by, waitFor } from "detox";

describe( "First app start test", () => {
  beforeAll( async () => {
    await device.launchApp( { newInstance: true, permissions: { location: "always" }, languageAndLocale: { language: "en", locale: "US" } } );
  } );

  beforeEach( async () => {
    await device.reloadReactNative();
  } );

  it( "should land on home screen", async () => {
    // Await the loading of the home screen
    await waitFor( element( by.text( "GET STARTED" ) ) ).toBeVisible().withTimeout( 4000 );
    await waitFor( element( by.text( "CONTINUE" ) ) ).toBeVisible();
    await element( by.text( "CONTINUE" ) ).tap();
    await expect( element( by.text( "SPECIES NEARBY" ) ) ).toBeVisible();
  } );
} );
