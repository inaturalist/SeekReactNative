class ObservationRealm {}
ObservationRealm.schema = {
  name: "ObservationRealm",
  primaryKey: "uuidString",
  properties: {
    uuidString: "string?",
    date: "date",
    taxon: { type: "TaxonRealm" },
    latitude: "float",
    longitude: "float",
    placeName: "string?"
  }
};

export default ObservationRealm;
