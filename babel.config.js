module.exports = ( api ) => {
  api.cache( true );

  const presets = [
    "module:metro-react-native-babel-preset",
    "@babel/flow"
  ];
  const plugins = [
    "transform-remove-console",
    "@babel/transform-flow-strip-types"
  ];

  return {
    presets,
    plugins
  };
};
