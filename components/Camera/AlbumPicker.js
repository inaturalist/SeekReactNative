import React, { Component } from "react";
import {
  Text,
  Image,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import GalleryManager from "react-native-gallery-manager";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/camera/gallery";

type Props = {
  +updateAlbum: Function
}

class AlbumPicker extends Component<Props> {
  constructor() {
    super();

    this.state = {
      album: i18n.t( "gallery.camera_roll" ),
      albumNames: [{
        label: i18n.t( "gallery.camera_roll" ),
        value: "All"
      }]
    };
  }

  componentDidMount() {
    this.getAlbumNames();
  }

  getAlbumNames() {
    const { albumNames } = this.state;

    GalleryManager.getAlbums().then( ( results ) => {
      const { albums } = results;
      if ( albums && albums.length > 0 ) { // attempt to fix error on android
        albums.forEach( ( album ) => {
          const { assetCount, title } = album;

          if ( assetCount > 0 && title !== "Screenshots" ) { // remove screenshots from gallery
            albumNames.push( {
              label: title,
              value: title
            } );
          }
        } );
      }

      this.setState( { albumNames } );
    } ).catch( ( e ) => {
      this.setState( { albumNames } );
    } );
  }

  setAlbum( album ) {
    const { updateAlbum } = this.props;

    this.setState( { album } );
    updateAlbum( album );
  }

  render() {
    const { albumNames, album } = this.state;

    return (
      <RNPickerSelect
        hideIcon
        Icon={() => <Image source={icons.dropdownOpen} style={styles.margin} />}
        items={albumNames}
        onValueChange={( value ) => {
          this.setAlbum( value );
        }}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        value={album}
      >
        <View style={styles.row}>
          <Text style={styles.headerText}>
            {album === "All"
              ? i18n.t( "gallery.camera_roll" ).toLocaleUpperCase()
              : album.toLocaleUpperCase()}
          </Text>
          <Image source={icons.dropdownOpen} style={styles.margin} />
        </View>
      </RNPickerSelect>
    );
  }
}

export default AlbumPicker;
