import { readFile, stat } from "@dr.pogodin/react-native-fs";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";

import { pathLogs } from "../../utility/dirStorage";
import StyledText from "./StyledText";

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
