// Register the worklets mock before any setup file imports Reanimated or RN libraries
// that pull in react-native-worklets (Jest hoists jest.mock from all setupFiles).
jest.mock( "react-native-worklets", () =>
  require( "react-native-worklets/lib/module/mock" )
 );
