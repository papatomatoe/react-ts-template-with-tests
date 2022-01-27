const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { version } = require('./package.json');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `v${version}__bundle.js`,
  },
  devServer: {
    historyApiFallback: true,
    port: '8000',
    hot: true,
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      styles: path.resolve(__dirname, 'src/styles'),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: 'body',
      template: './src/public/index.html',
      title: 'React App',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                mode: 'pure',
                localIdentName: '[name]__[local]--[hash:base64:8]',
              },
            },
          },
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(j|t)sx?$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
