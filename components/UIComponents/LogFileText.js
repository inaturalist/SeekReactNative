// @flow

import React, { useEffect } from "react";
import RNFS from "react-native-fs";
import { ScrollView } from "react-native";

import StyledText from "./StyledText";
import { pathLogs } from "../../utility/dirStorage";

type Props = {
  +navigation: any
};

const LogFileText = ( {}: Props ): React.Node => {
  const [logContents, setLogContents] = React.useState( "" );

  const { mtime: logFileMtime } = RNFS.stat( pathLogs );

  useEffect( () => {
    async function fetchLogContents() {
      const contents = await RNFS.readFile( pathLogs );
      setLogContents( contents.split( "\n" ).slice( -100 ).join( "\n" ) );
    }
    fetchLogContents();
  }, [logFileMtime] );

  return (
    <ScrollView>
      <StyledText>{logContents}</StyledText>
    </ScrollView>
  );
};

export default LogFileText;
