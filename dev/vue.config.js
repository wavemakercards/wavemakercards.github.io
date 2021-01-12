
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../v4"),
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './v4/',
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
  }
  
}
