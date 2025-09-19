// plugins/ios-podfile-mods.js
const { withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withIosPodfileMods(config) {
  return withDangerousMod(config, [
    'ios',
    async (cfg) => {
      const podfilePath = path.join(
        cfg.modRequest.platformProjectRoot,
        'Podfile'
      );
      let src = await fs.promises.readFile(podfilePath, 'utf8');

      // Ensure global modular headers after the install! line
      if (!src.includes('use_modular_headers!')) {
        src = src.replace(
          /install! 'cocoapods',[^\n]*\n/,
          (m) => m + 'use_modular_headers!\n'
        );
      }

      // Force static frameworks
      src = src.replace(/use_frameworks![^\n]*\n/g, ''); // remove any existing lines
      src = src.replace(
        /target 'HealthyCorners' do/,
        "target 'HealthyCorners' do\n  use_frameworks! :linkage => :static"
      );

      // Add modular headers for Firebase deps if missing
      if (!src.includes("pod 'GoogleUtilities', :modular_headers => true")) {
        src = src.replace(
          /use_react_native!\([\s\S]*?\)\n/,
          (m) =>
            m +
            "  pod 'GoogleUtilities', :modular_headers => true\n  pod 'PromisesObjC', :modular_headers => true\n"
        );
      }

      await fs.promises.writeFile(podfilePath, src);
      return cfg;
    },
  ]);
};
