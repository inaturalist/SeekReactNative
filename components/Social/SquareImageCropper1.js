import React from "react";
import {
  Image,
  ScrollView,
  View,
  Platform
} from "react-native";
import ImageEditor from "@react-native-community/image-editor";

import styles from "../../styles/social/squareImageCropper";

const DEFAULT_IMAGE_HEIGHT = 720;
const DEFAULT_IMAGE_WIDTH = 1080;

type ImageOffset = {|
  x: number,
  y: number,
|};

type ImageSize = {|
  width: number,
  height: number,
|};

type ImageCropData = {|
  offset: ImageOffset,
  size: ImageSize,
  displaySize?: ?ImageSize,
  resizeMode?: ?any,
|};

export default class SquareImageCropper extends React.Component<
  $FlowFixMeProps,
  $FlowFixMeState,
> {
  state: any;
  _isMounted: boolean;
  _transformData: ImageCropData;

  /* $FlowFixMe(>=0.85.0 site=react_native_fb) This comment suppresses an error
   * found when Flow v0.85 was deployed. To see the error, delete this comment
   * and run Flow. */
  constructor( props ) {
    super( props );
    this._isMounted = true;
    this.state = {
      photo: {
        uri: `https://source.unsplash.com/2Ts5HnA67k8/${DEFAULT_IMAGE_WIDTH}x${DEFAULT_IMAGE_HEIGHT}`,
        height: DEFAULT_IMAGE_HEIGHT,
        width: DEFAULT_IMAGE_WIDTH
      },
      measuredSize: null,
      croppedImageURI: null,
      cropError: null
    };
  }

  render() {
    if ( !this.state.measuredSize ) {
      return (
        <View
          style={styles.container}
          onLayout={event => {
            const measuredWidth = event.nativeEvent.layout.width;
            if ( !measuredWidth ) {
              return;
            }
            this.setState( {
              measuredSize: {width: measuredWidth, height: measuredWidth}
            } );
          }}
        />
      );
    }

    if ( !this.state.croppedImageURI ) {
      return this._renderImageCropper();
    }
    return this._renderCroppedImage();
  }

  _renderImageCropper() {
    if ( !this.state.photo ) {
      return <View style={styles.container} />;
    }
    return (
      <View style={styles.container}>
        <ImageCropper
          image={this.state.photo}
          size={this.state.measuredSize}
          style={[styles.imageCropper, this.state.measuredSize]}
          onTransformDataChange={data => ( this._transformData = data )}
        />
      </View>
    );
  }

  _renderCroppedImage() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.state.croppedImageURI}}
          style={[styles.imageCropper, this.state.measuredSize]}
        />
      </View>
    );
  }

  async _crop() {
    try {
      const croppedImageURI = await ImageEditor.cropImage(
        this.state.photo.uri,
        this._transformData,
      );

      if ( croppedImageURI ) {
        this.setState( {croppedImageURI} );
      }
    } catch ( cropError ) {
      this.setState( {cropError} );
    }
  }

  _reset() {
    this.setState( {
      croppedImageURI: null,
      cropError: null
    } );
  }
}

