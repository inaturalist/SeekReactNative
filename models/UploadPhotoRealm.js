class UploadPhotoRealm {}
UploadPhotoRealm.schema = {
  name: "UploadPhotoRealm",
  primaryKey: "id",
  properties: {
    id: "int", // this is the observation id
    uri: "string", // the image saved to the user's camera roll
    uploadSucceeded: { type: "bool", default: false },
    uuid: "string"
    // observation_uuid (vs. photo uuid)
    // observed_on_string
    // taxon_id
    // geoprivacy
    // captive
    // place_guess
    // latitude
    // longitude
    // positional_accuracy
    // description (i.e. notes)
    // upload_succeeded
    // is it better to split this into separate UploadObservationRealm for clarity?
  }
};

export default UploadPhotoRealm;

// will need to create new json web token

// this can be any photo, not only species level observation
