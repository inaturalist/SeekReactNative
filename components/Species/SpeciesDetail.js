import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

import NavBar from "../NavBar";

class SpeciesDetail extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <View>
        <NavBar />
        <Text>Species Detail page</Text>
        <ScrollView>
          <Text>Photo carousel</Text>
          <Text>About species</Text>
          <Text>Category</Text>
          <Text>Map of places seen</Text>
          <Text>Species Detail page</Text>
          <Text>Chart: best time to find it</Text>
          <Text>Longer about section</Text>
          <Text>Seen using iNaturalist stats</Text>
        </ScrollView>
        <TouchableOpacity>
          <Text>Found it!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SpeciesDetail;
