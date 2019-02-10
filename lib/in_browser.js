function Scraping() {
  function getElementByTag(tagName) {
    var elements = document.getElementsByTagName(elements)
    if (elements.length > 0) return elements[0]
    return null
  }
  var body = getElementByTag('body')
  if (body) body.bgColor = 'white'

  if (navigator) {
    navigator = {}        /* eslint no-global-assign: 0, no-native-reassign: 0 */
    navigator.geolocation = {}
    navigator.geolocation.getCurrentPosition = function(callback) {
      var position = {
        // San Francisco
        coords: { latitude: '37.7749', longitude: '-122.4194' }
      }
      callback(position)
    }
  }

  var map = {}

  var lastIdIndex = 0
  function newId() {
    return 'id_' + lastIdIndex++
  }

  this.waitForPageLoad = function() {
    return new Promise(function(resolve, reject) {
      // __qQuery(document).ready(function() { resolve(true) })

      // Check document loading using the other way, as jQuery ready won't fire
      // if the previous handler had an error
      function checkIfLoaded() {
        if (document.readyState === 'complete' && window.__scraping && window.__qQuery) {
          return resolve(true)
        }
        setTimeout(checkIfLoaded, 100)
      }
      checkIfLoaded()
    })
  }

  this.error = function(message, params) {
    return { __error: { message: message, params: params } }
  }

  this.waitFor = function(conditions, context) {
    if (!conditions) return null

    var TIMEOUT = conditions.timeout || 30 * 1000
    var INTERVAL = conditions.interval || 100

    if (typeof conditions === 'number') {
      return new Promise(function(resolve, reject) {
        setTimeout(function() { resolve(null) }, conditions)
      })
    }

    var self = this
    if (typeof conditions === 'string') {
      if (conditions === 'PAGE_LOAD') return this.waitForPageLoad()

      var selector = conditions
      return new Promise(function(resolve, reject) {
        const timeoutId = setTimeout(function() {
          clearInterval(intervalId)
          reject(new Error('Promise timed out'))
        }, TIMEOUT)
        const intervalId = setInterval(function() {
          if (self.$(selector, self.findElement(context)).length > 0) {
            clearTimeout(timeoutId)
            clearInterval(intervalId)
            resolve(new Error('Promise timed out'))
          }
        }, INTERVAL)
      })
    }

    if (typeof conditions === 'object') {
      var change = conditions.change
      if (change) return this.waitForChange(change)
    }
  }

  this.waitForChange = function(change) {
    var elementsToMonitor = __qQuery(change)
    var originalNodes = elementsToMonitor.toArray()
    return new Promise(function(resolve, reject) {
      function notifyChange() {
        clearInterval(interval)
        resolve(true)
      }

      var interval = setInterval(function() {
        var els = __qQuery(change).toArray()
        if (els.length !== originalNodes.length) return notifyChange()
        for (var i = 0; i < els.length; i++) {
          if (els[i] !== originalNodes[i]) return notifyChange()
        }
      }, 100)
      var observer = new window.MutationObserver(function(records) {
        for (var i = 0; i < records.length; i++) {
          var r = records[i]

          if (r.addedNodes.length > 0 || r.type === 'characterData' || r.type === 'attributes') return notifyChange()
        }
      })
      var config = {childList: true, characterData: true, subtree: true, attributes: true}
      __qQuery(change).each(function() {
        observer.observe(this, config)
      })
    })
  }

  this.findElement = function(el) {
    if (!el || !el.id) return null
    return map[el.id]
  }

  this.getValue = function(selector, context) {
    var element
    if (selector.cssSelector) {
      var elements = __qQuery(selector.cssSelector, this.findElement(context))
      if (!elements || !elements.length) return null
      element = elements.get(0)
    } else {
      element = this.findElement(context)
    }

    if (selector.attr) {
      var attr = __qQuery(element).attr(selector.attr)
      if (attr && attr.length > 0 ) return attr
    }

    if (element.tagName === 'INPUT') {
      var value = __qQuery(element).val()
      if (value) return value
    }

    return __qQuery(element, this.findElement(context)).text()
  }

  function serializeElement(el) {
    var id
    if (el.___qid && map[el.___qid]) {
      id = el.___qid
    } else {
      id = newId()
      map[id] = el
      el.___qid = id
    }

    return { tagName: el.tagName, id: id }
  }
  this.serializeElement = serializeElement

  this.$ = function(selector, context) {
    var elements = __qQuery(selector, this.findElement(context))
    var result = []
    for (var i = 0; i < elements.length; i++) {
      result.push(serializeElement(elements[i]))
    }
    return result
  }

  this.$$ = function(selector) {
    return document.querySelectorAll(selector)
  }

  this.findParents = function(selector, context) {
    var elements = __qQuery(this.findElement(context)).parents(selector)
    var result = []
    for (var i = 0; i < elements.length; i++) {
      result.push(serializeElement(elements[i]))
    }
    return result
  }

  this.click = function(selector, context, options) {
    options = options || {}
    var element = this.getSelectorOrContextElement(selector, context)
    if (!element) {
      return this.error(
        'No element found to click on',
        { selector: selector, context: options.contextElement, options: options }
      )
    }

    var clickType = options.clickType || 'click'
    if (!(clickType instanceof Array)) clickType = [clickType]

    clickType.forEach( function(click) {
      var event = window.document.createEvent('MouseEvents')
      event.initMouseEvent(click, true, true, window,
        0, 0, 0, 0, 0,
        false, false, false, false,
        0, null)

      return element.dispatchEvent(event)
    })

    return this.waitFor(options.waitFor, context)
  }

  this.getSelectorOrContextElement = function(selector, context) {
    if (selector) {
      var elements = __qQuery(selector, this.findElement(context))
      if (!elements || !elements.length) return null
      return elements.get(0)
    } else {
      return this.findElement(context)
    }
  }

  this.innerHtml = function(selector, context) {
    var contextElement = this.findElement(context) || window.document.documentElement
    var element = selector ? __qQuery(selector, contextElement) : __qQuery(contextElement)
    if (!element.length) return '<html/>'
    return element[0].innerHTML
  }

  this.outerHtml = function(selector, context) {
    var contextElement = this.findElement(context) || window.document.documentElement
    var element = selector ? __qQuery(selector, contextElement) : __qQuery(contextElement)
    if (!element.length) return '<html/>'
    return element[0].outerHTML
  }

  this.select = function(selector, text, value, context, executionOptions) {
    executionOptions = executionOptions || {}
    var select = this.getVariantElements(selector, context)[0]
    if (!select) return
    var options = select.options
    if (!options || !options.length) return
    var o, i
    // first check option text for match
    for (i = 0; i < options.length; i++) {
      o = options[i]
      if (o.innerText === text || (value && o.value === value)) {
        return this.executeDropdownChange(o, select, executionOptions)
      }
    }
    // if no match found in text, go over the values
    for (i = 0; i < options.length; i++) {
      o = options[i]
      if (o.value === text) return this.executeDropdownChange(o, select, executionOptions)
    }
  }

  this.executeDropdownChange = function(o, select, executionOptions) {
    o.selected = 'selected'
    var event = document.createEvent('HTMLEvents')
    event.initEvent('change', true, true)
    select.dispatchEvent(event)
    __qQuery(select).trigger('change')

    if (executionOptions.action || executionOptions.clickType) return this.click(select, null, executionOptions)

    return this.waitFor(executionOptions.waitFor)
  }

  this.closePopup = function(container, close, context) {
    var _container = __qQuery(container, this.findElement(context))[0]
    if (_container) {
      this.click(close, _container)
    }
  }

  this.fill = function(selector, value, context, triggerEvent) {
    __qQuery(selector, this.findElement(context)).val(value)
    var element = this.getSelectorOrContextElement(selector, context)
    if (!element) {
      return this.error(
        'No element found to click on',
        { selector: selector }
      )
    }

    var tiggerType = triggerEvent || 'change'
    if (!(tiggerType instanceof Array)) tiggerType = [tiggerType]

    tiggerType.forEach( function(action) {
      var event = window.document.createEvent('KeyboardEvent')
      event.initKeyboardEvent(action, true, true, null,
        false, false, false, false,
        9, 0)

      return element.dispatchEvent(event)
    })
  }

  function stringify(value) {
    if (!value && value !== 0) return ''
    return value.toString().trim()
  }

  function isSelect(el) { return el && el.tagName.toUpperCase() === 'SELECT' }

  this.getVariantElements = function(selector, context) {
    var contextElement = this.findElement(context)
    if (isSelect(contextElement)) return [contextElement]
    return __qQuery(selector, contextElement)
  }

  this.getClickOptions = function(
    context, containerSelector, textPath, valuePath, selectedPath
  ) {
    if (!selectedPath) selectedPath = ':selected'
    var disabledPath = ':disabled'
    var contextElement = this.findElement(context)
    var containers
    if (contextElement && contextElement.tagName.toUpperCase() === 'SELECT') {
      containers = [contextElement]
      containerSelector = ''
    } else {
      containers = __qQuery(containerSelector, contextElement)
    }
    if (containers && containers.length === 1 && containers[0].tagName.toUpperCase() === 'SELECT') {
      containers = __qQuery(containerSelector + ' option:enabled', this.findElement(context))
      textPath = textPath || ''
      valuePath = valuePath || '[value]'
    }
    var result = []
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i]
      result.push({
        value: stringify(this.getValue(valuePath, serializeElement(container))),
        text: stringify(this.getValue(textPath, serializeElement(container))),
        selected: __qQuery(container).is(selectedPath) || __qQuery(selectedPath, container).length > 0,
        disabled: __qQuery(container).is(disabledPath) || __qQuery(disabledPath, container).length > 0,
        element: serializeElement(container)
      })
    }
    return result
  }

  this.getDropdownOptions = function(context, containerSelector, textPath, valuePath) {

  }
}

window.__scraping = new Scraping()
