const dir = 'dsls'
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const ChromeFactory = require('./backends/factory')
const YAML = require('js-yaml')

class Runtime {

  async timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async extract(input) {
    let results = []
    let factory = new ChromeFactory()
    let backend = await factory.acquire()
    let domain = input.domain
    let lender = input.lender
    let logo = input.logo

    try {
      let statusCode = await backend.navigate(input.affordability)
      log.info('statusCode', statusCode)
      if (statusCode > 400) throw `request denied with status code: ${statusCode}`
      await this.timeout(3000)
      await backend.run(input)
      //await this.timeout(2000)
    let obj = {
      domain,
      lender,
      logo
    }
    let extarcted = []
    log.info(input.extraction);
    if (input.extraction) {
      for (const attr of Object.keys(input.extraction)) {
        let res = await backend.extract(input.extraction[attr])
        let o = {}
        o[attr] = res
        extarcted.push(o)
      }

    }
    //await factory.release(backend)
    obj['extarcted'] = extarcted
    results.push(obj)
    // await this.timeout(3000)
  } catch(err) {
    log.error(err)
   }
    finally {
      await factory.release(backend)
      return results
    }
  }
}

module.exports = Runtime
