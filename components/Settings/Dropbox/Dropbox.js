import React from "react";
import { Text } from "react-native";

import useAuthorizeDropbox from "./hooks/dropboxHooks";

const Dropbox = ( ) => {
  const { isAuthorized } = useAuthorizeDropbox( );

  return <Text>dropbox</Text>;
};

export default Dropbox;
