const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver = config.resolver || {};
  // Force native bundle of styled-components
  config.resolver.alias = {
    ...(config.resolver.alias || {}),
    'styled-components': 'styled-components/native',
  };
  return config;
})();
