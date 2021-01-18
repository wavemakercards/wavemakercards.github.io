
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../v4"),
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
  "devServer": {
    "public": "localhost:8080"
  },
  "transpileDependencies": [
    "vuetify"
  ],
  
  pluginOptions: {
    electronBuilder: {
       chainWebpackRendererProcess(config) {
        config.plugins.delete('workbox')
        config.plugins.delete('pwa')
      },
      builderOptions: {
        "fileAssociations": [
          {
            "ext": ".wm4",
            "name": "Wavemaker File",
            "role": "Editor",
            "perMachine": true
          }
        ]
      }
    }
  },
  pwa: {
    name: 'wavemaker4',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'sw.js',
      // ...other Workbox options...
    }
  }
  
}
