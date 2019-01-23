// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView
} from "react-native";

import styles from "../../styles/challenges/challenges";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import ChallengeProgressCard from "./ChallengeProgressCard";
import Footer from "./ChallengeFooter";

type Props = {
  navigation: any
}

class ChallengeScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      challenges: [
        {
          title: i18n.t( "challenges.connectivity" ),
          message: i18n.t( "challenges.op_april" ),
          iconName: icons.badgePlaceholder,
          nextScreen: "Main",
          percentComplete: 62
        },
        {
          title: i18n.t( "challenges.biodiversity" ),
          message: i18n.t( "challenges.op_may" ),
          iconName: icons.badgePlaceholder,
          nextScreen: "Main",
          percentComplete: 0
        },
        {
          title: i18n.t( "challenges.productivity" ),
          message: i18n.t( "challenges.op_june" ),
          iconName: icons.badgePlaceholder,
          nextScreen: "Main",
          percentComplete: 25
        }
      ]
    };
  }

  render() {
    const { challenges } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.column}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {i18n.t( "challenges.in_progress" ).toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.challengesContainer}>
            <FlatList
              data={challenges}
              keyExtractor={( item, i ) => `${item}${i}`}
              renderItem={( { item } ) => (
                <ChallengeProgressCard item={item} navigation={navigation} />
              )}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {i18n.t( "challenges.not_started" ).toLocaleUpperCase()}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {i18n.t( "challenges.completed" ).toLocaleUpperCase()}
            </Text>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    );
  }
}

export default ChallengeScreen;
