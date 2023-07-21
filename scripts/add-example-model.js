const fs = require( "fs" ).promises;
const path = require( "path" );
const download = require( "download" );

const modelURL
  = "https://github.com/inaturalist/SeekReactNative/releases/download/v2.9.1-138/small_model.zip";

const modelPath = path.join( __dirname, "..", "temp", "model" );
const examplePath = path.join( modelPath, "tf1 2" );
const androidModelFile = "small_inception_tf1.tflite";
const androidTaxonomyFile = "small_export_tax.csv";
const iosModelFile = "small_inception_tf1.mlmodel";
const iosTaxonomyFile = "small_export_tax.json";
const androidModelPath = path.join( examplePath, androidModelFile );
const androidTaxonomyPath = path.join( examplePath, androidTaxonomyFile );
const iosModelPath = path.join( examplePath, iosModelFile );
const iosTaxonomyPath = path.join( examplePath, iosTaxonomyFile );

const androidDestinationPath
  = path.join( __dirname, "..", "android", "app", "src", "debug", "assets", "camera" );
const iosDestinationPath = path.join( __dirname, "..", "ios" );

( async () => {
  console.log( `Downloading example model from '${modelURL}'...` );
  await download( modelURL, modelPath, {
    extract: true
  } );
  console.log( "Downloaded!" );

  console.log( "Copying model files to assets folder..." );
  await fs.mkdir( androidDestinationPath, { recursive: true } );
  await fs.copyFile( androidModelPath, path.join( androidDestinationPath, androidModelFile ) );
  await fs.copyFile(
    androidTaxonomyPath,
    path.join( androidDestinationPath, androidTaxonomyFile )
  );

  await fs.mkdir( iosDestinationPath, { recursive: true } );
  await fs.copyFile( iosModelPath, path.join( iosDestinationPath, iosModelFile ) );
  await fs.copyFile( iosTaxonomyPath, path.join( iosDestinationPath, iosTaxonomyFile ) );

  console.log( "Delete temp model folder and its contents..." );
  await fs.rm( modelPath, { recursive: true } );

  console.log( "Done!" );
} )();
