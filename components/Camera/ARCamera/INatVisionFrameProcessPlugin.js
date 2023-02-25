// @flow

export function inatVision( frame, modelFilename, taxonomyFilename ) {
  "worklet";
  // __inatVision is defined in global in babel.config.js
  // eslint-disable-next-line no-undef
  return __inatVision( frame, modelFilename, taxonomyFilename );
}
