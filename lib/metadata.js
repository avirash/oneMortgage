// const lenders = [
//  { lender: 'halifax-intermediaries_co_uk',
//     mortgageSchema:  { Yes: ['Help to Buy Equity Share', 'Shared Equity', 'Shared Ownership'] }
//   },
//   { lender: 'rbsintermediaries_hdddirectsolutions_co_uk',
//      numOfApplying: { value: 'ApplyingAndDependant' },
//      mortgageSchema: true,
//      loanValue: true,
//      monthlyCommitmented: true,
//      dependantChildren: 'ApplyingAndDependant' },
//   { lender: 'santanderforintermediaries_co_uk',
//     numOfApplying: { value: 'Single;Joint' },
//     mortgageSchema: { Yes: ['Help to Buy Equity Share']}
//   },
//   { lender: 'nationwide-intermediary_co_uk',
//     numOfApplying: { value: 'One;Two' }
//   }
// ]


const lenders = [
  // {
  //   // lender: 'nationwide-intermediary_co_uk',
  //   lender: 'Nationwide',
  //   logo: 'nationwide',
  //   domain: 'nationwide-intermediary.co.uk',
  //   affordability: 'https://www.nationwide-intermediary.co.uk/calculators/affordability-calculator',
  //     mapping: {
  //     waitFor: 2000,
  //     numOfApplying: {
  //       css: '[name="AffCalc-q0-NumberOfApplicants"]',
  //     },
  //     mortgageType: {
  //       css: '[name="AffCalc-q1-ApplicationType"]',
  //     },
  //     loanValue: {
  //       css: '#AffCalc-q2-BorrowingAmount',
  //     },
  //     mortgageTermmYears: {
  //       css: '#AffCalc-q3-MortgageTermYears',
  //     },
  //     mortgageTermmMounts: {
  //       css: '#AffCalc-q3-MortgageTermmMounts',
  //     },
  //     typeOfOwnerShip: {
  //       css: '#AffCalc-q4-OwnershipType',
  //        Standard: {
  //         foundHouse: {css: '#AffCalc-q6-PropertyFound' },
  //         legalStatus: { css: '#AffCalc-q7-PropertyTenure' },
  //         propertyType: { css: '#AffCalc-q8-PropertyType' },
  //         propertyValue: { css: '#AffCalc-q9-PurchasePrice' }
  //       },
  //       'Shared equity': {
  //         foundHouse: {
  //           css: '[name="AffCalc-q6-PropertyFound"]'
  //         },
  //         marketValue: { css: '#AffCalc-q5-MarketValue' },
  //         legalStatus: { css: '#AffCalc-q7-PropertyTenure' },
  //         propertyType: { css: '#AffCalc-q8-PropertyType' },
  //         purchasePrice: { css: '#AffCalc-q10-PurchasePrice' }
  //       },
  //       'Right to buy': {
  //         foundHouse: {css: '#AffCalc-q6-PropertyFound' },
  //         marketValue: { css: '#AffCalc-q5-MarketValue' },
  //         legalStatus: { css: '#AffCalc-q7-PropertyTenure' },
  //         propertyType: { css: '#AffCalc-q8-PropertyType' },
  //         propertyValue: { css: '#AffCalc-q9-PurchasePrice' }
  //       },
  //       'Shared ownership': {
  //         foundHouse: {css: '#AffCalc-q6-PropertyFound' },
  //         marketValue: { css: '#AffCalc-q5-MarketValue' },
  //         legalStatus: { css: '#AffCalc-q7-PropertyTenure' },
  //         propertyType: { css: '#AffCalc-q8-PropertyType' },
  //         purchasePrice: {css: '#AffCalc-q10-PurchasePrice' }
  //       }
  //     },
  //     click1: 'fieldset.Affordability-step.Affordability-step--0 > div.Affordability-stepFooter > a'
  //     }
  //   },
  {
    lender: 'Santander',
    domain: 'santanderforintermediaries.co.uk',
    affordability: 'https://www.santanderforintermediaries.co.uk/calculators-and-forms/affordability/',
    logo: 'santander',
    mapping: {
      waitFor: 1000,
      numOfApplying: {
        css: '[name="ApplicationType"]',
        logic: `(@value === 1) ? 'Single': 'Joint'`
      },
      numOfdependants: {
        css: '#tbFinancialDependents'
      },
      mortgageType: {
        css: '[name="MortgageType"]',
        logic: `'Purchase'`
      },
      deopsit: {
        css: '#tbDeposit',
        logic: 'parseInt(input[propertyValue]) - parseInt(input[loanValue])',
        new: true
      },
      methodOfRepayment: {
        css: '#ddlMethodRepayment',
        "Capital and interest": {
          mortgageTermmYears: {
            css: '#tbLoanTermYears'
          },
          mortgageTermmMounts: {
            css: '#tbLoanTermMonths'
          },
          mortgageSchema: {
            css: '#mortgageSchema',
            Yes: {
              css: '#rbEquityLoanSchemeYes',
              equityLoan: {
                css: '#tbEquityLoanAmount',
                logic: 'parseInt(input[propertyValue]) - parseInt(input[loanValue])',
              }
            },
            No: {
              css: '#rbEquityLoanSchemeNo'
            }
          }
        },
        "Interest only - sale of mortgaged property": {
          mortgageTermmYears: {
            css: '#tbLoanTermYears'
          },
          mortgageTermmMounts: {
            css: '#tbLoanTermMonths'
          },
          "ageNextBirthday": {
            css: '#tbHowOldApplicant',
            logic: '(new Date().getFullYear() - parseInt(input[yearOfBirth])) + 1',
            new: true

          }
        },
        "Interest only - endowment or investment": {
          mortgageTermmYears: {
            css: '#tbLoanTermYears'
          },
          mortgageTermmMounts: {
            css: '#tbLoanTermMonths'
          },
          "ageNextBirthday": {
            css: '#tbHowOldApplicant',
            logic: '(new Date().getFullYear() - parseInt(input[yearOfBirth])) + 1',
            new: true

          }
        },
        "Part and part - sale of mortgaged property": {
          mortgageTermmYears: {
            css: '#tbLoanTermYears'
          },
          mortgageTermmMounts: {
            css: '#tbLoanTermMonths'
          },
          "ageNextBirthday": {
            css: '#tbHowOldApplicant',
            logic: '(new Date().getFullYear() - parseInt(input[yearOfBirth])) + 1',
            new: true

          },
          equityLoan: {
            css: '#tbAmountInterestOnly',
            logic: 'parseInt(input[propertyValue]) - parseInt(input[loanValue])',
          }
        },
        "Part and part - endowment or investment": {
          mortgageTermmYears: {
            css: '#tbLoanTermYears'
          },
          mortgageTermmMounts: {
            css: '#tbLoanTermMonths'
          },
          "ageNextBirthday": {
            css: '#tbHowOldApplicant',
            logic: '(new Date().getFullYear() - parseInt(input[yearOfBirth])) + 1',
            new: true

          },
          equityLoan: {
            css: '#tbAmountInterestOnly',
            logic: 'parseInt(input[propertyValue]) - parseInt(input[loanValue])',
          }
        }
      }
      }
    }

]

