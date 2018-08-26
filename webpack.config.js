const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const package = require('./package.json');
const globImporter = require('node-sass-glob-importer');
const WebpackMessages = require('webpack-messages');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const IfPlugin = require('if-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const src = path.resolve(__dirname, 'src/');
const dist = path.resolve(__dirname, 'dist/');
const svgSprite = path.resolve(src, 'svg-sprite/');
const upload = path.resolve(src, 'upload/');
const uploadDist = path.resolve(dist, 'upload');
// const staticPath = path.resolve(src, 'static/');

const pug = path.resolve(src, 'pug/');
const pugGlobals = path.resolve(pug, 'data/global.json');

module.exports = env => ({
  stats: 'none',
  context: src,
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@': src
    }
  },
  entry: {
    app: './',
    pages: './pages.js',
    fonts: './fonts.js'
  },
  output: {
    filename: './js/[name].js',
    path: dist
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer]
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              importer: globImporter(),
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: svgSprite,
        use: ['svg-sprite-loader', {
          loader: 'svgo-loader',
          options: {
            plugins: [{
              removeAttrs: {
                attrs: '(fill|stroke)'
              }
            }]
          }
        }]
      },
      {
        test: /\.pug$/,
        include: pug,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].html',
              context: pug
            }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              attrs: [''],
              interpolate: true
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              exports: false,
              doctype: 'html',
              basedir: pug,
              data: {
                data: () => JSON.parse(fs.readFileSync(pugGlobals, 'utf8'))
              },
              filters: {
                // filter for include json data as empty string
                'json-watch': () => ''
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|eot|ttf|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            fallback: 'file-loader',
            name: '[name].[ext]',
            context: '',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        exclude: [svgSprite, upload],
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            fallback: 'file-loader',
            name: '[name].[ext]',
            context: '',
            outputPath: 'img/'
          }
        }]
      },
      {
        test: /\.svg$/,
        exclude: [svgSprite, upload],
        use: [{
          // loader: 'svg-url-loader',
          loader: 'url-loader',
          options: {
            limit: 2048,
            fallback: 'file-loader',
            name: '[name].[ext]',
            context: '',
            outputPath: 'img/'
          }
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        },
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
      new ImageminPlugin({
        test: /\.(gif|png|jpe?g)$/
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new webpack.ProvidePlugin({
      $: 'expose-loader?$!jquery',
      jQuery: 'expose-loader?$!jquery',
      'window.jQuery': 'expose-loader?$!jquery'
    }),
    new CopyWebpackPlugin([{
      from: upload,
      to: uploadDist
    }]),
    new CleanWebpackPlugin(dist),
    new IfPlugin(
      env === 'server',
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        ghostMode: false,
        server: {
          baseDir: [dist]
        }
      }, {
        injectCss: true
      })
    ),
    new WebpackMessages({
      name: package.name,
      logger: str => console.log(`>> ${str}`)
    })
  ]
});
