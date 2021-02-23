// @flow
import Realm from "realm";

import realmConfig from "./index";

// following the React example here:
// https://github.com/realm/realm-js/blob/master/examples/ReactExample/components/realm.js

// this involves less code since Realm.open( realmConfig ) doesn't need to be called
// every time we use realm in Seek
export default new Realm( realmConfig );
