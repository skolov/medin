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
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const TerserPlugin = require('terser-webpack-plugin');


const src = path.resolve(__dirname, 'src/');
const dist = path.resolve(__dirname, 'dist/');
const svgSprite = path.resolve(src, 'svg-sprite/');
const static = path.resolve(src, 'static/');
const staticDist = path.resolve(dist, 'static');
// const staticPath = path.resolve(src, 'static/');

const pug = path.resolve(src, 'pug/');
const pugGlobals = path.resolve(pug, 'data/global.json');

const StylelintPlugin = require('stylelint-webpack-plugin')
const lintStylesOptions = {
  context: path.resolve(__dirname, `${src}/scss`),
  syntax: 'scss',
  emitErrors: false
  // fix: true,
}
const lintStylesOptionsBlocks = {
  context: path.resolve(__dirname, `${src}/blocks`),
  syntax: 'scss',
  emitErrors: false
  // fix: true,
}
const pxtorem = require('postcss-pxtorem');
const pxtoremOpts = {
  rootValue: 16,
  unitPrecision: 5,
  propList: ["*", "!background-position"],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
};
const lintJSOptions = {
  emitWarning: true,
  // Fail only on errors
  failOnWarning: false,
  failOnError: true,

  // Toggle autofix
  fix: true,
  cache: true,

  formatter: require('eslint-friendly-formatter')
}


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
    styles: './scss/main.scss',
    pages: './pug/pages.js',
    fonts: './fonts/fonts.js'
  },
  output: {
    filename: './js/[name].js',
    path: dist
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
            loader: 'babel-loader'
          },
          // {
          //   loader: 'eslint-loader',
          //   options: lintJSOptions
          // }
        ]
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
              plugins: [autoprefixer, pxtorem(pxtoremOpts)]
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
        exclude: [svgSprite, static],
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
        exclude: [svgSprite, static],
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
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        },
        cache: true,
        parallel: 4,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true // false for analyzer
      }),
    ]
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin({
      extensions: ['scss', 'styl', 'css']
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new webpack.ProvidePlugin({
      $: 'expose-loader?$!jquery',
      jQuery: 'expose-loader?$!jquery',
      'window.jQuery': 'expose-loader?$!jquery'
    }),
    new CopyWebpackPlugin([{
      from: static,
      to: staticDist
    }]),
    new ImageminPlugin({
      test: /\.(gif|png|jpe?g|svg)$/,
      optipng: {
        optimizationLevel: 3
      },
      gifsicle: {
        interlaced: true,
        optimizationLevel: 1
      },
      jpegtran: {
        progressive: true
      },
      svgo: {},
      pngquant: {
        quality: "65-80",
        speed: 5
      },
      plugins: [
        imageminJpegRecompress({
          loops: 3,
          min: 65,
          max: 70,
          quality: "medium"
        }),
      ],
      cacheFolder: path.resolve('./cacheImagemin')
    }),
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
    // new PurifyCSSPlugin({
    //   paths: glob.sync(`${src}/**/*.+(pug|js)`, { nodir: true }),
    //   styleExtensions: ['.css', '.scss']
    // }),
    // new StylelintPlugin(lintStylesOptionsBlocks),
    // new StylelintPlugin(lintStylesOptions),
    new WebpackMessages({
      name: package.name,
      logger: str => console.log(`>> ${str}`)
    })
  ]
});
