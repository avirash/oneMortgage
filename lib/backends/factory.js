const Puppeteer = require('puppeteer')
const Backend = require('./chrome')
const _ = require('lodash')
const userAgentProvider = require('./../user_agent_provider')
const proxyProvider = require('./../../services/proxy.js')
const luminatiProxy = require('./../../services/luminatiProxy.js')

module.exports = class ChromeFactory {
  constructor () {
    // this.luminatiProxy = new LuminatiProxy()
  }

  async initialize() {
  }

  getChromeArgs(proxyType) {
      let args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
  // According to: https://github.com/GoogleChrome/puppeteer/issues/1193
      '--ignore-certificate-errors',
      'about:blank'
    ]
    this.proxy =  (proxyType && proxyType === 'luminati') ? luminatiProxy.acquire() : proxyProvider.acquire()
    log.info(proxyType)
    // this.proxy = luminatiProxy.acquire()
    if (this.proxy) args.push(`--proxy-server=http://${this.proxy.host}:${this.proxy.port}`)
    return args
  }


  getChromeOptions(proxyType) {
    let configOptions = {}
    let defaultOptions = {
      // headless: false,
      // devtools: true,
      ignoreHTTPSErrors: true,
      args: this.getChromeArgs(proxyType)
    }
    return _.merge(defaultOptions, configOptions)
  }

  async acquire(proxyType) {
    let options = this.getChromeOptions(proxyType)
    let browser = await Puppeteer.launch(options)
    let backend = new Backend(browser)
    await backend.initialize()
    await backend.setUserAgent(userAgentProvider.getUserAgent())
    await backend.setProxy(this.proxy.user, this.proxy.pwd)
    return backend
  }

  release(backend) {
    return backend.browser.close()
  }
}
