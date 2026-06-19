import { exec, execSync } from "child_process";

function execPromise( command ) {
  return new Promise( ( resolve, reject ) => {
    exec( command, ( error, stdout, stderr ) => {
      if ( error ) {
        console.log( `Error executing command: ${command}` );
        console.log( `stderr: ${stderr}` );
        reject( error );
        return;
      }
      resolve( stdout );
    } );
  } );
}

export async function iNatE2eBeforeAll( device ) {
  if ( device.getPlatform( ) === "android" ) {
    // Push a test image into the app's external files directory so the mock
    // camera can use it as a photo source (copyAssetsFileIOS is iOS-only).
    // The directory is created with `mkdir -p` in case the app hasn't run yet.
    execSync(
      "adb shell mkdir -p /sdcard/Android/data/org.inaturalist.seek/files/",
    );
    execSync(
      "adb push e2e/animal.jpg"
        + " /sdcard/Android/data/org.inaturalist.seek/files/e2e_test.jpg",
    );
  }
}

export async function iNatE2eBeforeEach( device ) {
  const launchAppOptions = {
    newInstance: true,
    permissions: {
      location: "always",
      camera: "YES",
      medialibrary: "YES",
      photos: "YES",
    },
  };
  try {
    await device.launchApp( launchAppOptions );
  } catch ( launchAppError ) {
    if ( !launchAppError.message.match( /unexpectedly disconnected/ ) ) {
      throw launchAppError;
    }
    // Try it one more time
    await device.launchApp( launchAppOptions );
  }
  if ( device.getPlatform( ) === "ios" ) {
    // disable password autofill
    execSync(
       
      `plutil -replace restrictedBool.allowPasswordAutoFill.value -bool NO ~/Library/Developer/CoreSimulator/Devices/${device.id}/data/Containers/Shared/SystemGroup/systemgroup.com.apple.configurationprofiles/Library/ConfigurationProfiles/UserSettings.plist`,
    );
    execSync(
       
      `plutil -replace restrictedBool.allowPasswordAutoFill.value -bool NO ~/Library/Developer/CoreSimulator/Devices/${device.id}/data/Library/UserConfigurationProfiles/EffectiveUserSettings.plist`,
    );
    execSync(
       
      `plutil -replace restrictedBool.allowPasswordAutoFill.value -bool NO ~/Library/Developer/CoreSimulator/Devices/${device.id}/data/Library/UserConfigurationProfiles/PublicInfo/PublicEffectiveUserSettings.plist`,
    );
  }
}

async function getSimulatorId() {
  try {
    // List all available simulators
    const output = await execPromise( "xcrun simctl list devices --json" );
    const { devices } = JSON.parse( output );

    // Use Object.values and Array.find instead of loops
    const bootedDevice = Object.entries( devices )
      .flatMap( ( [_runtime, deviceList] ) => deviceList ) // Use _ prefix for unused variables
      .find( device => device.state === "Booted" );

    if ( bootedDevice ) {
      console.log( `Found booted simulator: ${bootedDevice.name} (${bootedDevice.udid})` );
      return bootedDevice.udid;
    }

    console.log( "No booted simulator found" );
    return null;
  } catch ( error ) {
    console.log( "Error getting simulator ID:", error.message );
    return null;
  }
}

export function terminateApp( deviceId, bundleId ) {
  try {
    console.log( `Attempting to terminate ${bundleId} on device ${deviceId}...` );
    const result = execSync( `/usr/bin/xcrun simctl terminate ${deviceId} ${bundleId}` );
    console.log( "App terminated successfully", result.toString() );
    return true;
  } catch ( error ) {
    if ( error.stderr && error.stderr.toString().includes( "found nothing to terminate" ) ) {
      console.log( "App is not running, nothing to terminate." );
      return true;
    }
    console.error( "Error during app termination:", error.message );
    return false;
  }
}

export async function iNatE2eAfterEach( device ) {
  if ( device && device.getPlatform() === "android" ) {
    return;
  }

  try {
    // Try to use device.terminateApp first (the built-in Detox method)
    if ( device ) {
      try {
        await device.terminateApp();
        console.log( "App terminated through Detox" );
        // Add a small delay to let Detox processes settle
        await new Promise( resolve => { setTimeout( resolve, 300 ); } );
        return;
      } catch ( detoxError ) {
        console.log(
          "Detox terminateApp failed, falling back to manual termination:",
          detoxError.message,
        );
      }
    }

    // Fall back to manual termination if Detox method fails or device is unavailable
    const deviceId = await getSimulatorId();
    const bundleId = "org.inaturalist.seek";

    if ( deviceId && bundleId ) {
      console.log( "Using manual termination via simctl" );
      // Use existing terminateApp, but don't throw errors
      try {
        await terminateApp( deviceId, bundleId );
      } catch ( error ) {
        console.log( "Manual termination error (non-fatal):", error.message );
      }

      // Add a delay to let processes settle
      await new Promise( resolve => { setTimeout( resolve, 500 ); } );
    }
  } catch ( error ) {
    console.log( "Error during cleanup (non-fatal):", error.message );
  }
}
