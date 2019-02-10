const Metadata = require('../lib/metadata')
const co = require('co')

let metadata = new Metadata()

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

exports.getExtractionInput = async (ctx) => {
  //console.log('body ' + JSON.stringify(ctx.request.body));
  const input = ctx.request.body
  // console.log(input)
  if (input) {
    let results = await metadata.generateExtractionInput(input)
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
