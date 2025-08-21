import { device, element, by, waitFor } from "detox";

const TIMEOUT = 10_000;

describe( "First app start test", () => {
  beforeAll( async () => {
    await device.launchApp( {
      newInstance: true,
      permissions: { location: "always", camera: "YES", microphone: "YES", medialibrary: "YES", photos: "YES" },
      languageAndLocale: { language: "en", locale: "US" }
    } );
  } );

  beforeEach( async () => {
    await device.reloadReactNative();
  } );

  it( "should land on home screen", async () => {
    // Await the loading of the home screen
    const getStarted = element( by.text( "GET STARTED" ) );
    await waitFor( getStarted ).toBeVisible().withTimeout( TIMEOUT );
    const continueButton = element( by.text( "CONTINUE" ) );
    await waitFor( continueButton ).toBeVisible().withTimeout( TIMEOUT );
    await continueButton.tap();
    const speciesNearby = element( by.text( "SPECIES NEARBY" ) );
    await waitFor( speciesNearby ).toBeVisible().withTimeout( TIMEOUT );
  } );
} );
