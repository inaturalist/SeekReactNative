import React, { Component } from "react";
import {
  ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, NativeModules
} from "react-native";

const ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "blue",
    marginBottom: 10
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  }
} );

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null
    };
  }

  pickSingleWithCamera( cropping ) {
    ImagePicker.openCamera( {
      cropping,
      width: 500,
      height: 500,
      includeExif: true
    } ).then( (image) => {
      console.log( "received image", image );
      this.setState( {
        image: { uri: image.path, width: image.width, height: image.height },
        images: null
      } );
    } ).catch( e => alert( e ) );
  }

  pickSingle( cropit, circular = false ) {
    ImagePicker.openPicker( {
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: "MediumQuality",
      includeExif: true
    } ).then( (image) => {
      console.log( "received image", image );
      this.setState( {
        image: { 
          uri: image.path, width: image.width, height: image.height, mime: image.mime
          },
        images: null
      } );
    } ).catch( (e) => {
      console.log( e );
      Alert.alert( e.message ? e.message : e );
    } );
  }

  renderImage( image ) {
    return <Image style={{ width: 300, height: 300, resizeMode: "contain" }} source={image} />;
  }

  renderAsset( image ) {
    if ( image.mime && image.mime.toLowerCase().indexOf( "video/" ) !== -1 ) {
      return this.renderVideo( image );
    }

    return this.renderImage( image );
  }

  render() {
    return ( 
<View style={styles.container}>
      <ScrollView>
        {this.state.image ? this.renderAsset(this.state.image) : null}
        {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
      </ScrollView>

      <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Camera With Cropping</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Cropping</Text>
      </TouchableOpacity>
    </View>
 );
  }
}

export default Gallery;
