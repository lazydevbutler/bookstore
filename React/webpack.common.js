const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const buildPath = resolve(__dirname, "build");
const path = require("path");
const fs = require("fs");

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = currentPath + "/.env";

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = currentPath + `/.${env.ENVIRONMENT}.env`;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  return {
    entry: "./src/index.tsx",
    output: {
      path: buildPath,
      filename: "bundle.[fullhash].js",
      publicPath: "/",
    },
    resolve: {
      modules: [resolve("./src"), resolve("./node_modules")],
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    // node: {
    //   fs: "empty",
    // },

    plugins: [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ["build"],
      }),
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./src/images/favicon.ico",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.jsx/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.ts?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
