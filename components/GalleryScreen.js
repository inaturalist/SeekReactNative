import React, { Component } from "react";

class GalleryScreen extends Component {
  constructor() {
    super();

    this.state = {
      photos: []
    };
  }

  getPhotos = () => {
    CameraRoll.getPhotos( {
      assetType: "Photos"
    } );
  }

  render() {
    return (
      <p>Gallery</p>
    );
  }
};

export default GalleryScreen;
