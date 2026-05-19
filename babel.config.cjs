module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      ['@tamagui/babel-plugin', {
        config: './src/tamagui.config.ts',
        components: ['tamagui'],
      }],
      // reanimated plugin must be last
      'react-native-reanimated/plugin',
    ],
  };
};
