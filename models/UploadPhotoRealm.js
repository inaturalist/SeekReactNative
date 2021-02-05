class UploadPhotoRealm {}
UploadPhotoRealm.schema = {
  name: "UploadPhotoRealm",
  primaryKey: "id",
  properties: {
    id: "int", // this is the observation id
    uri: "string", // the image saved to the user's camera roll
    uploadSucceeded: { type: "bool", default: false },
    uuid: "string"
  }
};

export default UploadPhotoRealm;

// will need to create new json web token

// this can be any photo, not only species level observation