class Metadata {

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
        lender: lender.lender
      }
      let description = []
      await this.addElement(input, lender.mapping, description)
      console.log(description);
      lenderObject['description'] = description
      results.push(lenderObject)
      }
    return results
  }

    async editValue(term, value, input){

      console.log(input);
      if (value) term = term.replace(/@value/g, value)

      if (term.includes('input[')){
        let matched = term.match(/input\[(.*?)]/g)
        matched.forEach(x => {
          term = term.replace(x, input[x.replace('input\[', '').replace(']','')])
        })
        // term = term.replace(/input/g, input[propertyValue])
      }
      console.log(term);
      return this.process(term)
    }

    async addElement(input, lenderObj, description) {
      let inputKeys = Object.keys(input)
      for (var lenderKey of Object.keys(lenderObj)) {
        let lenderVal = lenderObj[lenderKey]
        if (lenderKey === 'waitFor') {
          description.push({
            waitFor: lenderVal
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
        if (inputKeys.includes(lenderKey)) {
         if (Object.keys(lenderVal).length > 2) {
            description.push({
              css: lenderVal.css,
              value: (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[lenderKey], input ) : input[lenderKey],
              name: lenderKey
            })
            let smallerLenderObj = lenderVal
            await this.addElement(input, smallerLenderObj[input[lenderKey]], description)
          } else {
            description.push({
                css: lenderVal.css,
                value:  (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[lenderKey], input ) : input[lenderKey],
                name: lenderKey
              })
          }
        } else {
          if (lenderVal.new) {
            description.push({
                css: lenderVal.css,
                value:  (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[lenderKey], input ) : input[lenderKey],
                name: lenderKey
              })
          }
        }
      }
    }
    // async addElement(input, lender, lenderObject) {
    //   let keys = Object.keys(input)
    //   for (var inputKey of keys) {
    //     let inputVal = input[inputKey]
    //     if (lender[inputKey]) {
    //       if (typeof lender[inputKey] === 'object') {
    //         lenderObject[inputKey] = {
    //           css: lender[inputKey].css,
    //           value: inputVal
    //         }
    //         let smallerLender = lender[inputKey]
    //         delete input[inputKey];
    //         await this.addElement(input, smallerLender[inputVal], lenderObject)
    //       } else {
    //         lenderObject[inputKey] = {
    //           css: lender[inputKey],
    //           value: inputVal
    //         }
    //         delete input[inputKey];
    //       }
    //    }
    //   }

      // return lenderObject
    //}
  // async generateExtractionInput(input) {
  //   let results = []
  //   for (const lender of lenders) {
  //     let lenderObject = {
  //       domain: lender.lender
  //     }
  //     Object.keys(input).forEach( inputKey => {
  //       let value = input[inputKey]
  //       lenderObject['numOfdependants'] = this.getDependents(input, lender)
  //       lenderObject['dependantChildren'] = (lenderObject.dependantChildren === 0 ) ? "No" : "Yes"
  //       lenderObject['deposit'] = parseInt(input.propertyValue) - parseInt(input.loanValue)
  //
  //       if (lender[inputKey] ) {
  //         if (inputKey === 'numOfApplying') value = this.getNumOfApplying( lender[inputKey], value, lenderObject.numOfdependants )
  //         if (inputKey === 'loanValue') value = Math.floor(this.getLoanValue( input.propertyValue, input.loanValue ))
  //         if (inputKey === 'mortgageSchema') value = this.getMortgageSchema(value, lender[inputKey])
  //         if (inputKey === 'monthlyCommitmented') value = (input.monthlyCommitmented === 'No') ? 0 : 1
  //       }
  //
  //       lenderObject[inputKey] = value
  //     })
  //
  //     results.push(lenderObject)
  //   }
  //
  //   return results
  // }



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
