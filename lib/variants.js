(function() {
  function selectDropdownOption(optionElement) {
    let selectElement = optionElement.parentElement
    if (!selectElement || selectElement.tagName.toLowerCase() !== 'select') {
      return 'E_NO_SELECT_FOR_OPTION'
    }
    optionElement.selected = 'selected'
    var event = document.createEvent('HTMLEvents')
    event.initEvent('change', true, true)
    selectElement.dispatchEvent(event)
    __qQuery(selectElement).trigger('change')
    return null
  }

  function sendMouseEventToElement(element, spec) {
    let eventTypes = spec.action || spec.clickType || 'click'

    if (!(eventTypes instanceof Array)) eventTypes = [eventTypes]
    var event = window.document.createEvent('MouseEvents')

    eventTypes.forEach( function(action) {
      var event = window.document.createEvent('MouseEvents')
      event.initMouseEvent(action, true, true, window,
          0, 0, 0, 0, 0,
          false, false, false, false,
          0, null)
      return element.dispatchEvent(event)
    })
  }

  function clickOption(optionElement, spec) {
    let clickElement = optionElement
    if (spec && spec.clickPath) {
      let clickElements = __qQuery(spec.clickPath, optionElement)
      if (!clickElements || clickElements.length === 0) return 'E_NO_ELEMENT'

      clickElement = clickElements[0]
    }

    sendMouseEventToElement(clickElement, spec)
    return null
  }

  window.__scraping.getPopoverContainer = function(spec) {
    if (!spec) return 'E_NO_SPEC'
    if (!spec.path) return 'E_INVALID_SPEC'

    let popoverElements = __qQuery(spec.path)

    if (!popoverElements || !popoverElements.length) return 'E_NO_POPOVER'

    return this.serializeElement(popoverElements[0])
  }

  window.__scraping.openPopover = function(spec, container) {
    let containerElement = __scraping.findElement(container)
    if (!containerElement) return 'E_NO_ELEMENT'
    if (!__qQuery(document).find(containerElement).length) return 'E_ELEMENT_NOT_IN_DOM'

    let popoverOpenElements = __qQuery(spec.openPath, containerElement)
    if (!popoverOpenElements || !popoverOpenElements.length) return

    let popoverOpenElement = popoverOpenElements[0]

    sendMouseEventToElement(popoverOpenElement, spec)

    let openResult = this.waitFor(spec.waitFor, container)
    if (openResult && openResult.then) {
      return openResult.then(() => this.getPopoverContainer(spec))
    }
    return this.getPopoverContainer(spec)
  }

  window.__scraping.selectVariantOption = function(option, container, spec) {
    let optionElement = __scraping.findElement(option.element)
    if (!optionElement) return 'E_NO_ELEMENT'
    if (!document.body.contains(optionElement)) return 'E_ELEMENT_NOT_IN_DOM'

    let isDropDown = optionElement.tagName.toLowerCase() === 'option'
    let error = isDropDown ?
      selectDropdownOption(optionElement, spec) :
      clickOption(optionElement, spec)
    if (error) return error
    if (spec.waitFor) return this.waitFor(spec.waitFor, container)
  }

  function getOptionPath(containerElement, spec) {
    if (spec.path) return spec.path
    if (containerElement.tagName.toLowerCase() === 'select') return 'option'

    return 'li'
  }

  function getEnabledOptionPath(_containerElement, spec) {
    if (spec.disabledPath) return spec.disabledPath

    return ['.disabled', ':disabled', '.unavailable']
      .map(o => `:not(${o})`)
      .join('')
  }

  function isOptionSelected(element, spec) {
    let selectedPath = spec.selectedPath
    if (!selectedPath) {
      if (element.tagName.toLowerCase() === 'option') {
        selectedPath = ':selected'
      } else {
        selectedPath = '.active, .selected, :selected'
      }
    }
    return __qQuery(element).is(selectedPath)
  }

  function normalizeText(s) {
    if (!s) return ''
    return s.trim()
  }

  window.__scraping.getValues = function(selector, serializedElement) {
    let value = __scraping.getValue(selector, serializedElement)
    if (value && value.length) return value
      return __scraping.getValue({ cssSelector: null , attr: null }, serializedElement)
  }

  window.__scraping.getVariantOptions = function(spec, containerElement, golbalContent) {
    if (!containerElement) throw new Error('Unknown element ' + JSON.stringify(containerElement))

    // Resolve DOM element from the provided element
    if (!golbalContent) {
      containerElement = __scraping.findElement(containerElement)
      if (!containerElement) return []
    } else {
      containerElement = golbalContent
    }

    let optionPath = getOptionPath(containerElement, spec)
    let enabledPath = getEnabledOptionPath(containerElement, spec)

    let optionElements = __qQuery(optionPath, containerElement).filter(enabledPath)
    let _this = this
    return optionElements.map(function(el) {
      let serializedElement = __scraping.serializeElement(this)
      return {
        value: normalizeText(_this.getValues(spec.valuePath, serializedElement)),
        text: normalizeText(_this.getValues(spec.textPath, serializedElement)),
        selected: isOptionSelected(this, spec),
        element: serializedElement
      }
    }).get()
  }
})()
