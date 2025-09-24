const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  // Prefer native entries; do NOT pick "browser" on native
  config.resolver.resolverMainFields = ['react-native', 'main'];
  return config;
})();
