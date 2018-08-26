# Шаблон фронтенд проектов

_Шаблон на основе webpack, pug, scss, es6, postcss для многостраничных приложений_

## Фронтенд стенды проекта

1.  Фамилия Имя - [Стенд](http://sitesoft.ru)

## Действия перед созданием нового проекта

1.  Проверить дизайн на соответствие требованиям [Требования к макетам дизайна KSS](https://docs.google.com/document/d/1DrQdRloEhhvfxCblvDui9ENhLd6nLcTH1HaYMp0Z8fQ/edit?usp=sharing)
2.  Прочитать правила front-end проектов KSS и следовать им [Правила front-end проектов KSS](https://docs.google.com/document/d/1t-LmUuQL9MmftZR6g3pngkdRn2TTGBfkLYivJuvIutY/edit?usp=sharing)

## Подготовка

### Необходимые зависимости

1.  Установить [Node.js](https://nodejs.org/en/);
2.  Установить [Yarn](https://yarnpkg.com/lang/en/) - менеджер пакетов, [usage](https://yarnpkg.com/en/docs/usage);
3.  Установить [JSON Server](https://github.com/typicode/json-server) - фейковый REST API, [инструкция](https://ruseller.com/lessons.php?rub=32&id=2842);

### Необходимые плагины для редактора или IDE

1.  Установить editorconfig плагин для редактора ([PhpStorm](https://plugins.jetbrains.com/plugin/7294-editorconfig), [Sublime Text](https://packagecontrol.io/packages/EditorConfig), [Atom](https://atom.io/packages/linter-eslint), [VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)) - поддерживает единый стиль форматирования между различными редакторами и IDE;

2.  Установить eslint плагин для редактора ([PhpStorm](https://www.jetbrains.com/help/phpstorm/eslint.html), [Sublime Text](https://packagecontrol.io/packages/ESLint), [Atom](https://atom.io/packages/editorconfig), [VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)) - проводит анализ качества вашего кода, написанного на любом выбранном стандарте JavaScript;

3.  Установить CSScomb плагин для редактора ([WebSite](http://csscomb.com)) - форматирует css код по установленным параметрам;

## Запуск

1.  Клонируйте или [скачайте](http://git.sitesoft.ru/markup/frontend-template.git) проект:
    - В консоле ввести: `git clone http://git.sitesoft.ru/markup/frontend-template.git имя-проекта`
2.  Получите сабмодули гита:
    - В консоле ввести: `git submodule init`
    - В консоле ввести: `git submodule update`
3.  Войдите в папку проекта и удалите папку .git:
    - В консоле ввести: `cd имя-проекта`
    - В консоле ввести: `rm -rf .git`
4.  Установите зависимости с помощью yarn:
    - В консоле ввести: `yarn`;
5.  Используйте одну из команд для сборки или запуска проекта:
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

Установка плагина/библиотеки (например, slick-carousel):

```
yarn add slick-carousel
```

Подключаем плагин/библиотеку в vendor/vendor.js:

Подключаем Scripts

```
import 'babel-loader!slick-carousel';
```

Подключаем Styles

```
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
```

Приставка babel-loader! ставится если подключаемую библиотеку необходимо обработать babel-ем.

Приставка expose-loader?slick!slick-carousel ставится если подключаемая библиотека должна быть доступна глобально.

Символ ' ~ ' в начале пути указывает на папку node_modules.

@ в пути к файлу указывает на папку src, с его помощью можно создать абсолютный путь.

### Использование svg-спрайта

Все svg иконки необходимо поместить в папку `/svg-sprite`

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
24. Rangy [GitHub](https://github.com/timdown/rangy)
25. Tooltipster [GitHub](https://github.com/iamceege/tooltipster), [Сайт](http://iamceege.github.io/tooltipster/);
26. Tingle.js [GitHub](https://github.com/robinparisi/tingle), [Сайт](https://robinparisi.github.io/tingle/);
27. PriorityNavigation.js [GitHub](https://github.com/gijsroge/priority-navigation), [Сайт](http://gijsroge.github.io/priority-nav.js/);
28. Family.scss [GitHub](https://github.com/LukyVj/family.scss), [Сайт](http://lukyvj.github.io/family.scss/);
