// @flow

import React, { Component } from "react";
import {
  View,
  Text
} from "react-native";
import { NavigationEvents } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/results/results";
import { fetchPostingSuccess, savePostingSuccess } from "../../utility/loginHelpers";
import GreenButton from "../UIComponents/GreenButton";

type Props = {
  +navigation: any,
  +color: string,
  +taxaInfo: Object
}

class PostToiNat extends Component<Props> {
  constructor() {
    super();

    this.state = {
      postingSuccess: false
    };
  }

  async fetchPostingStatus() {
    const success = await fetchPostingSuccess();
    if ( success && success === "true" ) {
      this.setState( { postingSuccess: true }, () => savePostingSuccess( false ) );
    }
  }

  render() {
    const { navigation, color, taxaInfo } = this.props;
    const { postingSuccess } = this.state;

    const { latitude, longitude } = taxaInfo;

    return (
      <View>
        <NavigationEvents
          onWillFocus={() => {
            this.fetchPostingStatus();
          }}
        />
        {postingSuccess || !latitude || !longitude
          ? null
          : (
            <>
              <Text style={styles.text}>
                {i18n.t( "results.post_inat" )}
              </Text>
              <View style={styles.marginMedium} />
              <GreenButton
                color={color}
                handlePress={() => navigation.navigate( "Post", taxaInfo )}
                text={i18n.t( "results.post" )}
              />
            </>
          )}
      </View>
    );
  }
}

export default PostToiNat;
