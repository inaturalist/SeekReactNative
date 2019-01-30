// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/camera/confirm";

type Props = {
  navigation: any
}

class ConfirmScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      image,
      time,
      latitude,
      longitude
    } = navigation.state.params;

    this.state = {
      image,
      time,
      latitude,
      longitude
    };
  }

  render() {
    const {
      image,
      time,
      latitude,
      longitude
    } = this.state;

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate( "Results", {
            image,
            time,
            latitude,
            longitude
          } )
        }
        >
          <Text style={styles.buttonText}>
            {i18n.t( "confirm.identify" ).toLocaleUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ConfirmScreen;
