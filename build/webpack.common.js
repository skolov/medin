//ОБЩИЙ КОНФИГ
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const IfPlugin = require('if-webpack-plugin')

const minimist = require('minimist')
const arguments = minimist(process.argv.slice(2))

const paths = require('./pathsApp')

const parts = require('./webpack.parts')

const pug = path.resolve(paths.app, 'pug/')
const pugMain = path.resolve(paths.mainApp.app, 'pug/')
const pugBlocks = path.resolve(paths.mainApp.app, 'blocks/')
const pugGlobals = path.resolve(pug, 'data/global.json')

const pugOptions = {
  pretty: true,
  exports: false,
  doctype: 'html',
  basedir: pug,
  data: {
    data: () => JSON.parse(fs.readFileSync(pugGlobals, 'utf8')),
  },
  filters: {
    // filter for include json data as empty string
    'json-watch': () => '',
  },
}

module.exports = merge([
  {
    context: paths.app,
    resolve: {
      unsafeCache: true,
      symlinks: false,
      alias: {
        '@': path.resolve(path.dirname(__dirname), 'app'),
        '@components': path.resolve(
          path.dirname(__dirname),
          'app',
          'vue',
          'components'
        ),
        '@store': path.resolve(path.dirname(__dirname), 'app', 'vue', 'store'),
        '@router': path.resolve(
          path.dirname(__dirname),
          'app',
          'vue',
          'router'
        ),
        vue$: 'vue/dist/vue.esm.js',
      },
    },

    stats: {
      warningsFilter: (warning) => warning.includes('entrypoint size limit'),
      children: false,
      modules: false,
    },
    plugins: [
      new FriendlyErrorsPlugin(),
      new webpack.ProvidePlugin({
        $: 'expose-loader?$!jquery',
        jQuery: 'expose-loader?jQuery!jquery',
      }),
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([
        {
          from: `${paths.app}/static`,
          to: `${paths.build}/static`,
        },
      ]),
      new IfPlugin(
        arguments.buildStatus == 'ui-kit',
        new CopyWebpackPlugin([
          {
            from: path.join(path.dirname(__dirname), 'app/static'),
            to: `${paths.build}/static`,
          },
        ])
      ),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/),
    ],
  },
  parts.loadPug({
    include: pug,
    options: pugOptions,
  }),

  arguments.buildStatus == 'ui-kit'
    ? parts.extractPug({
        include: pugBlocks,
        exclude: pug,
        contextFolder: pugBlocks,
        options: pugOptions,
        nameFile: 'blocks/[path][name].html',
      })
    : null,
  parts.loadPlainPug({
    exclude: [pug, pugBlocks],
  }),
  parts.loadVUE({}),
  parts.loadSvgIcons({
    include: [
      path.resolve(paths.app, 'svg-sprite/'),
      path.resolve(paths.app, '../app/svg-sprite/'),
    ],
    options: {
      plugins: [
        {
          removeAttrs: {
            attrs: '(fill|stroke)',
          },
        },
      ],
    },
  }),

  parts.loadFonts({
    options: {
      name: `${paths.fonts}/[name].[hash:8].[ext]`,
    },
  }),
])
