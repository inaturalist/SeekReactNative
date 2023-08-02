import { device, element, by, waitFor } from "detox";

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

  it( "should navigate to camera screen", async () => {
    // Await the loading of the home screen
    await waitFor( element( by.text( "GET STARTED" ) ) )
      .toBeVisible()
      .withTimeout( 4000 );
    await waitFor( element( by.text( "CONTINUE" ) ) ).toBeVisible();
    await element( by.text( "CONTINUE" ) ).tap();
    await expect( element( by.text( "SPECIES NEARBY" ) ) ).toBeVisible();
    await element( by.id( "openCameraButton" ) ).tap();
    // Mocked away
    // await expect( element( by.text( "REMEMBER" ) ) ).toBeVisible();
    // await waitFor( element( by.text( "CONTINUE" ) ) ).toBeVisible();
    // await element( by.text( "CONTINUE" ) ).tap();
    await element( by.id( "takePhotoButton" ) ).tap();
    // Mocked taking of photo in ARCamera.e2e-mock.js
    await waitFor( element( by.text( "TAKE ANOTHER PHOTO" ) ) )
      .toBeVisible()
      .withTimeout( 15000 );

  } );
} );
