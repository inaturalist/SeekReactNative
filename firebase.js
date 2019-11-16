
import { firebase } from "@react-native-firebase/crashlytics";
import firebaseConfig from "./firebase-config";
import { fetchAccessToken } from "./utility/loginHelpers";

const initializeFirebase = async () => {
  await firebase.crashlytics().setCrashlyticsCollectionEnabled( false );
  firebase.initializeApp( firebaseConfig )
    .then( app => console.log( "initialized apps ->", app ) )
    .catch( e => console.log( e, "couldn't initialize" ) );
};

const checkForLoggedInUser = async () => {
  const loggedIn = await fetchAccessToken();

  if ( loggedIn ) {
    await firebase.crashlytics().setCrashlyticsCollectionEnabled( true );
    // set crash reporting for logged in users on app launch
    // const enabled = firebase.crashlytics().isCrashlyticsCollectionEnabled;
    // console.log( enabled, "is enabled" );
  } else {
    await firebase.crashlytics().setCrashlyticsCollectionEnabled( false );
    // const enabled = firebase.crashlytics().isCrashlyticsCollectionEnabled;
    // console.log( enabled, "is disabled" );
  }
};

checkForLoggedInUser();

export default initializeFirebase;
