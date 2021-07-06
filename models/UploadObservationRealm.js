class UploadObservationRealm {}
UploadObservationRealm.schema = {
  name: "UploadObservationRealm",
  primaryKey: "uuid",
  properties: {
    uuid: "string",
    observed_on_string: "string?",
    taxon_id: "int?",
    geoprivacy: "string",
    captive_flag: "bool",
    place_guess: "string?",
    latitude: "float?",
    longitude: "float?",
    positional_accuracy: "int?",
    description: "string?",
    photo: "UploadPhotoRealm",
    vision: "bool"
  }
};

export default UploadObservationRealm;
