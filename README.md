# Шаблон фронтенд проектов

_Шаблон на основе webpack, pug, scss, es6, postcss для многостраничных приложений_

## Подготовка

### Необходимый софт для PC

1.  Установить [Node.js](https://nodejs.org/en/);
2.  Установить [Yarn](https://yarnpkg.com/lang/en/) - менеджер пакетов, [usage](https://yarnpkg.com/en/docs/usage).

### Необходимые плагины для редактора или IDE

1.  Установить editorconfig плагин для редактора ([PhpStorm](https://plugins.jetbrains.com/plugin/7294-editorconfig), [Sublime Text](https://packagecontrol.io/packages/EditorConfig), [Atom](https://atom.io/packages/linter-eslint), [VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)) - поддерживает единый стиль форматирования между различными редакторами и IDE;

2.  Установить eslint плагин для редактора ([PhpStorm](https://www.jetbrains.com/help/phpstorm/eslint.html), [Sublime Text](https://packagecontrol.io/packages/ESLint), [Atom](https://atom.io/packages/editorconfig), [VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)) - проводит анализ качества вашего кода, написанного на любом выбранном стандарте JavaScript;

3.  Установить CSScomb плагин для редактора ([WebSite](http://csscomb.com)) - форматирует css код по установленным параметрам;

## Запуск

1.  Клонируйте или [скачайте](http://git.sitesoft.ru/markup/frontend-template.git) проект:
    - В консоле ввести: `git clone http://git.sitesoft.ru/markup/frontend-template.git имя-проекта`
2.  Войти в папку проекта и удалить папку .git:
    - В консоле ввести: `cd имя-проекта`
    - В консоле ввести: `rm -rf .git`
3.  Установка зависимостей с помощью yarn:
    - В консоле ввести: `yarn`
4.  Использовать одну из команд для сборки или запуска проекта:
    - `yarn build` - сборка проекта для продакшена(минификация и оптимизация файлов);
    - `yarn watch` - сборка проекта для разработки, запуск слежения за файлами (добавление sourcemaps);
    - `yarn start` - сборка проекта для разработки, запуск слежения за файлами и локального сервера (автообновление страницы после изменения файлов проекта);
    - `yarn lint` - проверка js кода в папке src на соответствие правилам airbnb.

## Инструкции по разработке

### Подключение изображений

Пример:

```pug
img(src=require('@/upload/logo.png') alt='')
.block(style=`background-image: url(${require('@/upload/logo.png')}); width: 300px; height: 300px; border: 1px solid red;`)
```

Для сокращения можно использовать миксин pug/mixins/img.pug, пример:

```pug
+img('upload/sample.jpg')(alt='image').some-class
```

### Подключение плагинов/библиотек

#### CSS

Установка плагина/библиотеки (например, swiper)::

```
yarn add swiper
```

Подключаем плагин/библиотеку в main.scss:

```
@import '~swiper/dist/css/swiper.css'
```

Символ ' ~ ' указывает на папку node_modules.

#### JS

##### jQuery плагин/библиотека

Устанавливаем плагин/библиотеку (например, sticky-kit):

```
yarn add sticky-kit
```

Подключаем плагин/библиотеку в main.js:

```js
import 'sticky-kit/dist/sticky-kit';
```

Подключение файла, в котором требуется зависимость:

```js
import Swiper from 'swiper/dist/js/swiper';
```

### Сокращение пути через @ в файлах scss and js

@ в пути к файлу указывает на папку src, с его помощью можно создать абсолютный путь.
CSS:

```
src: url("~@/font/rouble-webfont.woff") format("woff")
```

JS:

```
import module from '@/js/module';
```

### Использование svg-спрайта

Все svg иконки необходимо поместить в папку `/ico`

Для подключения на страницу иконки использовать шаблон:

```html
<svg class="your-class" width="193" height="40">
  <use xlink:href="#your-icon-file-name"></use>
</svg>
```

Для сокращения можно использовать миксин pug/mixins/img.pug, пример:

```pug
+icon('your-icon-file-name')(width=193 height=40).your-class
```
