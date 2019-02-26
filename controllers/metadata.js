const Metadata = require('../lib/metadata')
const co = require('co')

let metadata = new Metadata()

exports.getExtractionInput = async (ctx) => {
  const input = ctx.request.body  
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
