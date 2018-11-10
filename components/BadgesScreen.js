// @flow

import React, { Component } from "react";
import { View, Text } from "react-native";

import NavBar from "./NavBar";

type Props = {
  navigation: any
}

class BadgesScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      badges: []
    };
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <NavBar navigation={navigation} />
        <Text>these are badges</Text>
      </View>
    );
  }
}

export default BadgesScreen;
