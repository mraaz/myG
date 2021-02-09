const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

const mode = process.env.NODE_ENV == 'production' ? process.env.NODE_ENV : 'development'
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
    new BrotliPlugin({
      include: ['mainApp', 'vendor'],
      test: /\.js$|\.jsx$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      process: {
        version: JSON.stringify(''),
        env: {
          NODE_ENV: JSON.stringify(mode),
        },
      },
    }),
  ],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
    },
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    chunkIds: 'deterministic',
    moduleIds: 'deterministic',
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
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
    removeAvailableModules: true,
  },
  mode,
}
