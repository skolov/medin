$(() => {
  //Полифил для object-fit
  objectFitImages();

  //Ленивая подгрузка, css класс .b-lazy
  window.bLazy = new Blazy({
    offset: 300,
    success: function (ele) {
      // Image has loaded
      // Do your business here
    },
    error: function (ele, msg) {
      if (msg === 'missing') {
        // Data-src is missing
      } else if (msg === 'invalid') {
        // Data-src is invalid
      }
    }
  });
});
