// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { NavigationEvents } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/results/results";
import { fetchPostingSuccess } from "../../utility/loginHelpers";

type Props = {
  navigation: any,
  color: string,
  taxaInfo: Object
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
      this.setState( { postingSuccess: true } );
    }
  }

  render() {
    const { navigation, color, taxaInfo } = this.props;
    const { postingSuccess } = this.state;

    return (
      <View>
        <NavigationEvents
          onWillFocus={() => {
            this.fetchPostingStatus();
          }}
        />
        {postingSuccess
          ? null
          : (
            <View>
              <Text style={styles.text}>
                {i18n.t( "results.post_inat" )}
              </Text>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: color }]}
                onPress={() => navigation.navigate( "Post", taxaInfo )}
              >
                <Text style={styles.buttonText}>
                  {i18n.t( "results.post" ).toLocaleUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  }
}

export default PostToiNat;
