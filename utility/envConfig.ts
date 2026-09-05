import config from "../config";

const PRODUCTION = {
  apiURL: "https://api.inaturalist.org/v1",
  writeApiURL: "https://www.inaturalist.org",
  apiHost: "https://api.inaturalist.org",
};

const STAGING = {
  apiURL: "https://stagingapi.inaturalist.org/v1",
  writeApiURL: "https://staging.inaturalist.org",
  apiHost: "https://stagingapi.inaturalist.org",
};

const urls = __DEV__ ? STAGING : PRODUCTION;

const EnvConfig = {
  ...urls,
  oauthApiURL: urls.writeApiURL,
  jwtSecret: __DEV__
    ? config.stagingJwtSecret || config.jwtSecret
    : config.jwtSecret,
  appId: __DEV__
    ? config.stagingAppId || config.appId
    : config.appId,
  appSecret: __DEV__
    ? config.stagingAppSecret || config.appSecret
    : config.appSecret,
};

export default EnvConfig;
