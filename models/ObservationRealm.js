class ObservationRealm {
  get uuid() {
    // set uuid string
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
    uuidString: "string?",
    date: "date?",
    taxon: { type: "TaxonRealm?" },
    latitude: { type: "float", default: 0.0 },
    longitude: { type: "float", default: 0.0 },
    placeName: "string?"
  }
};

export default ObservationRealm;
