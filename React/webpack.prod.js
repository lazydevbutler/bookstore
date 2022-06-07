const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = (env) => {
  const envCommon = common(env);
  return merge(envCommon, {
    mode: "production",
    entry: ["./src/index.tsx"],
    performance: { hints: false },
    plugins: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2015,
          compress: {
            defaults: true,
          },
        },
      }),
    ],
  });
};
