const { DownloaderHelper } = require( "node-downloader-helper" );
const fs = require( "fs" ).promises;
const path = require( "path" );
const yargs = require( "yargs" );

const binariesBaseDir =
  "https://github.com/inaturalist/model-files/releases/download/v25.01.15";

const androidExt = "tflite";
const iosExt = "mlmodel";
const cvModelFilename = "INatVision_Small_2_fact256_8bit";
const geomodelFilename = "INatGeomodel_Small_2_8bit";

const androidCV = `${binariesBaseDir}/${cvModelFilename}.${androidExt}`;
const iosCV = `${binariesBaseDir}/${cvModelFilename}.${iosExt}`;
const androidGeo = `${binariesBaseDir}/${geomodelFilename}.${androidExt}`;
const iosGeo = `${binariesBaseDir}/${geomodelFilename}.${iosExt}`;
const taxonomyCSV = `${binariesBaseDir}/taxonomy.csv`;
const taxonomyJSON = `${binariesBaseDir}/taxonomy.json`;

const downloadAndroid = async ( argv ) => {
  const androidFlavor = argv.androidFlavor || "debug";
  const androidDestination = path.join(
    __dirname,
    "..",
    "android",
    "app",
    "src",
    androidFlavor,
    "assets",
    "camera"
  );

  const androidModel = path.join(
    androidDestination,
    `${cvModelFilename}.${androidExt}`
  );

  console.log( "Checking android model files..." );
  let exist = true;
  try {
    await fs.access( androidModel );
  } catch ( _ ) {
    exist = false;
  }

  if ( exist ) {
    console.log( "Android model exist!" );
    return;
  }

  console.log(
    `Android model files missing, downloading from '${binariesBaseDir}'...`
  );

  await fs.mkdir( androidDestination, { recursive: true } );

  const dl = new DownloaderHelper( androidCV, androidDestination );
  dl.on( "end", () => console.log( "Download Completed" ) );
  dl.on( "error", ( err ) => console.log( "Download Failed", err ) );
  await dl.start().catch( ( err ) => console.error( err ) );
  console.log( "Downloaded!" );
  const dl2 = new DownloaderHelper( androidGeo, androidDestination );
  dl2.on( "end", () => console.log( "Download Completed" ) );
  dl2.on( "error", ( err ) => console.log( "Download Failed", err ) );
  await dl2.start().catch( ( err ) => console.error( err ) );
  console.log( "Downloaded!" );
  const dl3 = new DownloaderHelper( taxonomyCSV, androidDestination );
  dl3.on( "end", () => console.log( "Download Completed" ) );
  dl3.on( "error", ( err ) => console.log( "Download Failed", err ) );
  await dl3.start().catch( ( err ) => console.error( err ) );
  console.log( "Downloaded!" );

  console.log( "Android done!" );
};

const downloadIOS = async () => {
  const iosDestination = path.join( __dirname, "..", "ios" );

  const iosModel = path.join( iosDestination, `${cvModelFilename}.${iosExt}` );

  console.log( "Checking ios model files..." );
  let exist = true;
  try {
    await fs.access( iosModel );
  } catch ( _ ) {
    exist = false;
  }

  if ( exist ) {
    console.log( "ios model exist!" );
    return;
  }

  console.log(
    `iOS Model files missing, downloading from '${binariesBaseDir}'...`
  );

  await fs.mkdir( iosDestination, { recursive: true } );

  const dl = new DownloaderHelper( iosCV, iosDestination, {
    fileName: "optimized_model_v2_13.mlmodel"
  } );
  dl.on( "end", () => console.log( "Download Completed" ) );
  dl.on( "error", ( err ) => console.log( "Download Failed", err ) );
  await dl.start().catch( ( err ) => console.error( err ) );
  console.log( "Downloaded!" );
  const dl2 = new DownloaderHelper( iosGeo, iosDestination, {
    fileName: "geomodel_v2_13.mlmodel"
  } );
  dl2.on( "end", () => console.log( "Download Completed" ) );
  dl2.on( "error", ( err ) => console.log( "Download Failed", err ) );
  await dl2.start().catch( ( err ) => console.error( err ) );
  console.log( "Downloaded!" );
  const dl3 = new DownloaderHelper( taxonomyJSON, iosDestination, {
    fileName: "taxonomy_v2_13.json"
  } );
  dl3.on( "end", () => console.log( "Download Completed" ) );
  dl3.on( "error", ( err ) => console.log( "Download Failed", err ) );
  await dl3.start().catch( ( err ) => console.error( err ) );
  console.log( "Downloaded!" );

  console.log( "iOS done!" );
};


yargs
  .usage( "Usage: $0 [args]" )
  .option( "androidFlavor", {
    alias: "f",
    type: "string",
    description: "Android flavor to download model files into"
  } )
  .command(
    "$0",
    "Download example model files if not present",

    () => {},
    async ( argv ) => {
      await downloadAndroid( argv );
      await downloadIOS();
    }
  )
  .help().argv;
