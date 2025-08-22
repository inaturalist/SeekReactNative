import { device, element, by, waitFor } from "detox";

const TIMEOUT = 15_000;

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
    const getStarted = element( by.text( "GET STARTED" ) );
    await waitFor( getStarted ).toBeVisible().withTimeout( TIMEOUT );
    const continueButton = element( by.text( "CONTINUE" ) );
    await waitFor( continueButton ).toBeVisible().withTimeout( TIMEOUT );
    await continueButton.tap();
    const speciesNearby = element( by.text( "SPECIES NEARBY" ) );
    await waitFor( speciesNearby ).toBeVisible().withTimeout( TIMEOUT );
    // Navigate to the camera screen
    const cameraButton = await element( by.id( "openCameraButton" ) );
    await waitFor( cameraButton ).toBeVisible().withTimeout( TIMEOUT );
    await cameraButton.tap();
    // Close warning modal
    const warningContinue = await element( by.id( "warningContinue" ) );
    await waitFor( warningContinue ).toBeVisible().withTimeout( TIMEOUT );
    await warningContinue.tap();
    // Check that the mocked cv suggestion is visible
    const taxonResult = element( by.id( "headerPrediction" ) );
    await waitFor( taxonResult ).toBeVisible().withTimeout( TIMEOUT );
    // Tap the take photo button
    const takePhotoButton = element( by.id( "takePhotoButton" ) );
    await waitFor( takePhotoButton ).toBeVisible().withTimeout( TIMEOUT );
    await takePhotoButton.tap();
    // Check for taxa text on the screen
    const taxaText = element( by.id( "taxonText" ) );
    await waitFor( taxaText ).toBeVisible().withTimeout( TIMEOUT );
    const newObs = element( by.text( "YOU OBSERVED A NEW SPECIES!" ) );
    await waitFor( newObs ).toBeVisible().withTimeout( TIMEOUT );
    // Head back to camera
    const backToCamera = element( by.id( "backToCamera" ) );
    await waitFor( backToCamera ).toBeVisible().withTimeout( TIMEOUT );
    await backToCamera.tap();
    // Tap the take photo button again
    const takePhotoButton2 = element( by.id( "takePhotoButton" ) );
    await waitFor( takePhotoButton2 ).toBeVisible().withTimeout( TIMEOUT );
    await takePhotoButton2.tap();
    // Check for taxa text on the screen
    const replacePhoto = element( by.id( "replacePhoto" ) );
    await waitFor( replacePhoto ).toBeVisible().withTimeout( TIMEOUT );
    await replacePhoto.tap();
    const resighted = element( by.text( "YOU RESIGHTED A SPECIES!" ) );
    await waitFor( resighted ).toBeVisible().withTimeout( TIMEOUT );
  } );
} );
