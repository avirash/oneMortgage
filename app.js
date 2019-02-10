// const puppeteer = require('puppeteer')
// const _ = require('lodash')
// var fs = require('fs');
// const YAML = require('js-yaml')
// const Runtime = require('./lib/runtime')
// const co = require('co')
//
// let runtime = new Runtime()
// co(async function(){
//   await runtime.extract()
// })


const config = require('./config/config').get(process.env.NODE_ENV);
global.config = config

const Koa = require("koa");
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const router = require('./routes/calculators')
const koaCors = require('koa-cors')

const koaOptions = {
      origin: true,
      credentials: true,
      methods: ['GET', 'PUT', 'POST']
    };

app.use(bodyParser({
  json: {limit: '50mb', extended: true},
  urlencoded: {limit: '50mb', extended: true},
  formLimit: "5mb"
}));

app.use(router.routes());
app.use(koaCors(koaOptions))

log.info('listing to port 3000')
app.listen(3000);

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

// const map = { numOfApplying: ['How many people are applying?'],
//               numOfDependants: ['Number of dependants'],
//               annualIncome: ['Annual income (before tax)'],
//               otherAnnualIncome: ['Other annual income (before tax)'],
//               monthlyCommitments: ['Monthly commitments'],
//
//               existingMortgageCustomer: ['existingMortgageCustomer'],
//               existingCurrentAccountCustomer: ['existingCurrentAccountCustomer'],
//               mortgFor: ['radioMortgFor']
//             }


// let args = [
//   '--no-sandbox',
//   '--disable-setuid-sandbox',
//   // According to: https://github.com/GoogleChrome/puppeteer/issues/1193
//   '--ignore-certificate-errors',
//   'about:blank'
// ]
//
// let defaultOptions = {
//   headless: false,
//   devtools: true,
//   ignoreHTTPSErrors: true,
//   args
// }
//
// var contents = fs.readFileSync('lloydsbank.yml', 'utf8');
// let context = YAML.safeLoad(contents)
// let description = context.description;
//
//
//
// puppeteer.launch(defaultOptions).then(async browser => {
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1280, height: 1024 })
//   await page.goto('https://www.lloydsbank.com/mortgages/mortgage-calculator.asp#p:inputs');
//   await page.waitForNavigation({timeout: 3000}).then(() => {}, () => {
//         console.log('done loading')
//   })
//
//   await page.on('console', function(ev) {
//         console.log({ type: ev.type }, `--- chrome --- ${ev.text()}`)
//       })
//   await page.on('error', function(err) {
//     console.log({ err }, '--- chrome error ---')
//   })
//   await page.on('pageerror', function(err) {
//     console.log({ err }, '--- chrome unhandled error ---')
//   })
//
//   await page.evaluate(async(description, input) => {
//       await new Promise(function(resolve) {
//              setTimeout(resolve, 5000)
//       });
//
//       for (const action of description) {
//         if (action.action) {
//           if (action.action === 'click') {
//             document.querySelector(action.css).click()
//           }
//         } else {
//
//          const res = document.querySelector(action.css)
//          if (res) {
//            let tagName = res.tagName
//            let val = input[action.inputName]
//            if (tagName === 'INPUT') {
//              // radio
//              if (res.type === 'radio') document.querySelector(`${action.css}[value="${val}"]`).click()
//              // text
//              if (res.type === 'tel') {
//                document.querySelector(action.css).value = val.toString()
//                $(action.css).keyup();
//              }
//            } else if (tagName === 'SELECT') {
//                for (var option of res.options ) {
//                     if (val === option.innerText) {
//                       res.selectedIndex = option.index
//                     }
//                   }
//            }
//            console.log(action);
//          }
//          }
//
//          await new Promise(function(resolve) {
//                 setTimeout(resolve, 1500)
//          });
//       }
//       await new Promise(function(resolve) {
//              setTimeout(resolve, 15000)
//       });
//   }, description, input);
//
//
//   await browser.close();
// });
