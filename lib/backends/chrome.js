const _ = require('lodash')
const fs = require('fs')
const IN_BROWSER_SCRIPT = readFile('lib/in_browser.js')
const VARIANT_SCRIPT = readFile('lib/variants.js')
const JQUERY_SCRIPT = readFile('lib/qquery.js')
const Promise = require('bluebird')
const istanbulPatch = require('../../istanbul_patch')
const refererProvider = require('./../referer_provider')
const MissingContextError = 'Cannot find context with specified id undefined'


function readFile(file) {
  let appDir = process.cwd()
  return String(fs.readFileSync(`${appDir}/${file}`))
}

eval(require('./../blacklist_domains'))
let isBlacklistedUrl = isBlacklisted

class Chrome {
  constructor(browser) {
    this.browser = browser
    this.waitFor = 1000
  }

  async initializePage() {
    let script = [JQUERY_SCRIPT, IN_BROWSER_SCRIPT, VARIANT_SCRIPT].join(';;')
    await this.page.evaluate(script)
    await this.page.evaluate(istanbulPatch(/* istanbul ignore next */ function() {
      return window.__scraping.waitForPageLoad()
    }))
  }

  async initialize(ctx) {
    this.page = await this.browser.newPage()
  //  await this.page.setViewport({width: 1280, height: 1024})
    this.navigation = []

    await this.page.on('console', function(ev) {
      log.debug({ type: ev.type }, `--- chrome --- ${ev.text()}`)
    })
    await this.page.on('error', function(err) {
      log.debug({ err }, '--- chrome error ---')
    })
    await this.page.on('pageerror', function(err) {
      log.debug({ err }, '--- chrome unhandled error ---')
    })

    await this.page.setRequestInterception(true)

    await this.page._client.on('Network.requestIntercepted', async request => {
      const { resourceType, authChallenge, interceptionId, request: { url, headers } } = request

      if (!interceptionId) return

      if (url && isBlacklistedUrl(url)) {
        log.debug({ url }, 'Blocked')
        return this.page._client.send('Network.continueInterceptedRequest', {
          interceptionId,
          errorReason: 'Aborted'
        }).catch((error) => {log.error(error)})

      }
      if (!authChallenge && resourceType === 'Document') {
        log.debug('******* WILL NAVIGATE *********')
        let unresolvedNavigation = this.navigation.find(_ => _.isPending())
        if (unresolvedNavigation) unresolvedNavigation.__resolve(true)
        let resolveMethod
        let promise = new Promise(x => resolveMethod = x)
        promise.__resolve = resolveMethod
        this.navigation.push(promise)
      }

        headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        headers['Accept-Encoding'] = 'gzip, deflate, br'
        headers['Accept-Language'] = 'en-US,en;q=0.9'
        // headers['Cache-Control'] = 'max-age=0'
        // headers['Connection'] = 'keep-alive'
        //
        // headers['referer'] = refererProvider.getReferer()
        await this.page._client.send('Network.continueInterceptedRequest', {
        interceptionId,
        headers
      }).catch(function(err) {
        if (err.message.includes('Response already processed')) return
        throw err
      })
    })

    await this.page._client.on('Page.frameStoppedLoading',async (ev) => {
      let unresolvedNavigation = this.navigation.find(_ => _.isPending())
      if (unresolvedNavigation) {
        log.debug({ ev }, '******* DID FINISH LOAD *********')
        await this.initializePage()
          .then(() => unresolvedNavigation.__resolve(true))
          .catch(err => log.debug({ err }, 'Unable to initialize page'))
      }
    })
  }

  async setProxy(user, pwd){
    if (user && pwd) {
      await this.page.authenticate({username: user, password: pwd })
    }
  }

  async setUserAgent(userAgent) {
    await this.page.setUserAgent(userAgent)
  }

  async navigate(url) {
    log.debug({ url }, 'ChromeBackend.navigate')
    // await this.page.goto(url, { timeout: 30000 }).then((gotoResult) => { })
    await this.page.goto(url, { timeout: 60000 }).then((gotoResult) => {
    this.browser.statusCode = (gotoResult && gotoResult._status) ? gotoResult._status : 503
  })
    await this.pendingNavigation()
    return this.browser.statusCode
  }

  async pendingNavigation() {
    log.debug('******* Checking navigation finished *********')
    await Promise.all(this.navigation || [])
  }

  async execute(func) {
      return this.executeWithRetries(async () => {
        func = istanbulPatch(func)
        let args = Array.prototype.slice.call(arguments, 1)
        await this.pendingNavigation()
        return this.page.evaluate(func, ...args)
      })
    }

  $(selector, context) {
      return this.execute(/* istanbul ignore next */ function(selector, context) {
        return window.__scraping.$(selector, context)
      }, selector, context)
    }

