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
    this.templateTable = this.$el
      .find('.price-list__table')
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
      return
    }

    if (this.filteredList.length === 0) {
      this.$result.html(this.templateNoItems)
      return
    }

    const $tableResults = $(this.templateTable)
    const $tableResultsBody = $tableResults.find('tbody')

    this.traverseTree(
      this.filteredList,
      (node) => {
        $tableResultsBody.append(`<tr>
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
      const query = new FormData(this.$searhForm[0]).get('query_services')
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
    $.ajax(this.dataSourceUrl)
      .done((data) => {
        // eslint-disable-next-line prefer-destructuring
        this.list = JSON.parse(
          $(data)
            .filter('.tariffs-json')
            .eq(0)
            .html(),
        )[0]
        this.filteredList = JSON.parse(JSON.stringify(this.list))
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
        if (leave.NAME.toLowerCase().includes(query.toLowerCase())) {
          this.filteredList.push(leave)
        }
      },
    )
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
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
        } else if (current !== this.filteredList) {
          nodeHandler(current)
        }

        const elementsArray = []
        if (current.ELEMENTS) {
          current.ELEMENTS.forEach((item) => {
            elementsArray.push(item)
          })
        }

        const childrenArray = []
        if (current.CHILD) {
          // eslint-disable-next-line no-loop-func
          Object.keys(current.CHILD).forEach((key) => {
            const childInner = current.CHILD[key]
            Object.keys(childInner).forEach((innerKey) => {
              childrenArray.push(childInner[innerKey])
            })
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
