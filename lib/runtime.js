const dir = 'dsls'
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const ChromeFactory = require('./backends/factory')
const YAML = require('js-yaml')

// const input = {
//   numOfApplying: 2,
//   numOfDependants: 1,
//   annualIncome: 70000,
//   otherAnnualIncome: 0,
//   monthlyCommitments: 1000,
//   mortgageTerm: '20',
//   existingMortgageCustomer: 'Yes',
//   existingCurrentAccountCustomer: 'Yes',
//   mortgFor: 'Moving to another home'
// }

class Runtime {

  async timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // async extract(input) {
  //   let results = []
  //   let contents = await fs.readFileSync(`${dir}/${input.domain}.yml`, 'utf8');
  //   let context = YAML.safeLoad(contents)
  //   console.log(context);
  //
  //   let factory = new ChromeFactory()
  //   let backend = await factory.acquire()
  //   let domain = context.domain
  //   let lender = context.lender
  //   let logo = context.logo
  //   await backend.navigate(context.affordability)
  //   await this.timeout(3000)
  //   try {
  //     await backend.run(context ,input)
  //
  //   await this.timeout(2000)
  //   let obj = {
  //     domain,
  //     lender,
  //     logo
  //   }
  //   let extarcted = []
  //   if (context.extraction) {
  //     for (const attr of Object.keys(context.extraction)) {
  //       let res = await backend.extract(context.extraction[attr])
  //       let o = {}
  //       o[attr] = res
  //       extarcted.push(o)
  //     }
  //   }
  //   obj['extarcted'] = extarcted
  //   results.push(obj)
  //   // let price = await backend.extract(context.extraction.price)
  //
  //   // await this.timeout(3000)
  //   } catch(err) { console.log(err) }
  //   finally {
  //     await factory.release(backend)
  //     console.log(JSON.stringify(results))
  //     return  results
  //   }
  // }
  async extract(input) {
    let results = []
    //let contents = await fs.readFileSync(`${dir}/${input.domain}.yml`, 'utf8');
    // let context = YAML.safeLoad(contents)
    console.log(input);

    let factory = new ChromeFactory()
    let backend = await factory.acquire()
    let domain = input.domain
    let lender = input.lender
    let logo = input.logo
    await backend.navigate(input.affordability)
    await this.timeout(3000)
    try {
      await backend.run(input)
      await this.timeout(2000)
    let obj = {
      domain,
      lender,
      logo
    }
    let extarcted = []
    if (input.extraction) {
      for (const attr of Object.keys(input.extraction)) {
        let res = await backend.extract(input.extraction[attr])
        let o = {}
        o[attr] = res
        extarcted.push(o)
      }
    }
    obj['extarcted'] = extarcted
    results.push(obj)
    let price = await backend.extract(input.extraction.price)

    await this.timeout(3000)
    } catch(err) { console.log(err) }
    finally {
      await factory.release(backend)
      console.log(JSON.stringify(results))
      return  results
    }
  }
}

module.exports = Runtime
