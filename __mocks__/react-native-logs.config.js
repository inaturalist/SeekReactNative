const noop = () => {};

const extendedLog = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
  debugWithExtra: noop,
  infoWithExtra: noop,
  warnWithExtra: noop,
  errorWithExtra: noop,
};

const log = {
  extend: jest.fn( () => extendedLog ),
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
};

module.exports = {
  log,
  legacyLogfilePath: "seek-log-legacy.txt",
  logFileNamePrefix: "seek-log",
  logFileDirectory: "logs",
};
