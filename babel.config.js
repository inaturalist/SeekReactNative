module.exports = ( api ) => {
  const presets = [
    "module:metro-react-native-babel-preset",
    "@babel/preset-flow"
  ];
  const plugins = [
    "@babel/plugin-transform-flow-strip-types",
    "react-native-reanimated/plugin" // Reanimated 2 plugin has to be listed last
  ];
  const productionPlugins = ["transform-remove-console"].concat( plugins );

  if ( api.env( "production" ) ) {
    return {
      presets,
      plugins: productionPlugins
    };
  }
  return {
    presets,
    plugins
  };
};
