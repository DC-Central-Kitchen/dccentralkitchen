const { getDefaultConfig } = require('expo/metro-config');
const { resolve: defaultResolve } = require('metro-resolver');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Block web SDKs explicitly, including subpaths (firebase/app, firebase/auth, etc.)
config.resolver = {
  ...(config.resolver || {}),
  resolveRequest(context, moduleName, platform) {
    // Any import that starts with 'firebase/' (web SDK)
    if (moduleName === 'firebase' || moduleName.startsWith('firebase/')) {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'empty-mobile-firebase.js'),
      };
    }
    // Common web-only libs that sometimes sneak in
    const banned = new Set(['react-dom', 'react-modal', 'react-responsive-ui']);
    if (banned.has(moduleName)) {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'empty-mobile-web.js'),
      };
    }
    return defaultResolve(context, moduleName, platform);
  },
};

// Also keep your normal config:
module.exports = config;
