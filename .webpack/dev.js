const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = function (options) {
  options.output.filename = '[name].js';
  options.devtool = 'cheap-module-source-map';
  options.plugins[0] = new ExtractTextPlugin("[name].css");
  return options;
};