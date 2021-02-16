const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')
//const BrotliPlugin = require('brotli-webpack-plugin')

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

module.exports = (env) => {
  console.log('NODE_ENV: ', env.NODE_ENV) // 'local'
  console.log('Production: ', env.production) // true

  const mode = env.NODE_ENV == 'production' ? env.NODE_ENV : 'development'

  return {
    entry: {
      mainApp: './resources/assets/js/mainApp/index.js',
      vendor: VENDOR_LIBS,
    },
    output: {
      filename: '[name].js',
      path: outputPath,
      publicPath: `/js/components/`,
      pathinfo: false,
    },
    devtool: false, //mode == 'development' ? 'source-map' : false,
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
    plugins:
      mode == 'production'
        ? [
            new CompressionPlugin({
              filename: '[path][base].br',
              algorithm: 'brotliCompress',
              test: /\.js$|\.jsx$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
              compressionOptions: {
                params: {
                  [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                },
              },
              threshold: 10240,
              minRatio: 0.8,
              deleteOriginalAssets: false,
            }),
          ]
        : [],
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

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
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: 'vendor',
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      minimizer:
        mode == 'production'
          ? [
              new TerserPlugin({
                parallel: true,
                terserOptions: {
                  ecma: 6,
                },
              }),
            ]
          : [],
      removeAvailableModules: true,
    },
    mode,
  }
}
