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
      .toBeVisible().withTimeout( 10000 );
    await waitFor( element( by.text( "CONTINUE" ) ) ).toBeVisible().withTimeout( 10000 );
    await element( by.text( "CONTINUE" ) ).tap();
    await waitFor( element( by.text( "SPECIES NEARBY" ) ) ).toBeVisible().withTimeout( 10000 );
    // Navigate to the camera screen
    const cameraButton = await element( by.id( "openCameraButton" ) );
    await waitFor( cameraButton ).toBeVisible().withTimeout( 10000 );
    await cameraButton.tap();
    // Close warning modal
    const warningContinue = await element( by.id( "warningContinue" ) );
    await waitFor( warningContinue ).toBeVisible().withTimeout( 10000 );
    await warningContinue.tap();
    // Check that the camera screen is visible
    const mockCamera = element( by.id( "mock-camera" ) );
    await waitFor( mockCamera ).toBeVisible();
    // Check that the mocked cv suggestion is visible
    const taxonResult = element( by.id( "headerPrediction" ) );
    await waitFor( taxonResult ).toBeVisible().withTimeout( 10000 );
    // Tap the take photo button
    const takePhotoButton = element( by.id( "takePhotoButton" ) );
    await waitFor( takePhotoButton ).toBeVisible().withTimeout( 10000 );
    await takePhotoButton.tap();

    // Check for taxa text on the screen
    const taxaText = element( by.id( "taxonText" ) );
    await waitFor( taxaText ).toBeVisible().withTimeout( 10000 );
    // Head back to camera
    const backToCamera = element( by.id( "backToCamera" ) );
    await waitFor( backToCamera ).toBeVisible().withTimeout( 10000 );
    await backToCamera.tap();

  } );
} );
