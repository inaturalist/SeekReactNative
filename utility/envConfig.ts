import config from "../config";

const PRODUCTION = {
  writeApiURL: "https://www.inaturalist.org",
};

const STAGING = {
  writeApiURL: "https://staging.inaturalist.org",
};

const urls = __DEV__ ? STAGING : PRODUCTION;

const EnvConfig = {
  oauthApiURL: urls.writeApiURL,
  jwtSecret: __DEV__
    ? config.stagingJwtSecret || config.jwtSecret
    : config.jwtSecret,
};

export default EnvConfig;
