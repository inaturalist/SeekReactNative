// import "./wdyr";
import "react-native-gesture-handler";

import inatjs from "inaturalistjs";
import * as React from "react";
import { AppRegistry } from "react-native";
import SeekApp from "./components/App";
import { name as appName } from "./app.json";
import createUserAgent from "./utility/userAgent";

inatjs.setConfig( {
  userAgent: createUserAgent( )
} );

const App = ( ) => (
  <SeekApp />
);

AppRegistry.registerComponent( appName, () => App );
