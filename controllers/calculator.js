const Runtime = require('../lib/runtime')
const co = require('co')

let runtime = new Runtime()
const retries = 3
// function initialize() {
//
//   let runtime = new Runtime()
//   await runtime.extract()
//
//   // new Promise(async resolve => {
//   //   return resolve(await clicksHendler.initialize())
//   // });
// }
//
// initialize();

exports.aff_calc = async (ctx) => {
  const input = ctx.request.body
  // console.log(ctx.request.body)
  // console.log(input);
  if (input) {
    let results = []
    let currentRetry = 0
//    while ( currentRetry < 3 ) {
      console.log('currentRetry: ' + currentRetry);
      try {
          results = await runtime.extract(input)
          if (results && results.length) {
            let result = results[0]
            // console.log('result: ' + JSON.stringify(result))
            let priceObject = result.extarcted.find(x => x.price )
            console.log('priceObject: ' + priceObject)
            console.log('priceObject: ' + priceObject.price)
            if (priceObject && Math.round(priceObject.price.replace(/[^\d.-]/g, '')) === 0) {
              currentRetry ++
            } else {
              currentRetry = 3
            }
          } else {
            currentRetry ++
          }
        } catch (err) {
          console.log(err);
            currentRetry ++
        }
    //}
    ctx.body = {
      input: ctx.request.body,
      results,
      status: 'success'
    }
    ctx.status = 200
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  } else {
    ctx.status = 500
  }
}
