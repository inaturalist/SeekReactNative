// @flow
import AsyncStorage from "@react-native-community/async-storage";

const toggleScientificNames = ( boolean ) => {
  AsyncStorage.setItem( "scientific_names", boolean.toString() );
};

const getScientificNames = async () => {
  try {
    const scientificNames = await AsyncStorage.getItem( "scientific_names" );
    if ( scientificNames === null || scientificNames === "false" ) {
      return false;
    }
    return true;
  } catch ( error ) {
    return false;
  }
};

export {
  toggleScientificNames,
  getScientificNames
};
