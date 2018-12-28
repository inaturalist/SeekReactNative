/** @format */

import React from "react";
import { AppRegistry } from "react-native";
import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers
} from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import SeekApp from "./containers/AppContainer";
import speciesNearbyReducer from "./ducks/speciesNearby";
import { name as appName } from "./app.json";

const rootReducer = combineReducers( {
  species_nearby: speciesNearbyReducer
} );

const store = createStore(
  rootReducer,
  compose( applyMiddleware( thunkMiddleware ) )
);

const App = ( ) => (
  <Provider store={store}>
    <SeekApp />
  </Provider>
);

AppRegistry.registerComponent( appName, () => App );
