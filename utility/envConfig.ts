import config from "../config";

const PRODUCTION = {
  apiURL: "https://api.inaturalist.org/v1",
  writeApiURL: "https://www.inaturalist.org",
};

const STAGING = {
  apiURL: "https://stagingapi.inaturalist.org/v1",
  writeApiURL: "https://staging.inaturalist.org",
};

const urls = __DEV__ ? STAGING : PRODUCTION;

const EnvConfig = {
  ...urls,
  oauthApiURL: urls.writeApiURL,
  jwtSecret: __DEV__
    ? config.stagingJwtSecret || config.jwtSecret
    : config.jwtSecret,
};

export default EnvConfig;
