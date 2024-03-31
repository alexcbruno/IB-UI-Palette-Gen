const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./code.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "code.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Handle HTML files
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    // ProvidePlugin can automatically load modules instead of having to import or require them everywhere.
    new webpack.ProvidePlugin({
      Color: ["color", "default"],
    }),
  ],
  resolve: {
    fallback: {
      fs: false,
    },
  },
};
