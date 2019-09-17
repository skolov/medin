const path = require('path')

const parts = require('./webpack.parts')

const paths = require('./pathsApp')

module.exports = [
  parts.page({
    title: 'index',
    path: 'pages/index',
    entry: {
      markup_pageList: path.join(paths.app, 'pug/pages/index')
    },
    template: path.join(paths.app, 'pug/pages/index/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'markup_pageList']
  }),
  parts.page({
    title: 'nojs-browser',
    path: 'pages/nojs-browser',
    entry: {
      'nojs-browser': path.join(paths.app, 'pug/pages/nojs-browser')
    },
    template: path.join(paths.app, 'pug/pages/nojs-browser/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'nojs-browser']
  }),
  parts.page({
    title: 'update-browser',
    path: 'pages/update-browser',
    entry: {
      'update-browser': path.join(paths.app, 'pug/pages/update-browser')
    },
    template: path.join(paths.app, 'pug/pages/update-browser/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'update-browser']
  }),
  parts.page({
    title: 'home',
    path: 'pages/home',
    entry: {
      markup_home: path.join(paths.app, 'pug/pages/home')
    },
    template: path.join(paths.app, 'pug/pages/home/index.pug'),

    // Подключаемые зависимости на страницу
    chunks: ['runtime', 'vendors', 'app', 'markup_home']
  }),
]
