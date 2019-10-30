import React, { Component } from "react";
import {
  Text,
  Image,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/camera/gallery";

type Props = {
  +updateAlbum: Function,
  +albums: Array
}

class AlbumPicker extends Component<Props> {
  constructor( { albums }: Props ) {
    super();

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
        hideIcon
        Icon={() => <Image source={icons.dropdownOpen} style={styles.margin} />}
        items={albums}
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
