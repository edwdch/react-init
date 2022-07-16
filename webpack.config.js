const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Demo",
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        // js
        test: /\.js$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  helpers: true,
                  corejs: 3,
                  regenerator: true,
                },
              ],
            ],
          },
        },
      },
      {
        // images
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        // fonts
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      autoprefixer: {
                        flexbox: "no-2009",
                      },
                      stage: 3,
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true,
    compress: true,
    https: false,
    proxy: {
      "/api": "www.baidu.com",
    },
  },
};
