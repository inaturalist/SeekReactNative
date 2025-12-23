import { Alert, Platform } from "react-native";
import RNFS from "react-native-fs";

import i18n from "../i18n";
import { dirModel, dirGeomodel, dirTaxonomy } from "./dirStorage";
import modelFiles from "../constants/modelFileNames";

const addCameraFilesAndroid = () => {
  const copyFilesAndroid = ( source: string, destination: string ) => {
    RNFS.copyFileAssets( source, destination ).then( ( _result ) => {
      console.log( `moved file from ${source} to ${destination}` );
    } ).catch( ( error ) => {
      console.log( error, `error moving file from ${source} to ${destination}` );
    } );
  };

  RNFS.readDirAssets( "camera" ).then( ( results ) => {
    const model = modelFiles.ANDROIDMODEL;
    const geomodel = modelFiles.ANDROIDGEOMODEL;
    const taxonomy = modelFiles.ANDROIDTAXONOMY;

    const hasModel = results.find( ( r ) => r.name === model );
    const hasGeoModel = results.find( ( r ) => r.name === geomodel );

    // Android writes over existing files
    if ( hasModel !== undefined ) {
      console.log( "Found model asset with filename", model );
      copyFilesAndroid( `camera/${model}`, dirModel );
      copyFilesAndroid( `camera/${taxonomy}`, dirTaxonomy );
    } else {
      console.log( "No model asset found to copy into document directory." );
      Alert.alert(
        i18n.t( "model.not_found_error" ),
        i18n.t( "model.not_found_error_description" )
      );
    }
    if ( hasGeoModel !== undefined ) {
      console.log( "Found geomodel asset with filename", geomodel );
      copyFilesAndroid( `camera/${geomodel}`, dirGeomodel );
    } else {
      console.log( "No geomodel asset found to copy into document directory." );
    }
  } );
};

const checkForModelFileIOS = () => {
  RNFS.readDir( RNFS.MainBundlePath ).then( ( results ) => {
    const model = modelFiles.IOSMODEL;
    const hasModel = results.find( ( r ) => r.name === model );
    if ( hasModel !== undefined ) {
      console.log( "Found model asset with filename", model );
    } else {
      console.log( "No model asset found to copy into document directory." );
      Alert.alert(
        i18n.t( "model.not_found_error" ),
        i18n.t( "model.not_found_error_description" )
      );
    }
  } );
};

const removeDeprecatedModelFilesIOS = () => {
  // On releasing cv model 2.13 (the second one ever), we changed the app to use the model
  // from the main bundle directly  instead of the document directory. This function removes all
  // existing model files from the document directory.
  RNFS.readDir( RNFS.DocumentDirectoryPath ).then( ( results ) => {
    results.forEach( ( result ) => {
      if ( result.name.includes( ".mlmodelc" ) || result.name.includes( "taxonomy" ) ) {
        RNFS.unlink( `${RNFS.DocumentDirectoryPath}/${result.name}` ).then( () => {
          console.log( "Removed deprecated model file: ", result.name );
        } ).catch( ( error ) => {
          console.log( error, "error removing deprecated model file" );
        } );
      }
    } );
  } );
};

const removeDeprecatedModelFilesAndroid = () => {
  RNFS.readDir( RNFS.DocumentDirectoryPath ).then( ( results ) => {
    results.forEach( ( result ) => {
      if ( result.name === modelFiles.ANDROIDMODEL || result.name === modelFiles.ANDROIDTAXONOMY ) {
        console.log( "Not removing model asset with filename", result.name );
        return;
      }
      if ( result.name.includes( ".tflite" ) || result.name.includes( ".csv" ) ) {
        RNFS.unlink( `${RNFS.DocumentDirectoryPath}/${result.name}` ).then( () => {
          console.log( "Removed deprecated model file: ", result.name );
        } ).catch( ( error ) => {
          console.log( error, "error removing deprecated model file" );
        } );
      }
    } );
  } );
};

const addARCameraFiles = async () => {
  if ( Platform.OS === "android" ) {
    removeDeprecatedModelFilesAndroid();
    addCameraFilesAndroid();
  } else if ( Platform.OS === "ios" ) {
    removeDeprecatedModelFilesIOS();
    checkForModelFileIOS();
  }
};

export {
  addARCameraFiles,
};
