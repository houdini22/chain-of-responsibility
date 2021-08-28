const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["./examples/main.tsx"],
  output: {
    path: path.resolve("./dist"),
    filename: "example.js",
    libraryTarget: "commonjs",
  },
  resolve: {
    extensions: [".tsx"],
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  }
};
