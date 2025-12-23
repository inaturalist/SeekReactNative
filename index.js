// import "./wdyr";
import "react-native-gesture-handler";

// Recommendation from the uuid library is to import get-random-values before
// uuid, so we're importing it first thing in the entry point.
// https://www.npmjs.com/package/uuid#react-native--expo
import "react-native-get-random-values";

import inatjs from "inaturalistjs";
import * as React from "react";
import { AppRegistry } from "react-native";
import SeekApp from "./components/App";
import { name as appName } from "./app.json";
import createUserAgent from "./utility/userAgent";

inatjs.setConfig( {
  userAgent: createUserAgent( ),
} );

const App = ( ) => (
  <SeekApp />
);

AppRegistry.registerComponent( appName, () => App );
