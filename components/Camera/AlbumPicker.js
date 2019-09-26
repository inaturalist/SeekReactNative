import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/camera/gallery";

const pickerSelectStyles = StyleSheet.create( {
  inputIOS: styles.headerText,
  inputAndroid: styles.headerText
} );

type Props = {
  updateAlbum: Function,
  albums: Array
}

class AlbumPicker extends Component<Props> {
  constructor( { albums }: Props ) {
    super();

    this.inputRefs = {};

    this.state = {
      album: i18n.t( "gallery.camera_roll" ),
      albums
    };
  }

  setAlbum( album ) {
    const { updateAlbum } = this.props;

    this.setState( { album } );
    updateAlbum( album );
  }

  render() {
    const { albums, album } = this.state;

    return (
      <RNPickerSelect
        placeholder={{}}
        hideIcon
        items={albums}
        onValueChange={( value ) => {
          this.setAlbum( value );
        }}
        style={{ ...pickerSelectStyles }}
        value={album}
        ref={( el ) => {
          this.inputRefs.picker2 = el;
        }}
        useNativeAndroidPickerStyle={false}
      >
        <TouchableOpacity
          style={styles.row}
        >
          <Text style={styles.headerText}>
            {album === "All"
              ? i18n.t( "gallery.camera_roll" ).toLocaleUpperCase()
              : album.toLocaleUpperCase()
            }
          </Text>
          <Image source={icons.dropdownOpen} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </RNPickerSelect>
    );
  }
}

export default AlbumPicker;
