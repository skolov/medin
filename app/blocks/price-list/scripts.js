class PriceList {
  constructor(el) {
    this.$el = $(el)

    this.dataSourceUrl = this.$el.data('srcUrl')
    this.list = null
    this.filteredList = null

    this.$result = this.$el.find('.price-list__result')
    this.templateAjaxFail = this.$el.find('.price-list__ajax-fail')[0].outerHTML
    this.templateNoItems = this.$el.find('.price-list__no-items')[0].outerHTML

    this.ajaxSuccess = null

    this.modifiers = {
      inited: 'price-list--inited',
    }
  }

  init() {
    if (this.$el.hasClass(this.modifiers.inited)) return

    this.getData(this.updateResult.bind(this))

    this.$el.addClass(this.modifiers.inited)
  }

  updateResult() {
    this.$result.html('')

    if (!this.ajaxSuccess) {
      this.$result
        .html(this.templateAjaxFail)
        .children()
        .attr('style', '')
      return
    }

    if (this.filteredList.length === 0) {
      this.$result
        .html(this.templateNoItems)
        .children()
        .attr('style', '')
    }
  }

  getData(callback) {
    return $.ajax(this.dataSourceUrl)
      .done((data) => {
        console.log(data)
        this.list = data
        this.filteredList = JSON.parse(JSON.stringify(this.list))
        this.ajaxSuccess = true
      })
      .fail((error) => {
        this.ajaxSuccess = false
        console.log(error)
      })
      .always(() => {
        callback()
      })
  }

  /* eslint-disable class-methods-use-this */
  getNoResultTemplate() {
    return $(`<div class="price-list__no-results">
      <p>
        К сожалению, услуга не найдена.
      </p>
      <p>
        Обратитесь за подробной информацией по номеру
        <a href="tel:+7(499) 283-93-63">+7(499) 283-93-63</a>
      </p>
    </div>`)
  }

  getAjaxFailTemplate() {
    return $(`<div class="price-list__no-results">
      <p>
        Ошибка сервера. Попробуйте позже
      </p>
    </div>`)
  }
}

/* eslint-disable func-names */
$.fn.priceList = function() {
  return this.each(function() {
    new PriceList(this).init()
  })
}

$(() => {
  $('.price-list').priceList()
})
