const dir = 'dsls'
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const ChromeFactory = require('./backends/factory')
const YAML = require('js-yaml')

class Runtime {

  async extract(input) {
    let results = []
    let factory = new ChromeFactory()

    let domain = input.domain
    let lender = input.lender
    let logo = input.logo
    let backend
    try {
      backend = await factory.acquire()
      let statusCode = await backend.navigate(input.affordability)
      log.info( `${lender} statusCode`, statusCode)
      if (statusCode > 400) throw `request denied with status code: ${statusCode}`
      await backend.waitFor(3000)
      await backend.run(input)
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
    await backend.waitFor(2000)
    obj['extarcted'] = extarcted
    if (input.screenshot) {
      await backend.waitFor(2000)
      let screenshot = await backend.generateScreenshot(input.screenshot, input.domain)
      obj['screenshot'] = screenshot
    }
    results.push(obj)
  } catch(err) {
    log.error(err)
   }
    finally {
      //if (await fs.existsSync(`tmp/${backend.id}`)) await fs.unlinkAsync(`tmp/${backend.id}`)
      await factory.release(backend)
      return results
    }
  }
}

module.exports = Runtime
