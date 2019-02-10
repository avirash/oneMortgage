const Puppeteer = require('puppeteer')
const Backend = require('./chrome')
const _ = require('lodash')
const userAgentProvider = require('./../user_agent_provider')
const MAX_INT = 2147483647

module.exports = class ChromeFactory {
  async initialize() {}

  getChromeArgs() {
    let args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // According to: https://github.com/GoogleChrome/puppeteer/issues/1193
      '--ignore-certificate-errors',
      'about:blank'
    ]

    args.push(`--proxy-server=http://zproxy.luminati.io:22225`)
    return args
  }

  // host:  zproxy.luminati.io
  //   port:  22225
  //   usernamePrefix: lum-customer-wiser-zone-route3-dns-remote
  //   password: ef5176970122
  getChromeOptions(ctx) {
    // let configOptions = Q.config.get('chrome.options', {})
    let configOptions = {}
    let defaultOptions = {
      // headless: true,
      headless: false,
      devtools: true,
      ignoreHTTPSErrors: true,
      //args: this.getChromeArgs(ctx)
    }
    return _.merge(defaultOptions, configOptions)
  }

  async acquire(ctx) {
    const random = Math.floor(Math.random() * MAX_INT) + 1
    let user = `lum-customer-wiser-zone-gen-country-us-session-rand${random}`
    let pass = `ef5176970122`

    let options = this.getChromeOptions(ctx)
    let browser = await Puppeteer.launch(options)
    let backend = new Backend(browser)
    await backend.initialize(ctx)
    await backend.setUserAgent(userAgentProvider.getUserAgent())
    await backend.setProxy(user, pass)
    return backend
  }

  release(backend) {
    return backend.browser.close()
  }
}
