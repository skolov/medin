const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const globImporter = require('node-sass-glob-importer');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const IfPlugin = require('if-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const src = path.resolve(__dirname, 'src/');
const dist = path.resolve(__dirname, 'dist/');
const ico = path.resolve(src, 'ico/');
const upload = path.resolve(src, 'upload/');
const font = path.resolve(src, 'font/');
// const staticPath = path.resolve(src, 'static/');

const pug = path.resolve(src, 'pug/');
const pugGlobals = path.resolve(pug, 'data/global.json');

module.exports = env => ({
  context: src,
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@': src,
      Img: path.resolve(src, 'img/'),
      Upload: path.resolve(src, 'upload/')
    }
  },
  entry: {
    app: './',
    assets: './assets.js',
    icons: './icons.js'
  },
  output: {
    filename: './js/[name].js',
    path: dist
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          {
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
        include: ico,
        use: ['svg-sprite-loader', 'svgo-loader']
      },
      {
        test: /\.pug$/,
        include: pug,
        use: [
          {
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
        test: /\.(woff|eot|ttf|woff2|svg)$/,
        exclude: [ico, upload],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '[name].[ext]',
              context: '',
              outputPath: 'font/'
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        exclude: [ico, upload, font],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '[name].[ext]',
              context: '',
              outputPath: 'img/'
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        include: upload,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: ''
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({}),
      new ImageminPlugin({
        test: /\.(gif|png|jpe?g)$/
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/app.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // new CopyWebpackPlugin([{
    //   from: staticPath,
    //   to: dist
    // }]),
    new CleanWebpackPlugin(dist),
    new IfPlugin(
      env === 'server',
      new BrowserSyncPlugin(
        {
          host: 'localhost',
          port: 3000,
          ghostMode: false,
          server: {
            baseDir: [dist]
          }
        },
        {
          injectCss: true
        }
      )
    )
  ]
});
