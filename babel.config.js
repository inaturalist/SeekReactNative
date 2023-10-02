module.exports = ( api ) => {
  const presets = [
    "module:metro-react-native-babel-preset",
    "@babel/preset-flow"
  ];
  const plugins = [
    "react-native-worklets-core/plugin",
    "@babel/plugin-transform-flow-strip-types",
    [
      "module-resolver",
      {
        alias: {
          tests: "./tests"
        }
      }
    ],
    "react-native-reanimated/plugin"
    // Reanimated 2 plugin has to be listed last https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/
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
