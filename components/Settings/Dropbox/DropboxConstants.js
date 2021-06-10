// from https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE

export const DROPBOX = {
  AUTHORIZE_URL: "https://www.dropbox.com/oauth2/authorize",
  GET_METADATA_URL: "https://api.dropboxapi.com/2/files/get_metadata",
  REVOKE_TOKEN_URL: "https://api.dropboxapi.com/2/auth/token/revoke",
  UPLOAD_URL: "https://content.dropboxapi.com/2/files/upload",
  DOWNLOAD_URL: "https://content.dropboxapi.com/2/files/download",
  API_RESULT_HEADER_NAME: "dropbox-api-result",
  CLIENT_MODIFIED_TIMESTAMP_KEY: "client_modified",
  ACCESS_TOKEN_STORAGE_KEY: "dropbox:token",
  ACCOUNT_ID_STORAGE_KEY: "dropbox:accountId",
  MOST_RECENT_BACKUP_TIMESTAMP_KEY: "dropbox:mostRecentBackupTimestamp",
  LAST_UPDATE_STATUS_KEY: "dropbox:lastUpdateStatus",
  UPDATE_STATUS_STARTED: "updateStarted",
  UPDATE_STATUS_FINISHED: "updateFinished",
  NO_SUCH_FILE_ERROR_SUBSTRING:
    "couldn’t be opened because there is no such file"
};
