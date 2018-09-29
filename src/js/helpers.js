//Helper -- начало
$.fn.windowSize = function windowSize(media) {
  let sizeWidthWindow = $(window).outerWidth();

  switch (media) {
    case 'xl':
      return sizeWidthWindow > 1279;
      break;
    case 'lg':
      return sizeWidthWindow < 1280
      break;
    case 'md':
      return sizeWidthWindow < 1024
      break;
    case 'sm':
      return sizeWidthWindow < 768
      break;
    default:
      return sizeWidthWindow
  }
}
//Helper -- конец
