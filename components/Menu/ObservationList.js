// @flow

import React from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/menu/observations";

type Props = {
  observations: Array<Object>,
  navigation: any
}

const ObservationList = ( { observations, navigation }: Props ) => (
  <FlatList
    data={observations}
    scrollEnabled={false}
    keyExtractor={t => t.taxon.id}
    numColumns={3}
    renderItem={( { item } ) => (
      <View style={styles.gridCell}>
        <TouchableOpacity
          onPress={ () => navigation.push( "Species", {
            id: item.taxon.id,
            commonName: item.taxon.preferredCommonName,
            scientificName: item.taxon.name
          } )}
        >
          <View style={styles.gridCellContents}>
            <Image
              style={ {
                width: "100%",
                aspectRatio: 1.1
              } }
              source={ { uri: item.taxon.defaultPhoto.squareUrl } }
            />
            <View style={ styles.cellTitle }>
              <Text style={ styles.cellTitleText } numberOfLines={2}>
                { item.taxon.preferredCommonName || item.taxon.name }
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    ) }
  />
);

export default ObservationList;
