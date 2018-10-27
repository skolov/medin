//Helper -- начало
$.fn.windowWidth = function windowWidth(media) {
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

$.fn.isApple = function isApple() {
  return navigator.vendor && navigator.vendor.indexOf('Apple') >= 0;
}



$.fn.isIE = function isIE() {
  return navigator.userAgent.search(/MSIE|Trident|Edge/) >= 0;
}


//Helper -- конец