  async handleInputTag(selector, val) {
    try {
      await this.page.evaluate(async(css, val) => {
        var keyboardEvent = new KeyboardEvent('keyup', {bubbles:true});
        Object.defineProperty(keyboardEvent, 'charCode', {get:function(){return this.charCodeVal;}});
        document.body.dispatchEvent(keyboardEvent);

        const res = document.querySelector(css)
        // radio
        if (res) {
          if (res.type === 'radio') {
              window.__qQuery(css).each((id, elem) => {
                if (elem.value && (elem.value === val || elem.value === (val === "Yes"))) {
                    elem.click()
                  }
                else if (elem.id) {
                  let el = document.querySelector(`[for="${elem.id}"]`)
                  if (el && el.innerText === val) elem.click()
                }
              })
          }
          // text
          if (['text', 'tel' ,'number'].includes(res.type)) {
            document.querySelector(css).value = val
            document.querySelector(css).dispatchEvent(keyboardEvent)
        }
      }
      }, selector, val)
    } catch (err) {
      log.error(err)
    }
  }

  async run(input) {
  try {
      let description = (!(input.description instanceof Array)) ? Object.values(input.description) : input.description
      for (const action of description) {
        if (action.waitFor) {
          this.waitfor = action.waitFor
        } else  if (action.when) {
             const when = await this.$(`${action.when}`)
             if (!when || !when.length) return
          }
       else if(action.action) {
        await this.scroll()
          if (action.action === 'click') {
            await this.click(action.css, null , { waitFor: this.waitfor } )
          }
        } else {
         const res = await this.$(`${action.css}`)
         if (res && res.length) {
           let tagName = res[0].tagName
           let val = action.value

           if (tagName === 'INPUT') {
             await this.handleInputTag(action.css, val)
           } else if (tagName === 'SELECT') {
              await this.select(action.css, val)
          } else if (tagName === 'LABEL') {
              await this.page.evaluate(async(css, val) => {
                window.__qQuery(css).each((id, elem) => {
                  if (elem.innerText && (elem.innerText === val)) {
                      elem.click()
                    }
                })
              },action.css, val)
              } else {
             await this.click(action.css, null, { waitFor: this.waitfor } )
           }
          }
         }

         await new Promise((resolve) => {
              setTimeout(resolve, this.waitfor )
         })
      }
    } catch (err) {
      log.error(err)
      throw err
    }
  }

  async scroll() {
    await this.page.evaluate(async _ => { window.scrollBy(0, window.innerHeight) })
  }

  async fill(selector, value, context = null, triggerEvent = null) {
    await this.pendingNavigation()
    let element = await this.getClientElement(context, selector)
    if (element) {
      return element.type(value, { delay: 50 })
    } else {
      await this.execute(/* istanbul ignore next */ function(selector, value, context, triggerEvent) {
        return window.__scraping.fill(selector, value, context, triggerEvent)
      }, selector, value, context, triggerEvent)
    }
  }

  select(selector, text, value, context = null, options = null) {
    if (!value) value = ''

    return this.execute(/* istanbul ignore next */ function(selector, text, value, context, options) {
      return window.__scraping.select(selector, text, value, context, options)
    }, selector, text.toString(), value.toString(), context, options)
  }

  async executeWithRetries(handler) {
    while (true) {
      try {
        return await handler()
      } catch (err) {
        if (err.message.includes(MissingContextError)) {
          Q.log.debug('Missing context. Probably navigation. Retrying...')
          await Promise.delay(500)
        } else throw err
      }
    }
  }

  async click(selector, context, options = null) {
      options = options || {}
      let _this = this
      return this.executeWithRetries(async () => {
        await this.pendingNavigation()
        let element = await this.getClientElement(context, selector)
        let boundingBox = await element.boundingBox()
        if (boundingBox) {
          await element.click({ delay: 50 })
          await this.page.waitForNavigation({timeout: 3000}).then(() => {}, () => {
            log.debug('waitForNavigation -> Failed to load the URL after clicking')
            //this.browser.statusCode = (gotoResult && gotoResult._status) ? gotoResult._status : 503

          })
        } else {
          await this.execute(/* istanbul ignore next */ function(selector, context, options) {
            return window.__scraping.click(selector, context, options)
          }, selector, context, options)
        }
        // if (options.waitFor) await _this.waitFor(_this.waitFor, context)
      })
  }

  async executeHandle(func) {
    return this.executeWithRetries(async () => {
      func = istanbulPatch(func)
      let args = Array.prototype.slice.call(arguments, 1)
      await this.pendingNavigation()
      return this.page.evaluateHandle(func, ...args)
    })
  }

  async getClientElement(context, selector, defaultToBody = true) {
      return this.executeWithRetries(async () => {
        let contextElement = await this.executeHandle(/* istanbul ignore next */ function(context) {
          return window.__scraping.findElement(context)
        }, context).then(_ => _.asElement())

        if (defaultToBody) {
          contextElement = contextElement || await this.page.$('body').then(_ => _.asElement())
        }

        if (!selector) return contextElement

        return contextElement.$(selector)
      })
    }

  async extract({css, attr}) {
    return await this.page.evaluate(async(css, attr) => {
      if (attr) {
        //return document.querySelector(css).getAttribute(attr)
        return window.__qQuery(css).attr(attr)
      }
      //return document.querySelector(css).innerText
      return window.__qQuery(css).text()
    },css, attr) || 0
  }

  async waitFor(time) {
    await this.page.evaluate(async(time) => {
      await new Promise(function(resolve) {
             setTimeout(resolve, time)
      });
    },time)
  }
}

module.exports = Chrome
