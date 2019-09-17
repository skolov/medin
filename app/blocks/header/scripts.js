$(() => {
  const menuSelector = '.header__top'
  const activeClass = 'is-active'

  const menuLink = $('[data-to-scroll]')
  // // show menu when scroll block presentation

  // var hero = $('.section-hero').height()
  // var headerTop = $('.header')
  // $(document).on('scroll', function () {
  //   var self = $(this)
  //   var documentScroll = self.scrollTop()
  //   if (documentScroll > 20) {
  //     headerTop.addClass('is-small')
  //   } else headerTop.removeClass('is-small')
  // })
  // backlight menu with scroll
  function onScroll() {
    const navHeight = $(menuSelector).outerHeight()
    const scrollTop = $(document).scrollTop() + navHeight
    menuLink.each(function() {
      const self = $(this)
      const hash = self.data('to-scroll')
      const target = $(`[data-scroll=${hash}]`)
      if (target.length === 0) return
      const currentScroll = target.offset().top
      if (currentScroll <= scrollTop && currentScroll + target.outerHeight() > scrollTop) {
        menuLink.not(self).removeClass(activeClass)
        self.addClass(activeClass)
      } else {
        self.removeClass(activeClass)
      }
    })
  }
  // / smooth scroll menu
  onScroll()
  $(document).on('scroll', onScroll)
  menuLink.on('click', function(evnt) {
    const navHeight = $(menuSelector).outerHeight()
    const self = $(this)
    const hash = self.data('to-scroll')
    const target = $(`[data-scroll=${hash}]`)
    if (target.length === 0) return
    $('html, body')
      .stop(true, true)
      .animate(
        {
          scrollTop: target.offset().top - navHeight + 50,
        },
        400,
        function() {
          onScroll()
        },
      )
    evnt.preventDefault()
  })
})
