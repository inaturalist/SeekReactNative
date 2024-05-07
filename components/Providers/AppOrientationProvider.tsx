import * as React from "react";
import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";

const landscape = ( ) => {
  const dim = Dimensions.get( "screen" );
  return dim.width >= dim.height;
};

const AppOrientationContext = React.createContext<
  {
    isLandscape: boolean;
    isTablet: boolean | null;
    width: number;
    height: number;
  } | undefined
>( undefined );
type AppOrientationProviderProps = {children: React.ReactNode}
const AppOrientationProvider = ( { children }: AppOrientationProviderProps ) => {
  const [isLandscape, setIsLandscape] = React.useState( landscape );
  const [isTablet, setIsTablet] = React.useState<boolean | null>( null );

  const dim = Dimensions.get( "screen" );

  React.useEffect( ( ) => {
    const tablet = async ( ) => setIsTablet( await DeviceInfo.isTablet( ) );
    // adapted from https://adrianhall.github.io/react%20native/2017/07/26/handling-orientation-changes-in-react-native/
    Dimensions.addEventListener( "change", ( ) => {
      setIsLandscape( landscape );
    } );
    tablet( );
  }, [] );

  const value = {
    isLandscape,
    isTablet,
    width: dim.width,
    height: dim.height
  };

  return (
    <AppOrientationContext.Provider value={value}>{children}</AppOrientationContext.Provider>
  );
};

function useAppOrientation() {
  const context = React.useContext( AppOrientationContext );
  if ( context === undefined ) {
    throw new Error( "useAppOrientation must be used within a AppOrientationProvider" );
  }
  return context;
}

export {
  AppOrientationProvider,
  useAppOrientation
};
