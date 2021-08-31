class PriceList {
  constructor(el) {
    this.$el = $(el)
    this.$searhForm = this.$el.find('.price-list__search')
    this.$preloader = this.$el.find('.price-list__preloader')

    this.dataSourceUrl = this.$el.data('srcUrl')
    this.list = null
    this.filteredList = null

    this.$result = this.$el.find('.price-list__result')
    this.templateAjaxFail = this.$el
      .find('.price-list__ajax-fail')
      .remove()
      .removeAttr('style')[0].outerHTML
    this.templateNoItems = this.$el
      .find('.price-list__no-items')
      .remove()
      .removeAttr('style')[0].outerHTML

    this.ajaxSuccess = null

    this.modifiers = {
      inited: 'price-list--inited',
    }
  }

  init() {
    if (this.$el.hasClass(this.modifiers.inited)) return

    this.getData(this.updateResult.bind(this))
    this.bindEvents()

    this.$el.addClass(this.modifiers.inited)
  }

  updateResult() {
    this.$result.html('')

    if (!this.ajaxSuccess) {
      this.$result.html(this.templateAjaxFail)
      this.$preloader.hide()
      return
    }

    if (this.filteredList.length === 0) {
      this.$result.html(this.templateNoItems)
      this.$preloader.hide()
      return
    }

    const $tableResults = $(this.templateTable)
    const $tableResultsBody = $tableResults.find('tbody')

    this.traverseTree(
      this.filteredList,
      (node) => {
        if (!node.NAME) return
        $tableResultsBody.append(`<tr class="partial">
        <td></td>
        <td></td>
        <td>${node.NAME}</td>
        <td></td>
      </tr>`)
      },
      (leave) => {
        $tableResultsBody.append(`<tr>
        <td>${leave.SERVIES_CODE}</td>
        <td>${leave.NMU_CODE}</td>
        <td>${leave.NAME}</td>
        <td>${leave.PRICE}</td>
      </tr>`)
      },
    )

    this.$preloader.hide()
    this.$result.append($tableResults)
  }

  bindEvents() {
    this.$searhForm.on('submit', (event) => {
      event.preventDefault()
      this.$preloader.show()
      const query = this.$searhForm
        .find('input[name="query_services"]')
        .val()
        .trim()
      if (!query) {
        this.filteredList = this.list
        this.updateResult()
      } else {
        this.filterServicesByQuery(query)
        this.updateResult()
      }
    })
  }

  getData(callback) {
    $.ajax({
      method: 'GET',
      url: this.dataSourceUrl,
      dataType: 'json',
    })
      .done((data) => {
        if (data) {
          this.list = data
          this.filteredList = JSON.parse(JSON.stringify(this.list))
        } else {
          this.list = []
          this.filteredList = []
        }
        this.ajaxSuccess = true
      })
      .fail((error) => {
        this.ajaxSuccess = false
        console.error(error)
      })
      .always(() => {
        callback()
      })
  }

  filterServicesByQuery(query) {
    this.filteredList = []

    this.traverseTree(
      this.list,
      () => {},
      (leave) => {
        if (
          leave.NAME.toLowerCase().includes(query.toLowerCase()) &&
          !this.filteredList.some((item) => item.SERVIES_CODE === leave.SERVIES_CODE)
        ) {
          this.filteredList.push(leave)
        }
      },
    )
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity, class-methods-use-this
  traverseTree(tree, nodeHandler = () => {}, leaveHandler = () => {}) {
    // обход по дереву элементов
    let current = tree
    const memory = [current]

    /* eslint-disable no-loops/no-loops */
    /* eslint-disable-next-line no-cond-assign */
    while ((current = memory.pop())) {
      while (true) {
        if (typeof current.NMU_CODE !== 'undefined') {
          leaveHandler(current)
          break
        } else if (current !== tree) {
          nodeHandler(current)
        }

        // получение дочерних листьев
        const elementsArray = []
        if (current.ELEMENTS) {
          current.ELEMENTS.forEach((item) => {
            elementsArray.push(item)
          })
        }

        // получение дочерних узлов
        const childrenArray = []
        if (current.CHILD) {
          // eslint-disable-next-line no-loop-func
          Object.keys(current.CHILD).forEach((key) => {
            childrenArray.push(current.CHILD[key])
          })
        } else {
          // eslint-disable-next-line no-loop-func
          Object.keys(current).forEach((key) => {
            childrenArray.push(current[key])
          })
        }

        if (elementsArray.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          current = elementsArray[0]
          for (let i = childrenArray.length - 1; i >= 0; i -= 1) {
            memory.push(childrenArray[i])
          }
          for (let i = elementsArray.length - 1; i > 0; i -= 1) {
            memory.push(elementsArray[i])
          }
        } else {
          // eslint-disable-next-line prefer-destructuring
          current = childrenArray[0]

          for (let i = childrenArray.length - 1; i > 0; i -= 1) {
            memory.push(childrenArray[i])
          }
        }
      }
    }
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
