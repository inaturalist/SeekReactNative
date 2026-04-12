import React, { useEffect } from "react";
import { stat, readFile } from "@dr.pogodin/react-native-fs";
import { ScrollView } from "react-native";

import StyledText from "./StyledText";
import { pathLogs } from "../../utility/dirStorage";

interface Props {
  navigation: any;
}

const LogFileText = ( {}: Props ) => {
  const [logContents, setLogContents] = React.useState( "" );

  const { mtime: logFileMtime } = stat( pathLogs );

  useEffect( () => {
    async function fetchLogContents() {
      const contents = await readFile( pathLogs );
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
