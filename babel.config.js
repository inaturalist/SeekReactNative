module.exports = ( api ) => {
  api.cache.using( () => process.env.NODE_ENV );
  const isTest = api.env( "test" );

  /** @type {import('react-native-worklets/plugin').PluginOptions} */
  const workletsPluginOptions = {
    bundleMode: !isTest,
    strictGlobal: !isTest,
  };

  const presets = [
    "module:@react-native/babel-preset",
  ];
  const plugins = [
    "babel-plugin-react-compiler", // must run first!
    [
      "module-resolver",
      {
        alias: {
          tests: "./tests",
        },
      },
    ],
    // Reanimated 4: use worklets plugin (must be listed last). See migration 3.x -> 4.x.
    ["react-native-worklets/plugin", workletsPluginOptions],
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
