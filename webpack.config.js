const path = require('path')
const webpack = require('webpack')
const zlib = require('zlib')

const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
  //const mode = 'production'
  console.log(mode, 'MODE')
  return {
    entry: {
      mainApp: './resources/assets/js/mainApp/index.js',
      vendor: VENDOR_LIBS,
      //stlyes: './resources/assets/sass/main.scss', COULDNT MAKE THIS WORK
    },
    output: {
      filename: '[name].js',
      path: outputPath,
      publicPath: `/js/components/`,
      pathinfo: false,
    },
    devtool: mode == 'development' ? 'inline-source-map' : false,
    mode: mode,
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
    ],
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      //new BundleAnalyzerPlugin(),

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
      symlinks: false,
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
      },
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      chunkIds: 'deterministic',
      moduleIds: 'deterministic',
      removeAvailableModules: mode == 'production' ? true : false,
      removeEmptyChunks: mode == 'production' ? true : false,
      mergeDuplicateChunks: mode == 'production' ? true : false,
      nodeEnv: mode,
      mangleWasmImports: true,
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
}
