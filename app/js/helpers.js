// Helper -- начало

$.fn.windowWidth = function windowWidth(media) {
  const sizeWidthWindow = $(window).outerWidth()

  switch (media) {
    case 'xl':
      return sizeWidthWindow > 1279
    case 'lg':
      return sizeWidthWindow < 1280
    case 'md':
      return sizeWidthWindow < 1024
    case 'sm':
      return sizeWidthWindow < 768
    default:
      return sizeWidthWindow
  }
}

$.fn.isApple = function isApple() {
  return navigator.vendor && navigator.vendor.include('Apple') >= 0
}

$.fn.isIE = function isIE() {
  return navigator.userAgent.search(/MSIE|Trident|Edge/) >= 0
}

// Helper -- конец
