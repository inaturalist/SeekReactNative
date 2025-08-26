module.exports = ( api ) => {
  const presets = [
    "module:@react-native/babel-preset"
  ];
  const plugins = [
    "babel-plugin-react-compiler", // must run first!
    "react-native-worklets-core/plugin",
    [
      "module-resolver",
      {
        alias: {
          tests: "./tests"
        }
      }
    ],
    // Reanimated 2 plugin has to be listed last https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/
    // processNestedWorklets is required for vision-camera together with reanimated to work
    [
      "react-native-reanimated/plugin",
      {
        processNestedWorklets: true
      }
    ]
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
