import React, { useEffect, useCallback, useMemo } from "react";
import { Image, ScrollView, Platform } from "react-native";

type Props = {
  image: String,
  size: Object,
  onTransformDataChange: Function
}

const ImageCropper = ( {
  image,
  size,
  onTransformDataChange
}: Props ) => {
  const scaledImageSize = useMemo( ( ) => {
    const widthRatio = image.width / size.width;

    return {
      width: size.width,
      height: image.height / widthRatio
    };
}, [image.height, image.width, size.width] );

  if ( Platform.OS === "android" ) {
    console.log( "dealing with vertical scroll" );
    // hack to work around Android ScrollView a) not supporting zoom, and
    // b) not supporting vertical scrolling when nested inside another
    // vertical ScrollView (which it is, when displayed inside UIExplorer)
    scaledImageSize.width *= 2;
    scaledImageSize.height *= 2;
  }

  const contentOffset = useMemo( ( ) => {
    return {
      x: ( scaledImageSize.width - size.width ) / 2,
      y: ( scaledImageSize.height - size.height ) / 2
    };
  }, [scaledImageSize, size] );

  const maximumZoomScale = Math.min(
    image.width / scaledImageSize.width,
    image.height / scaledImageSize.height,
  );

  const minimumZoomScale = Math.max(
    size.width / scaledImageSize.width,
    size.height / scaledImageSize.height,
  );

  const onScroll = ( e ) => {
    const { nativeEvent } = e;
    updateTransformData(
      nativeEvent.contentOffset,
      nativeEvent.contentSize,
      nativeEvent.layoutMeasurement,
    );
  };

  const updateTransformData = useCallback( ( offset, scaled, croppedImageSize ) => {
    const offsetRatioX = offset.x / scaled.width;
    const offsetRatioY = offset.y / scaled.height;
    const sizeRatioX = croppedImageSize.width / scaled.width;
    const sizeRatioY = croppedImageSize.height / scaled.height;

    const cropData = {
      offset: {
        x: image.width * offsetRatioX,
        y: image.height * offsetRatioY
      },
      size: {
        width: image.width * sizeRatioX,
        height: image.height * sizeRatioY
      }
    };
    onTransformDataChange && onTransformDataChange( cropData );
  }, [image.height, image.width, onTransformDataChange] );

  useEffect( ( ) => {
    updateTransformData(
      contentOffset,
      scaledImageSize,
      size,
    );
  }, [contentOffset, scaledImageSize, size, updateTransformData] );

  return (
    <ScrollView
      alwaysBounceVertical={true}
      automaticallyAdjustContentInsets={false}
      contentOffset={contentOffset}
      decelerationRate="fast"
      horizontal
      maximumZoomScale={maximumZoomScale}
      minimumZoomScale={minimumZoomScale}
      onMomentumScrollEnd={onScroll}
      onScrollEndDrag={onScroll}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      // style={style}
      scrollEventThrottle={16}>
      <Image
        source={image}
        style={scaledImageSize}
      />
    </ScrollView>
  );
};

export default ImageCropper;
