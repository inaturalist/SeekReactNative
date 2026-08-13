import {
  appendFile,
  exists,
  mkdir,
  readDir,
  readFile,
  TemporaryDirectoryPath,
  unlink,
  writeFile,
} from "@dr.pogodin/react-native-fs";
import { useEffect, useState } from "react";
import {
  getBuildNumber,
  getSystemName,
  getVersion,
} from "react-native-device-info";
import Mailer from "react-native-mail";

import {
  legacyLogfilePath,
  logFileDirectory,
  logFileNamePrefix,
} from "../react-native-logs.config";

const getSortedDailyLogFileInfo = async ( n?: number ) => {
  const dir = await readDir( logFileDirectory );
  const sortedLogFiles = dir
    .filter( ( { name } ) => name.startsWith( logFileNamePrefix ) )
    .map( ( { name, size, path } ) => {
      // assumes log files will be prefix.yyyy-mm-dd.txt
      const dateString = name.split( "." )[1];
      const date = Date.parse( dateString );
      if ( isNaN( date ) ) {
        console.warn( `Unable to parse date from rolling logfile: ${path}` );
        return null;
      }
      return {
        name,
        path,
        size,
        date,
      };
    } )
    .filter( a => !!a )
    .sort( ( a, b ) => b.date - a.date );

  return n === undefined
    ? sortedLogFiles
    : sortedLogFiles.slice( 0, n );
};

export async function cleanupLogFiles() {
  if ( await exists( legacyLogfilePath ) ) {
    await unlink( legacyLogfilePath );
  }

  const logFileInfo = await getSortedDailyLogFileInfo();
  const olderLogs = logFileInfo.slice( 40 );
  await Promise.allSettled( olderLogs.map( ( { path } ) => unlink( path ) ) );
}

const appVersion = getVersion();
const buildVersion = getBuildNumber();
const device = getSystemName();
const emailParams = {
  subject: `Seek ${device} Logs (version ${appVersion} - ${buildVersion})`,
  recipients: ["help+seek@inaturalist.org"],
};

async function emailLogFile(
  path: string,
  onComplete?: ( error: string, event: string ) => void,
) {
  Mailer.mail(
    {
      ...emailParams,
      isHTML: true,
      attachments: [
        {
          path,
          mimeType: "text/plain",
        },
      ],
    },
    ( error, event ) => {
      if ( onComplete ) {
        onComplete( error, event );
      }
    },
  );
}

export const temporaryLogForSharingPath
  = `${TemporaryDirectoryPath}/${logFileNamePrefix}-recent.txt`;

const concatenateLogsForSharing = async () => {
  await writeFile( temporaryLogForSharingPath, "" );

  const mostRecentLogs = ( await getSortedDailyLogFileInfo( 20 ) )
    .reverse();

  for ( const { path } of mostRecentLogs ) {
     
    const chunkContents = await readFile( path );
     
    await appendFile( temporaryLogForSharingPath, chunkContents );
  }
};

export async function emailRecentLogs(
  onComplete?: ( error: string, event: string ) => void,
): Promise<void> {
  await concatenateLogsForSharing();
  return emailLogFile( temporaryLogForSharingPath, onComplete );
}

export async function ensureLogDirectory(): Promise<void> {
  const dirExists = await exists( logFileDirectory );
  if ( !dirExists ) {
    await mkdir( logFileDirectory );
  }
}

export function getTodayLogFilePath(): string {
  const now = new Date();
  const dateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  return `${logFileDirectory}/${logFileNamePrefix}.${dateString}.txt`;
}

interface LogPreview {
  text: string;
  length: number;
}

async function getRecentLogContentPreview() {
  const recentLogsPaths = ( await getSortedDailyLogFileInfo( 10 ) )
    .map( ( { path } ) => path )
    .reverse();

  let aggregatedContents = "";
  for ( const logPath of recentLogsPaths ) {
     
    const contents = await readFile( logPath );
    aggregatedContents += contents;
  }
  return aggregatedContents;
}

export function useLogPreview( ): LogPreview | null {
  const [logPreview, setLogPreview] = useState<LogPreview | null>( null );

  useEffect( ( ) => {
    const getLogPreview = async () => {
      const logContents = await getRecentLogContentPreview();

      const lines = logContents.split( "\n" );
      const trimmedContent = lines
        .slice( lines.length - 1000, lines.length )
        .join( "\n" );
      setLogPreview( { text: trimmedContent, length: lines.length } );
    };

    getLogPreview();
  }, [] );

  return logPreview;
}
