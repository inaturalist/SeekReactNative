const mockFs = require( "fs" );

module.exports = {
  appendFile: jest.fn( ),
  CachesDirectoryPath: "caches/directory/path",
  DocumentDirectoryPath: "document/directory/path",
  TemporaryDirectoryPath: "temporary/directory/path",
  exists: jest.fn( async name => !name.includes( "sentinelFiles" ) ),
  moveFile: async ( ) => "testdata",
  copyFile: async ( ) => "testdata",
  copyAssetsFileIOS: async ( ) => "testdata",
  stat: jest.fn( ( ) => ( {
    mtime: new Date(),
  } ) ),
  readFile: jest.fn( ( ) => "testdata" ),
  readDir: jest.fn( async ( ) => ( [
    {
      ctime: new Date(),
      mtime: new Date(),
      name: "testdata",
    },
  ] ) ),
  writeFile: jest.fn( async ( filePath, contents, _encoding ) => {
    mockFs.writeFile( filePath, contents, jest.fn( ) );
  } ),
  mkdir: jest.fn( async ( filepath, _options ) => {
    mockFs.mkdir( filepath, jest.fn( ) );
  } ),
  unlink: jest.fn( async ( path = "" ) => {
    if ( !path ) return;
    if ( typeof ( path ) !== "string" ) return;
    mockFs.unlink( path, jest.fn( ) );
  } ),
};
