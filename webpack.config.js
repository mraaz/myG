const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const mode = 'production' // process.env.NODE_ENV == 'production' ? process.env.NODE_ENV : 'development'
const VENDOR_LIBS = [
  'redux',
  'react-redux',
  'redux-persist',
  'react-dom',
  'react',
  'react-router',
  'core-js',
  'elliptic',
  'axios',
  'react-select',
  'react-toastify',
  'readable-stream',
]
const outputPath = path.resolve(__dirname, 'public/js/components')

module.exports = {
  entry: {
    mainApp: './resources/assets/js/mainApp/index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    filename: '[name].js',
    path: outputPath,
    publicPath: `/js/components/`,
  },
  devtool: mode == 'development' ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['es2015', { modules: false }], 'stage-0', 'react'],
          },
        },
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({
      include: ['mainApp', 'vendor'],
      algorithm: 'gzip',
      test: /\.js$|\.jsx$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
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
          test: 'vendor',
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
