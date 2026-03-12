module.exports = ( api ) => {
  const presets = [
    "module:@react-native/babel-preset",
  ];
  const plugins = [
    "babel-plugin-react-compiler", // must run first!
    "react-native-worklets-core/plugin",
    [
      "module-resolver",
      {
        alias: {
          tests: "./tests",
        },
      },
    ],
    // Reanimated 4: use worklets plugin (must be listed last). See migration 3.x -> 4.x.
    "react-native-worklets/plugin",
  ];
  const productionPlugins = ["transform-remove-console"].concat( plugins );

  if ( api.env( "production" ) ) {
    return {
      presets,
      plugins: productionPlugins,
    };
  }
  return {
    presets,
    plugins,
  };
};
