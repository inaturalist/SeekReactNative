// @flow

import React, { Component } from "react";
import {
  View,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/home/home";
import SpeciesNearby from "./SpeciesNearby";
import GetStarted from "../Modals/GetStarted";
import ChallengeCard from "./ChallengeCard";
import Padding from "../UIComponents/Padding";
import { checkIfCardShown } from "../../utility/helpers";
import Spacer from "../UIComponents/iOSSpacer";
import SafeAreaView from "../UIComponents/SafeAreaView";
import RNModal from "../UIComponents/Modal";

type Props = {}

type State = {
  showModal: boolean
}

class HomeScreen extends Component<Props, State> {
  scrollView: ?any

  constructor() {
    super();

    this.state = {
      showModal: false
    };

    ( this:any ).closeModal = this.closeModal.bind( this );
  }

  openModal() {
    this.setState( { showModal: true } );
  }

  closeModal() {
    this.setState( { showModal: false } );
  }

  async checkForFirstLaunch() {
    const isFirstLaunch = await checkIfCardShown();
    if ( isFirstLaunch ) {
      this.openModal();
    }
  }

  scrollToTop() {
    if ( this.scrollView ) {
      this.scrollView.scrollTo( {
        x: 0, y: 0, animated: Platform.OS === "android"
      } );
    }
  }

  render() {
    const { showModal } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView />
        <NavigationEvents
          onWillBlur={() => this.scrollToTop()}
          onWillFocus={() => this.checkForFirstLaunch()}
        />
        <RNModal
          showModal={showModal}
          closeModal={this.closeModal}
          modal={<GetStarted closeModal={this.closeModal} />}
        />
        <ScrollView
          ref={( ref ) => { this.scrollView = ref; }}
        >
          {Platform.OS === "ios" && <Spacer />}
          <SpeciesNearby />
          <ChallengeCard />
          <Padding />
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;
