import mockNodePath from "path";

export default ( {
  createResizedImage: jest.fn(
    async (
      path,
      _maxWidth,
      _maxHeight,
      _compressFormat,
      _quality,
      _rotation,
      outputPath,
    ) => {
      const filename = mockNodePath.basename( path );
      return { uri: mockNodePath.join( outputPath, filename ) };
    },
  ),
} );
