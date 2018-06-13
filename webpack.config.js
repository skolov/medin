const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const globImporter = require('node-sass-glob-importer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const src = {
  root: path.resolve(__dirname, 'src/')
};
Object.assign(src, {
  img: path.resolve(src.root, 'img/'),
  font: path.resolve(src.root, 'font/'),
  ico: path.resolve(src.root, 'ico/'),
  pug: path.resolve(src.root, 'pug/')
});

const dist = {
  root: path.resolve(__dirname, 'dist/')
};

const config = {
  context: src.root,
  entry: {
    app: './',
    assets: './assets.js'
  },
  resolve: {
    alias: {
      Img: src.img,
      Font: src.font
    }
  },
  output: {
    filename: './js/[name].js',
    path: dist.root
  },
  module: {
    rules: [{
        test: /\.js$/,
        include: src.root,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: src.root,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          publicPath: '../',
          use: [{
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
              loader: 'sass-loader',
              options: {
                importer: globImporter(),
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg|woff|eot|ttf|woff2)$/,
        exclude: src.ico,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[path][name].[ext]'
          }
        }]
      },
      {
        test: /\.svg$/,
        include: src.ico,
        use: ['svg-sprite-loader', 'svgo-loader']
      },
      {
        test: /\.pug$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].html',
              context: src.pug
            }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              interpolate: true
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
              exports: false,
              doctype: 'html',
              basedir: src.pug,
              data: {
                data: () => JSON.parse(fs.readFileSync(path.resolve(src.pug, 'data/global.json'), 'utf8'))
              },
              filters: {
                // filter for include json data as empty string
                'json-watch': () => ''
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/app.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};

module.exports = config;
