module.exports = ( api ) => {
  const presets = [
    "module:metro-react-native-babel-preset",
    "@babel/preset-flow"
  ];
  const plugins = [
    "transform-remove-console",
    "@babel/plugin-transform-flow-strip-types",
    "plugin:react-native-a11y/all"
  ];

  if ( api.env( "production" ) ) {
    return {
      presets,
      plugins
    };
  }
  return {
    presets
  };
};
