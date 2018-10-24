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

type Props = {
  navigation: any,
  capitalizeNames: Function,
  taxa: Array<Object>
}

const ChallengeGrid = ( { navigation, taxa, capitalizeNames }: Props ) => (
  <View style={styles.taxonGrid}>
    <FlatList
      data={ taxa }
      scrollEnabled={false}
      keyExtractor={ taxon => taxon.id }
      numColumns={ 3 }
      renderItem={ ( { item } ) => (
        <View style={ styles.gridCell }>
          <TouchableOpacity
            onPress={ ( ) => navigation.navigate( "Species" ) }
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
                <Text style={ styles.cellTitleText }>
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
