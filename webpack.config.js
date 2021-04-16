const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    amazon2roam: "./bookmarklets/amazon2roam/index.ts",
    article2roam: "./bookmarklets/article2roam/index.ts",
    gyazo2roam: "./bookmarklets/gyazo2roam/index.ts",
    kindle2roam: "./bookmarklets/kindle2roam/index.ts",
    youtube2roam: "./bookmarklets/youtube2roam/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
