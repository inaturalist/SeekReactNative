import { device, element, by, waitFor } from "detox";

describe( "Camera test", () => {
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
    // Navigate to the camera screen
    const cameraButton = await element( by.id( "openCameraButton" ) );
    await expect( cameraButton ).toBeVisible();
    await cameraButton.tap();
    // Close warning modal
    const warningContinue = await element( by.id( "warningContinue" ) );
    await expect( warningContinue ).toBeVisible();
    await warningContinue.tap();
    // Check that the camera screen is visible
    const mockCamera = element( by.id( "mock-camera" ) );
    await waitFor( mockCamera ).toBeVisible();

  } );
} );
