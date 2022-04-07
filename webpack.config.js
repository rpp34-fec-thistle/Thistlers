const path = require("path");

module.exports = {
  entry: "./client/src/index.jsx",
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client/public')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[hash]-[name].[ext]'
        }
      }
    ]
  }
};