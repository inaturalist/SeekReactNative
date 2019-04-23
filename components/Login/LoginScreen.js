// @flow

import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import GreenHeader from "../GreenHeader";
import { setIsLoggedIn } from "../../utility/helpers";

type Props = {
  navigation: any
}

class LoginScreen extends Component<Props> {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "" // don't actually store in state, this is a placeholder
    };
  }

  submit() {
    const { navigation } = this.props;
    // if user successfully logs in...
    setIsLoggedIn( true );
    navigation.navigate( "LoginSuccess" );
  }

  render() {
    const { username, password } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeViewTop} />
        <SafeAreaView style={styles.safeView}>
          <GreenHeader
            header={i18n.t( "login.log_in" ).toLocaleUpperCase()}
            navigation={navigation}
          />
          <KeyboardAvoidingView
            contentContainerStyle={[styles.innerContainer, Platform.OS === "ios" && { marginTop: 46 }]}
            behavior="position"
            enabled
          >
            <View style={styles.leftTextContainer}>
              <Text style={styles.leftText}>
                {i18n.t( "inat_login.username" ).toLocaleUpperCase()}
              </Text>
            </View>
            <TextInput
              style={styles.inputField}
              onChangeText={ value => this.setState( { username: value } )}
              value={username}
              placeholder={i18n.t( "inat_login.username" )}
              keyboardType={Platform.OS === "android" ? "visible-password" : "default"} // adding this to turn off autosuggestions on Android
              textContentType="username"
              autoFocus
            />
            <View style={styles.leftTextContainer}>
              <Text style={styles.leftText}>
                {i18n.t( "inat_login.password" ).toLocaleUpperCase()}
              </Text>
            </View>
            <TextInput
              style={styles.inputField}
              onChangeText={ value => this.setState( { password: value } )}
              value={password}
              secureTextEntry
              placeholder="*********"
              textContentType="password"
            />
            <View style={styles.rightTextContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate( "Forgot" )}
              >
                <Text style={styles.forgotPasswordText}>
                  {i18n.t( "inat_login.forgot_password" )}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.greenButton}
              onPress={() => this.submit()}
            >
              <Text style={styles.buttonText}>
                {i18n.t( "inat_login.log_in" ).toLocaleUpperCase()}
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  }
}

export default LoginScreen;
