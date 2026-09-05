import config from "../config";
const EnvConfig = {
  jwtSecret: __DEV__
    ? config.stagingJwtSecret || config.jwtSecret
    : config.jwtSecret,
};

export default EnvConfig;
