const _ = require('lodash')
const fs = require('fs');
const lenders = []
class Metadata {

  constructor(){
    fs.readdirSync('./descriptions/').forEach(file => {
      fs.readFile(`./descriptions/${file}`, 'utf8', function (err, data) {
        if (err) throw err;
    //   if (file.includes('barclays')) {
      if (file.endsWith('json')) {
          let obj = JSON.parse(data)
          lenders.push(obj)
          }
        })
    })
  }

  process(processor) {
      /* eslint no-new-func: 0 */
      var myFunction = new Function('return ' + processor)
      return myFunction()
    }

  async generateExtractionInput(input) {

    let results = []
    for (const lender of lenders) {
      let lenderObject = {
        domain: lender.domain,
        logo: lender.logo,
        affordability: lender.affordability,
        lender: lender.lender,
        proxy: (lender.proxy) ? lender.proxy : 'proxyPool'
      }
      let description = []

      await this.addElement(input, lender.mapping, description)
      lenderObject['description'] = description
      lenderObject['extraction'] = lender.extraction
      lenderObject['screenshot'] = lender.screenshot
      results.push(lenderObject)
      }
      log.info(JSON.stringify(results));
    return results
  }

    async editValue(term, value, input){

      if ((typeof value) === 'object' && term.includes('length')) return value.length
      if (value) term = term.replace(/@value/g, value)

      if (term.includes('input[')){
        let matched = term.match(/input\[(.*?)]/g)
        matched.forEach(x => {
          term = term.replace(x, input[x.replace('input\[', '').replace(']','')])
        })
      }
      return this.process(term)
    }

    remove(array, element) {
      if (array && array.length) {
      const index = array.indexOf(element);
      array.splice(index, 1);
      }
      return []
    }

    async arrayOfChoices(lender, input, description) {
      for (var lenderKey of Object.keys(lender)) {
        if (lenderKey !== 'css' && lenderKey !== 'logic') {
        let i = 1
        for (let inp of input) {
          let nestedLenderConfig = lender[lenderKey]
          let newKey = `${lender[lenderKey].css}${i}`
          let keyName  = `${lenderKey}${i}`
          if (inp[keyName]) {
            let obj = {
                css: newKey,
                value: inp[keyName],
                name: `${lenderKey}${i}`,
                line: '364'
              }
           description.push(obj)
          }
          let newKey1 = nestedLenderConfig[inp[keyName]]
          if (newKey1) {
           await this.addElementIndex(inp, newKey1, description, i)
            }
           i++
        }
      }
    }
    }

    async addElementIndex(input, lenderObj, description, index) {
      if (lenderObj) {
     let array = []
      for (var lenderKey of Object.keys(lenderObj)) {
        let lenderVal = lenderObj[lenderKey]
        if (Object.keys(lenderVal).length === 1) {
          description.push({
                css: (lenderVal.css && lenderVal.css.split(' ').length > 1 && lenderVal.css.split(' ')[1].endsWith('"]')) ? lenderVal.css.split(' ')[1].replace(`']`,`${index}']`) : `${lenderVal.css}${index}`,
                value:  (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[`${lenderKey}${index}`], input ) : input[`${lenderKey}${index}`],
                name: `${lenderKey}${index}`,
                line: '432'
              })
        } else {
          let test = (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[`${lenderKey}${index}`], input ) : input[`${lenderKey}${index}`]
          description.push({
              css: (lenderVal.css && lenderVal.css.split(' ').length > 1 && lenderVal.css.split(' ')[1].endsWith(`']`)) ? lenderVal.css.split(' ')[1].replace(`']`,`${index}']`) : `${lenderVal.css}${index}`,
              value:  (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[`${lenderKey}${index}`], input ) : input[`${lenderKey}${index}`],
              name: `${lenderKey}${index}`,
              line: '439'
            })
          let editedKey = (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[`${lenderKey}${index}`], input ) : input[`${lenderKey}${index}`]
          let smallerLenderObj = lenderVal[editedKey]
          await this.addElementIndex(input, smallerLenderObj, description, index)
        }
      }
    }
    }

    async addElement(input, lenderObj, description) {
      if (lenderObj) {
        let inputKeys = Object.keys(input)
        for (var lenderKey of Object.keys(lenderObj)) {
          let lenderVal = lenderObj[lenderKey]
          if (lenderKey === 'mortgageDetails'  || lenderKey === 'mortgageDetailsFree') {
            if (input[lenderKey] && input[lenderKey].length) {
              description.push({
                css: lenderVal.css,
                value: input[lenderKey].length,
              })
                await this.arrayOfChoices(lenderObj[lenderKey], input[lenderKey], description)
            }
            continue
          }
          if (lenderKey === 'waitFor') {
            description.push({
              waitFor: lenderVal
            })
            continue
          }
          if (lenderKey === 'when') {
            description.push({
              when: lenderVal
            })
            continue
          }
          if (lenderKey.toString().startsWith('click')) {
            description.push({
              css: lenderVal,
              action: 'click',
            })
            continue
          }
          if (inputKeys.includes(lenderKey) || lenderVal.new) {
           if (Object.keys(lenderVal).length > 2) {
              description.push({
                css: lenderVal.css,
                value: (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[lenderKey], input ) : input[lenderKey],
                name: lenderKey
              })
              let smallerLenderObj = lenderVal
              let editedKey = (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[lenderKey], input ) : input[lenderKey]
              await this.addElement(input, smallerLenderObj[editedKey], description)
            } else {
              description.push({
                  css: lenderVal.css,
                  value:  (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[lenderKey], input ) : input[lenderKey],
                  name: lenderKey
                })
            }
          }
        }
    }
    }
  getLoanValue(propertyValue, loanValue) {
    return ((propertyValue - loanValue) / propertyValue) * 100
  }

  getNumOfApplying(lender, numOfApplying, numOfdependants) {
      if (lender.value === 'ApplyingAndDependant') return parseInt(numOfApplying) + numOfdependants
      let values = lender.value.split(';')
      if (numOfApplying=== '1') return values[0]
      return values[1]
  }

  getDependents(input, lender) {
    let { childUnder5, childUnder11, childUnder17,childOver18 } = input
    let sum = parseInt(childUnder5) + parseInt(childUnder11) + parseInt(childUnder17) + parseInt(childOver18)
    if (lender.dependantChildren) {
      if (lender.dependantChildren === 'ApplyingAndDependant') return parseInt(input.numOfApplying) + sum
    }
    return sum
  }

  getMortgageSchema(value, meta) {
    if (meta['Yes'] && meta['Yes'].includes(value)) return 'Yes'
    if (meta['No'] && meta['No'].includes(value)) return 'No'
    return 'No'
  }

}

module.exports = Metadata
