import React from "react";
import { Image, ScrollView, Platform } from "react-native";

class ImageCropper extends React.Component<$FlowFixMeProps, $FlowFixMeState> {
  _contentOffset: ImageOffset;
  _maximumZoomScale: number;
  _minimumZoomScale: number;
  _scaledImageSize: ImageSize;
  _horizontal: boolean;

  UNSAFE_componentWillMount() {
    // Scale an image to the minimum size that is large enough to completely
    // fill the crop box.
    const widthRatio = this.props.image.width / this.props.size.width;
    const heightRatio = this.props.image.height / this.props.size.height;
    this._horizontal = widthRatio > heightRatio;
    if ( this._horizontal ) {
      this._scaledImageSize = {
        width: this.props.image.width / heightRatio,
        height: this.props.size.height
      };
    } else {
      this._scaledImageSize = {
        width: this.props.size.width,
        height: this.props.image.height / widthRatio
      };
      if ( Platform.OS === "android" ) {
        console.log( "dealing with vertical scroll" );
        // hack to work around Android ScrollView a) not supporting zoom, and
        // b) not supporting vertical scrolling when nested inside another
        // vertical ScrollView (which it is, when displayed inside UIExplorer)
        this._scaledImageSize.width *= 2;
        this._scaledImageSize.height *= 2;
        this._horizontal = true;
      }
    }
    this._contentOffset = {
      x: ( this._scaledImageSize.width - this.props.size.width ) / 2,
      y: ( this._scaledImageSize.height - this.props.size.height ) / 2
    };
    this._maximumZoomScale = Math.min(
      this.props.image.width / this._scaledImageSize.width,
      this.props.image.height / this._scaledImageSize.height,
    );
    this._minimumZoomScale = Math.max(
      this.props.size.width / this._scaledImageSize.width,
      this.props.size.height / this._scaledImageSize.height,
    );
    this._updateTransformData(
      this._contentOffset,
      this._scaledImageSize,
      this.props.size,
    );
  }

  _onScroll( event ) {
    this._updateTransformData(
      event.nativeEvent.contentOffset,
      event.nativeEvent.contentSize,
      event.nativeEvent.layoutMeasurement,
    );
  }

  _updateTransformData( offset, scaledImageSize, croppedImageSize ) {
    const offsetRatioX = offset.x / scaledImageSize.width;
    const offsetRatioY = offset.y / scaledImageSize.height;
    const sizeRatioX = croppedImageSize.width / scaledImageSize.width;
    const sizeRatioY = croppedImageSize.height / scaledImageSize.height;

    const cropData: ImageCropData = {
      offset: {
        x: this.props.image.width * offsetRatioX,
        y: this.props.image.height * offsetRatioY
      },
      size: {
        width: this.props.image.width * sizeRatioX,
        height: this.props.image.height * sizeRatioY
      }
    };
    this.props.onTransformDataChange &&
      this.props.onTransformDataChange( cropData );
  }

  render() {
    return (
      <ScrollView
        alwaysBounceVertical
        automaticallyAdjustContentInsets={false}
        contentOffset={this._contentOffset}
        decelerationRate="fast"
        horizontal={this._horizontal}
        maximumZoomScale={this._maximumZoomScale}
        minimumZoomScale={this._minimumZoomScale}
        onMomentumScrollEnd={this._onScroll.bind( this )}
        onScrollEndDrag={this._onScroll.bind( this )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={this.props.style}
        scrollEventThrottle={16}
        nestedScrollEnabled>
        <Image
          source={this.props.image}
          style={this._scaledImageSize}
        />
      </ScrollView>
    );
  }
}

export default ImageCropper;
