class UploadPhotoRealm {}
UploadPhotoRealm.schema = {
  name: "UploadPhotoRealm",
  properties: {
    id: "int?", // this is the observation id
    uri: "string", // the image saved to the user's camera roll
    uploadSucceeded: { type: "bool", default: false },
    uuid: "string?",
    notificationShown: { type: "bool", default: false }
  }
};

export default UploadPhotoRealm;
