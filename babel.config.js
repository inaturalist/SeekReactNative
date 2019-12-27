module.exports = ( api ) => {
  api.cache( true );

  const presets = [
    "module:metro-react-native-babel-preset",
    "@babel/flow",
    "@babel/preset-env"
  ];
  const plugins = [
    "transform-remove-console",
    "@babel/transform-flow-strip-types",
    "@babel/plugin-proposal-class-properties"
  ];

  return {
    presets,
    plugins
  };
};
