// @flow

import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";

import NavBar from "./NavBar";
import styles from "../styles/badges";

type Props = {
  navigation: any
}

class BadgesScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      badges: [{ id: 1, name: "bird" }, { id: 2, name: "quail" }]
    };
  }

  render() {
    const { badges } = this.state;
    const { navigation } = this.props;

    return (
      <View>
        <NavBar navigation={navigation} />
        <FlatList
          data={ badges }
          scrollEnabled={false}
          keyExtractor={ badge => badge.id }
          numColumns={ 3 }
          renderItem={ ( { item } ) => (
            <View style={ styles.gridCell }>
              <TouchableOpacity
                onPress={ console.log( "you clicked a badge" )}
              >
                <View style={ styles.gridCellContents }>
                  <Image
                    source={require( "../assets/taxa/icn-iconic-taxa-birds.png" )}
                  />
                  <View style={ styles.cellTitle }>
                    <Text style={ styles.cellTitleText }>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) }
        />
      </View>
    );
  }
}

export default BadgesScreen;
