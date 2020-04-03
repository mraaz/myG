const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const mode = process.env.NODE_ENV == 'production' ? process.env.NODE_ENV : 'development'
const VENDOR_LIBS = ['redux', 'react-redux', 'react-dom']
const outputPath = path.resolve(__dirname, 'public/js/components')

module.exports = {
  entry: {
    mainApp: './resources/assets/js/mainApp/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    filename: '[name].js',
    path: outputPath,
    chunkFilename: '[id].[chunkhash].chunk.js',
  },
  devtool: mode == 'development' ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin({
      include: /\/includes/,
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    }),
  ],
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    occurrenceOrder: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          priority: 1,
          name: 'vendor',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true,
          warnings: false,
          output: {
            comments: false,
          },
        },
        sourceMap: true,
      }),
    ],
    removeAvailableModules: true,
  },
  mode,
}
