// @flow

import React from "react";

import {
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";

import styles from "../../styles/challenges";
import { capitalizeNames } from "../../utility/helpers";

type Props = {
  navigation: any,
  taxa: Array<Object>,
  latitude: number,
  location: string,
  longitude: number
}

const ChallengeGrid = ( {
  location,
  latitude,
  longitude,
  navigation,
  taxa
}: Props ) => (
  <View style={styles.taxonGrid}>
    <FlatList
      data={ taxa }
      scrollEnabled={false}
      keyExtractor={ taxon => taxon.id }
      numColumns={ 3 }
      renderItem={ ( { item } ) => (
        <View style={ styles.gridCell }>
          <TouchableOpacity
            onPress={ () => navigation.push( "Species", {
              id: item.id,
              latitude,
              longitude,
              location,
              seen: false
            } ) }
          >
            <View style={ styles.gridCellContents }>
              <Image
                style={ {
                  width: "100%",
                  aspectRatio: 1.1
                } }
                source={ { uri: item.default_photo.medium_url } }
              />
              <View style={ styles.cellTitle }>
                <Text numberOfLines={2} style={ styles.cellTitleText }>
                  { capitalizeNames( item.preferred_common_name || item.name ) }
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) }
    />
  </View>
);

export default ChallengeGrid;
