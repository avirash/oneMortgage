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
    await this.page.setViewport({width: 1280, height: 1024})
    this.navigation = []

    await this.page.on('console', function(ev) {
      console.log({ type: ev.type }, `--- chrome --- ${ev.text()}`)
    })
    await this.page.on('error', function(err) {
      console.log({ err }, '--- chrome error ---')
    })
    await this.page.on('pageerror', function(err) {
      console.log({ err }, '--- chrome unhandled error ---')
    })

    await this.page.setRequestInterception(true)
    await this.page._client.on('Network.requestIntercepted', request => {
      const { resourceType, authChallenge, interceptionId, request: { url, headers } } = request

      if (!interceptionId) return

      if (url && isBlacklistedUrl(url)) {
        console.log({ url }, 'Blocked')
        return this.page._client.send('Network.continueInterceptedRequest', {
          interceptionId,
          errorReason: 'Aborted'
        })
      }
      if (!authChallenge && resourceType === 'Document') {
        console.log('******* WILL NAVIGATE *********')
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

      this.page._client.send('Network.continueInterceptedRequest', {
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
        console.log({ ev }, '******* DID FINISH LOAD *********')
        await this.initializePage()
          .then(() => unresolvedNavigation.__resolve(true))
          .catch(err => console.log({ err }, 'Unable to initialize page'))
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
    console.log({ url }, 'ChromeBackend.navigate')
    await this.page.goto(url, { timeout: 60000 }).then((gotoResult) => { })
    await this.pendingNavigation()
  }

  async pendingNavigation() {
    console.log('******* Checking navigation finished *********')
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
      await this.page.evaluate(async(css, val) => {
        const res = document.querySelector(css)
        // radio
        if (res) {
          if (res.type === 'radio') {
              window.__qQuery(css).each((id, elem) => {
                // console.log(elem.value || 'no value');
                // console.log(val);
                if (elem.value && (elem.value === val || elem.value === (val === "Yes"))) {
                    elem.click()
                  }
                else if (elem.id) {
                  // console.log(elem.id);
                  let el = document.querySelector(`[for="${elem.id}"]`)
                  if (el && el.innerText === val) elem.click()
                }
              })
          }
          // text
          if (['text', 'tel' ,'number'].includes(res.type)) {
            document.querySelector(css).value = val
            // val.toString().split('').forEach((x) => {
            //    document.querySelector(css).value += x.toString()
            //    // window.__qQuery(action.css).keydown();
            //    // window.__qQuery(action.css).keyup();
            //  })
             // await this.fill(css, val)
        }
      }
      }, selector, val)
  }


  async run(input) {
    for (const action of Object.values(input.description)) {
      if (action.waitFor) {
        this.waitfor = action.waitFor
      }
     else if(action.action) {
      //  await this.scroll()
        if (action.action === 'click') {
          await this.click(action.css, null , { waitFor: this.waitfor } )
        }
      } else {
       const res = await this.$(`${action.css}`)
       if (res && res.length) {
         let tagName = res[0].tagName
         let val = action.value

         if (tagName === 'INPUT') {
           // console.log(JSON.stringify(action))
           await this.handleInputTag(action.css, val)
         } else if (tagName === 'SELECT') {
            await this.select(action.css, val)
         } else {
           // console.log(action.css);
           await this.click(action.css, null, { waitFor: this.waitfor } )
         }
        }
       }

       await new Promise((resolve) => {
            setTimeout(resolve, this.waitfor )
       })
    }
  }

  // async run(context, input) {
  //   for (const action of context.description) {
  //     if (action.waitFor) {
  //       this.waitfor = action.waitFor
  //     }
  //    else if(action.action) {
  //       await this.scroll()
  //       if (action.action === 'click') {
  //         await this.click(action.css, null , { waitFor: this.waitfor } )
  //       }
  //     } else {
  //      const res = await this.$(action.css)
  //      if (res && res.length) {
  //        let tagName = res[0].tagName
  //        let val = input[action.inputName]
  //
  //        if (tagName === 'INPUT') {
  //          console.log(JSON.stringify(action))
  //          await this.handleInputTag(action.css, val)
  //        } else if (tagName === 'SELECT') {
  //           await this.select(action.css, val)
  //        }
  //       }
  //      }
  //
  //      await new Promise((resolve) => {
  //           setTimeout(resolve, this.waitfor )
  //      })
  //   }
  // }
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
            console.log('waitForNavigation -> Failed to load the URL after clicking')
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
        return document.querySelector(css).getAttribute(attr)
      }
      return document.querySelector(css).innerText
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
