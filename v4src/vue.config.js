const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../v4"),
  "publicPath": "./",
  "devServer": {
    "public": "localhost:8080"
  },
  "transpileDependencies": [
    "vuetify"
  ],
  /*
  pluginOptions: {
    electronBuilder: {
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
  */
}
