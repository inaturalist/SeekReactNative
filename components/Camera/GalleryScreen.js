// @flow

import React from "react";
import {
  Image,
  ScrollView,
  TouchableHighlight,
  View
} from "react-native";

import LoadingWheel from "../LoadingWheel";
import styles from "../../styles/gallery";

type Props = {
  loading: boolean,
  photos: Array<Object>,
  selectImage: Function
}

const GalleryScreen = ( {
  loading,
  photos,
  selectImage
}: Props ) => (
  <View style={styles.gallery}>
    {loading ? <LoadingWheel /> : (
      <ScrollView contentContainerStyle={styles.container}>
        {
          photos.map( ( p, i ) => {
            return (
              <TouchableHighlight
                style={styles.button}
                key={i.toString()}
                underlayColor="transparent"
                onPress={() => {
                  selectImage( p.node.image, p.node.timestamp, p.node.location );
                }}
              >
                <Image
                  style={styles.image}
                  source={{ uri: p.node.image.uri }}
                />
              </TouchableHighlight>
            );
          } )
        }
      </ScrollView>
    ) }
  </View>
);

export default GalleryScreen;
