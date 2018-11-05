const uuid = require( "react-native-uuid" );

class ObservationRealm {
  get uuid() {
    const uuidString = uuid.v1();
    if ( uuidString ) {
      return uuidString;
    } else {
      return null;
    }
  }

  get pathForImage() {
    // look in directory for file path
  }

  get dateString() {
    // create a date string
  }

  get relativeDateString() {
    // create a relative date string
  }
}
ObservationRealm.schema = {
  name: "ObservationRealm",
  primaryKey: "uuidString",
  properties: {
    uuidString: { type: "string?", default: uuid() },
    date: "date?",
    taxon: { type: "TaxonRealm?" },
    latitude: { type: "float", default: 0.0 },
    longitude: { type: "float", default: 0.0 },
    placeName: "string?"
  }
};

export default ObservationRealm;
