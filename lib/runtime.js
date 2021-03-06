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
      backend = await factory.acquire(input.proxy)
      let statusCode = await backend.navigate(input.affordability)
      log.info( `${lender} statusCode`, statusCode )
      if (statusCode > 400) throw `request denied with status code: ${statusCode}`
      await backend.waitForOld(3000)
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
    await backend.waitForOld(1500)
    obj['extarcted'] = extarcted
    // look for price
    if (input.screenshot) {
      try {
        await backend.waitForOld(2000)
        let screenshot = await backend.generateScreenshot(input.screenshot, input.domain)
        obj['screenshot'] = screenshot
      } catch(err) {
        let screenshot = await backend.generateScreenshot({type: 'screenshot'}, input.domain)
        obj['screenshot'] = screenshot
      }
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
