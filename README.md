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
.block(style=`background-image: url(${require('@/upload/logo.png')}); width: 300px;`)
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

## Плагины/Библиотеки используемые в шаблоне

1.  Normalize [GitHub](https://github.com/necolas/normalize.css/), [Сайт](https://necolas.github.io/normalize.css/);
2.  Bootstrap [GitHub](https://github.com/twbs/bootstrap), [Сайт](https://getbootstrap.com);
3.  Air-datepicker [GitHub](https://github.com/t1m0n/air-datepicker), [Сайт](http://t1m0n.name/air-datepicker/docs/index-ru.html);
4.  Dropzonejs [GitHub](https://github.com/enyo/dropzone/), [Сайт](http://www.dropzonejs.com);
5.  FancyBox [GitHub](https://github.com/fancyapps/fancyBox), [Сайт](http://fancyapps.com/fancybox/);
6.  Highlightjs [GitHub](https://github.com/isagalaev/highlight.js), [Сайт](http://highlightjs.readthedocs.io/en/latest/);
7.  Jcf [GitHub](https://github.com/w3co/jcf), [Сайт](https://www.psd2html.com/js-custom-forms/#demo/);
8.  mCustomScrollbar [GitHub](https://github.com/malihu/malihu-custom-scrollbar-plugin), [Сайт](http://manos.malihu.gr/jquery-custom-content-scroller/#get-started-section);
9.  Perfect-scrollbar [GitHub](https://github.com/utatti/perfect-scrollbar), [Сайт](http://utatti.github.io/perfect-scrollbar/);
10. Devbridge-autocomplete [GitHub](https://github.com/devbridge/jQuery-Autocomplete), [Сайт](https://www.devbridge.com/sourcery/components/jquery-autocomplete/);
11. Masonry [GitHub](https://github.com/desandro/masonry), [Сайт](https://masonry.desandro.com);
12. Mediaelementjs [GitHub](https://github.com/mediaelement/mediaelement), [Сайт](http://www.mediaelementjs.com);
13. OwlCarousel2 [GitHub](https://github.com/OwlCarousel2/OwlCarousel2), [Сайт](https://owlcarousel2.github.io/OwlCarousel2/);
14. Slick [GitHub](https://github.com/kenwheeler/slick/), [Сайт](http://kenwheeler.github.io/slick);
15. Tabulator [GitHub](https://github.com/olifolkerd/tabulator), [Сайт](http://tabulator.info);
16. Inputmask [GitHub](https://github.com/RobinHerbots/Inputmask), [Сайт](http://robinherbots.github.io/Inputmask/);
17. Most Visible [GitHub](https://github.com/andyexeter/most-visible);
18. Readmore.js [GitHub](https://github.com/jedfoster/Readmore.js), [Сайт](http://jedfoster.com/Readmore.js/);
19. TextTailor.js [GitHub](https://github.com/jpntex/TextTailor.js/), [Сайт](http://jpntex.github.io/TextTailor.js/);
20. Sticky-sidebar [GitHub](https://github.com/abouolia/sticky-sidebar), [Сайт](https://abouolia.github.io/sticky-sidebar/);
21. Gray [GitHub](https://github.com/karlhorky/gray), [Сайт](https://work.karlhorky.com/gray/);
22. Fontfaceobserver [GitHub](https://github.com/bramstein/fontfaceobserver), [Сайт](https://fontfaceobserver.com);
23. Flag-icon-css [GitHub](https://github.com/lipis/flag-icon-css), [Сайт](http://flag-icon-css.lip.is);
