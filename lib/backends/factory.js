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

  getChromeArgs() {
      let args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
  // According to: https://github.com/GoogleChrome/puppeteer/issues/1193
      '--ignore-certificate-errors',
      'about:blank'
    ]
    this.proxy =  proxyProvider.acquire()
    //this.proxy = luminatiProxy.acquire()
    if (this.proxy) args.push(`--proxy-server=http://${this.proxy.host}:${this.proxy.port}`)
    return args
  }


  getChromeOptions(ctx) {
    let configOptions = {}
    let defaultOptions = {
      // headless: false,
      // devtools: true,
      ignoreHTTPSErrors: true,
      args: this.getChromeArgs(ctx)
    }
    return _.merge(defaultOptions, configOptions)
  }

  async acquire(ctx) {
    let options = this.getChromeOptions(ctx)
    let browser = await Puppeteer.launch(options)
    let backend = new Backend(browser)
    await backend.initialize(ctx)
    await backend.setUserAgent(userAgentProvider.getUserAgent())
    await backend.setProxy(this.proxy.user, this.proxy.pwd)
    return backend
  }

  release(backend) {
    return backend.browser.close()
  }
}
