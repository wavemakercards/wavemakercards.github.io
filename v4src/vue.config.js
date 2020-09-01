const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../v4"),
  "publicPath": "./",
  "devServer": {
    "public": "localhost:8080"
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
