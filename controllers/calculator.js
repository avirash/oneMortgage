const Runtime = require('../lib/runtime')
const co = require('co')

let runtime = new Runtime()
const retries = 3

exports.aff_calc = async (ctx) => {
  ctx.request.socket.setTimeout(5 * 60 * 1000);
  const input = ctx.request.body
  if (input) {
    let results = []
    let currentRetry = 0
   while ( currentRetry < 3 ) {
      try {
          results = await runtime.extract(input)
          if (results && results.length) {
            let result = results[0]
            let priceObject = result.extarcted.find(x => x.price )
            log.info('priceObject: ' + result.lender)
            //log.info('priceObject: ' + (priceObject && priceObject.price) ? priceObject.price : null)
            currentRetry = 3
            // if (priceObject && Math.round(priceObject.price.replace(/[^\d.-]/g, '')) === 0) {
            //   currentRetry ++
            // } else {
            //   currentRetry = 3
            // }
          } else {
            currentRetry ++
          }
        } catch (err) {
          log.error(err);
            currentRetry ++
        } finally {
          ctx.body = {
            input: ctx.request.body,
            results,
            status: 'success'
          }
          ctx.status = 200
          ctx.set('Access-Control-Allow-Origin', '*');
          ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        }
   }
  } else {
    ctx.status = 500
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  }
}
