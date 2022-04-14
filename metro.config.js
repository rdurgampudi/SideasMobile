/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const defaultSourceExts =
  require('metro-config/src/defaults/defaults').sourceExts;

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: process.env.RN_SRC_EXT
      ? [...process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts), 'cjs'] // <-- cjs added here
      : [...defaultSourceExts, 'cjs'], // <-- cjs added here
  },
};
//const { getDefaultConfig } = require("metro-config");

// module.exports = (async () => {
//     const {
//         resolver: { sourceExts, assetExts }
//     } = await getDefaultConfig();
//     return {
//         transformer: {
//             babelTransformerPath: require.resolve("react-native-svg-transformer")
//         },
//         resolver: {
//             assetExts: assetExts.filter(ext => ext !== "svg"),
//             sourceExts: [...sourceExts, "svg"]
//         }
//     };
// })();

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    svgAssetPlugin: {
      pngCacheDir: '.png-cache',
      // scales: [1, 2, 3,4],
      output: {
        compressionLevel: 9,
      },
    },
    assetPlugins: ['react-native-svg-asset-plugin'],
  },
  resolver: {
    sourceExts: process.env.RN_SRC_EXT
      ? [...process.env.RN_SRC_EXT.split(',').concat(defaultSourceExts), 'cjs'] // <-- cjs added here
      : [...defaultSourceExts, 'cjs'], // <-- cjs added here
  },
};
