const _ = require('lodash')
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
  // {
  //   lender: 'Santander',
  //   domain: 'santanderforintermediaries.co.uk',
  //   affordability: 'https://www.santanderforintermediaries.co.uk/calculators-and-forms/affordability/',
  //   logo: 'santander',
  //   mapping: {
  //     waitFor: 1000,
  //     numOfApplying: {
  //       css: '[name="ApplicationType"]',
  //       logic: `(@value === 1) ? 'Single': 'Joint'`
  //     },
  //     numOfdependants: {
  //       css: '#tbFinancialDependents',
  //       logic: 'parseInt(input[childUnder5]) + parseInt(input[childUnder11]) + parseInt(input[childUnder17]) + parseInt(input[childOver18])',
  //       new: true
  //
  //     },
  //     mortgageType: {
  //       css: '[name="MortgageType"]',
  //       logic: `'Purchase'`,
  //       new: true
  //     },
  //     deopsit: {
  //       css: '#tbDeposit',
  //       logic: 'parseInt(input[propertyValue]) - parseInt(input[loanValue])',
  //       new: true
  //     },
  //     methodOfRepayment: {
  //       css: '#ddlMethodRepayment',
  //       "Capital and interest": {
  //         mortgageTermYears: {
  //           css: '#tbLoanTermYears'
  //         },
  //         mortgageTermMonths: {
  //           css: '#tbLoanTermMonths'
  //         },
  //         typeOfOwnerShip: {
  //           css: '[name="EquityLoanScheme"]',
  //           logic: `('@value' === 'Help to Buy') ? 'Yes': 'No'`,
  //           Yes: {
  //             css: '#rbEquityLoanSchemeYes',
  //             equityLoan: {
  //               css: '#tbEquityLoanAmount'
  //             }
  //           },
  //           No: {
  //             css: '#rbEquityLoanSchemeNo'
  //           }
  //         }
  //       },
  //       "Interest only - sale of mortgaged property": {
  //         mortgageTermYears: {
  //           css: '#tbLoanTermYears'
  //         },
  //         mortgageTermMonths: {
  //           css: '#tbLoanTermMonths'
  //         },
  //         ageNextBirthday: {
  //           css: '#tbHowOldApplicant',
  //           logic: '(new Date().getFullYear() - parseInt(input[yearOfBirth])) + 1',
  //           new: true
  //
  //         }
  //       },
  //       "Interest only - endowment or investment": {
  //         mortgageTermYears: {
  //           css: '#tbLoanTermYears'
  //         },
  //         mortgageTermMonths: {
  //           css: '#tbLoanTermMonths'
  //         },
  //         ageNextBirthday: {
  //           css: '#tbHowOldApplicant',
  //           logic: '(new Date().getFullYear() - parseInt(input[yearOfBirth])) + 1',
  //           new: true
  //
  //         }
  //       },
  //       "Part and part - sale of mortgaged property": {
  //         mortgageTermYears: {
  //           css: '#tbLoanTermYears'
  //         },
  //         mortgageTermMonths: {
  //           css: '#tbLoanTermMonths'
  //         },
  //         ageNextBirthday: {
  //           css: '#tbHowOldApplicant',
  //           logic: '(new Date().getFullYear() - parseInt(input[yearOfBirth])) + 1',
  //           new: true
  //
  //         },
  //         requiredInterest: {
  //           css: '#tbAmountInterestOnly',
  //           logic: 'parseInt(input[propertyValue]) - parseInt(input[loanValue])',
  //         }
  //       },
  //       "Part and part - endowment or investment": {
  //         mortgageTermYears: {
  //           css: '#tbLoanTermYears'
  //         },
  //         mortgageTermMonths: {
  //           css: '#tbLoanTermMonths'
  //         },
  //         ageNextBirthday: {
  //           css: '#tbHowOldApplicant',
  //           logic: '(new Date().getFullYear() - parseInt(input[yearOfBirth])) + 1',
  //           new: true
  //
  //         },
  //         requiredInterest: {
  //           css: '#tbAmountInterestOnly',
  //           logic: 'parseInt(input[propertyValue]) - parseInt(input[loanValue])',
  //         }
  //       }
  //     },
  //     otherProperty: {
  //       css: '[name="OtherProperties"]'
  //     },
  //     borrowMoreThan90: {
  //       css: '[name="LTV90"]'
  //     },
  //     provideMoreDetails: {
  //       css: '[name="ProvideDetails"]'
  //     },
  //     click1: '#btnContinue',
  //     mortgageDetails: {
  //       css: '#ddlMortgagedProperties',
  //       logic: 'input[mortgageDetails].length',
  //       propertyUse: {
  //         css: '[id*="pnlMortgagedProperty"] #ddlPropertyUse',
  //         "It's already let": {
  //           estimatedPropertyValue: {
  //             css: '[id*="pnlMortgagedProperty"] #tbEstimatedPropertyValue'
  //           },
  //           mortgageBalance: {
  //             css: '[id*="pnlMortgagedProperty"] #tbMortgageBalance'
  //           },
  //           typeOfMortgage: {
  //             css: '[id*="pnlMortgagedProperty"] #ddlTypeOfMortgage',
  //             "Interest only": {
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrency: {
  //                 css:  '[id*="pnlMortgagedProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFees: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Repayment": {
  //               YearsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrency: {
  //                 css:  '[id*="pnlMortgagedProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFees: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Part and part": {
  //               repaymentBalance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbRepaymentBalance'
  //               },
  //               interestOnlyBalance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbInterestOnlyBalance'
  //               },
  //               YearsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrency: {
  //                 css: '[id*="pnlMortgagedProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFees: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             }
  //           }
  //         },
  //         "It's to be let": {
  //           estimatedPropertyValue: {
  //             css: '[id*="pnlMortgagedProperty"] #tbEstimatedPropertyValue'
  //           },
  //           mortgageBalance: {
  //             css: '[id*="pnlMortgagedProperty"] #tbMortgageBalance'
  //           },
  //           typeOfMortgage: {
  //             css: '[id*="pnlMortgagedProperty"] #ddlTypeOfMortgage',
  //             "Interest only": {
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrency: {
  //                 css:  '[id*="pnlMortgagedProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFees: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Repayment": {
  //               YearsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrency: {
  //                 css: '[id*="pnlMortgagedProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFees: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Part and part": {
  //               repaymentBalance: {
  //                 css: '[id*="pnlMortgagedProperty"]#tbRepaymentBalance'
  //               },
  //               interestOnlyBalance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbInterestOnlyBalance'
  //               },
  //               YearsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrency: {
  //                 css: '[id*="pnlMortgagedProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFees: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             }
  //           }
  //         },
  //         "Holiday home/second home (for own use)": {
  //           estimatedPropertyValue: {
  //             css: '[id*="pnlMortgagedProperty"] #tbEstimatedPropertyValue'
  //           },
  //           mortgageBalance: {
  //             css: '#tbMortgageBalance'
  //           },
  //           typeOfMortgage: {
  //             css: '[id*="pnlMortgagedProperty"] #ddlTypeOfMortgage',
  //             "Interest only": {
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilities: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTax: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Repayment": {
  //               YearsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilities: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTax: {
  //                 css:  '[id*="pnlMortgagedProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Part and part": {
  //               repaymentBalance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbRepaymentBalance'
  //               },
  //               interestOnlyBalance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbInterestOnlyBalance'
  //               },
  //               YearsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilities: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTax: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             }
  //           }
  //         },
  //         "Home for dependent relative": {
  //           estimatedPropertyValue: {
  //             css: '[id*="pnlMortgagedProperty"] #tbEstimatedPropertyValue'
  //           },
  //           mortgageBalance: {
  //             css: '[id*="pnlMortgagedProperty"] #tbMortgageBalance'
  //           },
  //           typeOfMortgage: {
  //             css: '[id*="pnlMortgagedProperty"] #ddlTypeOfMortgage',
  //             "Interest only": {
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilities: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTax: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '#tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Repayment": {
  //               YearsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilities: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTax: {
  //                 css:  '[id*="pnlMortgagedProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Part and part": {
  //               repaymentBalance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbRepaymentBalance'
  //               },
  //               interestOnlyBalance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbInterestOnlyBalance'
  //               },
  //               YearsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTerm: {
  //                 css: '[id*="pnlMortgagedProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePayment: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilities: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTax: {
  //                 css:  '[id*="pnlMortgagedProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenance: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRent: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForproperty: {
  //                 css: '[id*="pnlMortgagedProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             }
  //           }
  //         }
  //       }
  //     },
  //     mortgageDetailsFree: {
  //       css: '#ddlMortgageFreeProperties',
  //       logic: 'input[mortgageFreeDetails].length',
  //       propertyUseFree: {
  //         css: '[id*="pnlMortgageFreeProperty"] #ddlPropertyUse',
  //         "It's already let": {
  //           estimatedPropertyValueFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #tbEstimatedPropertyValue'
  //           },
  //           mortgageBalanceFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #tbMortgageBalance'
  //           },
  //           typeOfMortgageFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #ddlTypeOfMortgage',
  //             "Interest only": {
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrencyFeee: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFeesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Repayment": {
  //               YearsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrencyFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFeesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Part and part": {
  //               repaymentBalanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbRepaymentBalance'
  //               },
  //               interestOnlyBalanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbInterestOnlyBalance'
  //               },
  //               YearsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrencyFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFeesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             }
  //           }
  //         },
  //         "It's to be let": {
  //           estimatedPropertyValueFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #tbEstimatedPropertyValue'
  //           },
  //           mortgageBalanceFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #tbMortgageBalance'
  //           },
  //           typeOfMortgageFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #ddlTypeOfMortgage',
  //             "Interest only": {
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrencyFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFeesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Repayment": {
  //               YearsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrencyFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFeesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Part and part": {
  //               repaymentBalanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbRepaymentBalance'
  //               },
  //               interestOnlyBalanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbInterestOnlyBalance'
  //               },
  //               YearsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyGrossRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGrossRent'
  //               },
  //               rentReceivedForeignCurrencyFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] [name="RentForeignCurrency"]'
  //               },
  //               monthlyAgentFeesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAgentsFees'
  //               },
  //               monthlyAllowanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyAllowanceRentalVoids'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             }
  //           }
  //         },
  //         "Holiday home/second home (for own use)": {
  //           estimatedPropertyValueFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #tbEstimatedPropertyValue'
  //           },
  //           mortgageBalanceFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #tbMortgageBalance'
  //           },
  //           typeOfMortgageFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #ddlTypeOfMortgage',
  //             "Interest only": {
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilitiesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTaxFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Repayment": {
  //               YearsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilitiesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTaxFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Part and part": {
  //               repaymentBalanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbRepaymentBalance'
  //               },
  //               interestOnlyBalanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbInterestOnlyBalance'
  //               },
  //               YearsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilitiesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTaxFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             }
  //           }
  //         },
  //         "Home for dependent relative": {
  //           estimatedPropertyValueFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #tbEstimatedPropertyValue'
  //           },
  //           mortgageBalanceFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #tbMortgageBalance'
  //           },
  //           typeOfMortgageFree: {
  //             css: '[id*="pnlMortgageFreeProperty"] #ddlTypeOfMortgage',
  //             "Interest only": {
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilitiesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTaxFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Repayment": {
  //               YearsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilitiesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTaxFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             },
  //             "Part and part": {
  //               repaymentBalanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbRepaymentBalance'
  //               },
  //               interestOnlyBalanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbInterestOnlyBalance'
  //               },
  //               YearsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Years"]#tbRemainingTerm'
  //               },
  //               MonthsremainingTermFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] [class*="Months"]#tbRemainingTerm'
  //               },
  //               monthlyMortgagePaymentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyMortgagePayment',
  //               },
  //               monthlyUtilitiesFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyUtilities'
  //               },
  //               monthlyCouncilTaxFree: {
  //                 css:  '[id*="pnlMortgageFreeProperty"] #tbMonthlyCouncilTax'
  //               },
  //               monthlyPropertyMaintenanceFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyPropertyMaintenance'
  //               },
  //               monthlyGroundRentFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbMonthlyGroundRentServiceCharges'
  //               },
  //               otherMonthlyCostsForpropertyFree: {
  //                 css: '[id*="pnlMortgageFreeProperty"] #tbOtherMonthlyCosts'
  //               },
  //               // click2: 'btnMortgagedProperty'
  //             }
  //           }
  //         }
  //       }
  //       // click2: ''
  //     },
  //     click3: '#btnContinue',
  //     click4: '#btnContinue',
  //     annualIncome1: {
  //       css: '#tbPermanentEmploymentBasicSalary1'
  //     },
  //     annualIncome2: {
  //       css: '#tbPermanentEmploymentBasicSalary2'
  //     },
  //     fixedTermContract1: {
  //       css: '#tbFixedTermContract1'
  //     },
  //     fixedTermContract2: {
  //       css: '#tbFixedTermContract2'
  //     },
  //     renewableContractPAYE1: {
  //       css: '#tbShortTermRenewableContract1'
  //     },
  //     renewableContractPAYE2: {
  //       css: '#tbShortTermRenewableContract2'
  //     },
  //     salaryForDirectorLimit1: {
  //       css: '#tbSelfEmployedSalaryDirector1'
  //     },
  //     salaryForDirectorLimit2: {
  //       css: '#tbSelfEmployedSalaryDirector2'
  //     },
  //     netProfitSoleTrader1: {
  //       css: '#tbSelfEmployedNetProfit1'
  //     },
  //     netProfitSoleTrader2: {
  //       css: '#tbSelfEmployedNetProfit1'
  //     },
  //     directorDividends1: {
  //       css: '#tbNetDividendsDirectors1'
  //     },
  //     directorDividends2: {
  //       css: '#tbNetDividendsDirectors2'
  //     },
  //     pensionsAndAnnuities1: {
  //       css: '#tbPrivateCompanyPensionsAnnuities1'
  //     },
  //     pensionsAndAnnuities2: {
  //       css: '#tbPrivateCompanyPensionsAnnuities2'
  //     },
  //     statePension1: {
  //       css: '#tbStatePension1'
  //     },
  //     statePension2: {
  //       css: '#tbStatePension2'
  //     },
  //     employedInFfamilyBusiness1: {
  //       css: '#tbFamilyBusiness1'
  //     },
  //     employedInFfamilyBusiness2: {
  //       css: '#tbFamilyBusiness2'
  //     },
  //     earnAnyEmployedAllowances: {
  //       css: '[for*="rbEmployedAllowances"]',
  //       "Yes": {
  //         css: 'label[for="rbEmployedAllowancesYes"]',
  //         carAllowance1: {
  //           css: '#tbCarAllowance1'
  //         },
  //         londonWeighting1: {
  //           css: '#tbLondonWeighting1'
  //         },
  //         permanentShiftAllowance1: {
  //           css: '#tbPermanentShiftAllowance1'
  //         },
  //         mortgageSubsidy1: {
  //           css: '#tbMortgageSubsidy1'
  //         },
  //         longTermMortgageSubsidies1: {
  //           css: '#tbLongTermMortgageSubsidies1'
  //         },
  //         carAllowance2: {
  //           css: '#tbCarAllowance2'
  //         },
  //         londonWeighting2: {
  //           css: '#tbLondonWeighting2'
  //         },
  //         permanentShiftAllowance2: {
  //           css: '#tbPermanentShiftAllowance2'
  //         },
  //         mortgageSubsidy2: {
  //           css: '#tbMortgageSubsidy2'
  //         },
  //         longTermMortgageSubsidies2: {
  //           css: '#tbLongTermMortgageSubsidies2'
  //         }
  //       },
  //       "No": {
  //         css: 'label[for="rbEmployedAllowancesNo"]'
  //       }
  //     },
  //     receiveAnyGovernmentBenefits: {
  //       css: '[for*="rbBenefits"]',
  //       "Yes": {
  //         css: '[for="rbBenefitsYes"]',
  //         childBenefit1: {
  //           css: '#tbChildBenefit1'
  //         },
  //         childTaxCredits1: {
  //           css: '#tbChildTaxCredits1'
  //         },
  //         workingTaxCredits1: {
  //           css: '#tbWorkingTaxCredits1'
  //         },
  //         stateBenefits1: {
  //           css: '#tbStateBenefits1'
  //         },
  //         childBenefit2: {
  //           css: '#tbChildBenefit2'
  //         },
  //         childTaxCredits2: {
  //           css: '#tbChildTaxCredits2'
  //         },
  //         workingTaxCredits2: {
  //           css: '#tbWorkingTaxCredits2'
  //         },
  //         stateBenefits2: {
  //           css: '#tbStateBenefits2'
  //         }
  //       },
  //       "No": {
  //         css: '[for="rbBenefitsNo"]'
  //       }
  //
  //     },
  //     earmAnyOtherAnnualIncome: {
  //       css: '[for*="rbOtherAnnualIncome"]',
  //       "Yes": {
  //         css: '[for="rbOtherAnnualIncomeYes"]',
  //         secondJob1: {
  //           css: '#tbSecondJob1'
  //         },
  //         investmentIncome1: {
  //           css: '#tbInvestmentIncome1'
  //         },
  //         maintenancePayments1: {
  //           css: '#tbMaintenancePayments1'
  //         },
  //         rentalIncome1: {
  //           css: '#tbRentalIncome1'
  //         },
  //         fosteringIncome1: {
  //           css: '#tbFosteringIncome1'
  //         },
  //         secondJob2: {
  //           css: '#tbSecondJob2'
  //         },
  //         investmentIncome2: {
  //           css: '#tbInvestmentIncome2'
  //         },
  //         maintenancePayments2: {
  //           css: '#tbMaintenancePayments2'
  //         },
  //         rentalIncome2: {
  //           css: '#tbRentalIncome2'
  //         },
  //         fosteringIncome2: {
  //           css: '#tbFosteringIncome2'
  //         }
  //       },
  //       "No": {
  //         css: '[for="rbOtherAnnualIncomeYes"]'
  //       }
  //     },
  //     monthlyDeductionsShownBeforeTax1: {
  //       css: '#tbBeforeTaxDeductions1'
  //     },
  //     monthlyDeductionsShownBeforeTax2: {
  //       css: '#tbBeforeTaxDeductions2'
  //     },
  //     monthlyDeductionsShownAfterTax1: {
  //       css: '#tbAfterTaxDeductions1'
  //     },
  //     monthlyDeductionsShownAfterTax2: {
  //       css: '#tbAfterTaxDeductions2'
  //     },
  //     // studentLoans1: {
  //     //   css: '[name="StudentLoans1"]'
  //     // },
  //     // studentLoans2: {
  //     //   css: '[name="StudentLoans2"]'
  //     // },
  //     // residenceInScotland1: {
  //     //   css: '[name="ScotlandTax1"]'
  //     // },
  //     // residenceInScotland2: {
  //     //   css: '[name="ScotlandTax2"]'
  //     // },
  //     click5: '#btnContinue',
  //     commitmentsExcludingCreditCards: {
  //       css: '#tbCreditCommitmentsMonthlySum'
  //     },
  //     totalCombinedOutstandingBalance: {
  //       css: '#tbCreditCardsBalance'
  //     },
  //     monthlyCommitmented: {
  //       css: '[for*="NonRegularMonthlyExpenditure"]',
  //       "Yes": {
  //         css: '[for="rbNonRegularMonthlyExpenditureYes"]',
  //         // childcareAndEducation: {
  //         //   css: '#tbNurserySchool'
  //         // },
  //         maintenancePayments: {
  //           css: '#tbMaintenanceNonRegular'
  //         },
  //         healthInsurancePayments: {
  //           css: '#tbExistingLifeAssurance'
  //         },
  //         groundRent: {
  //           css: '#tbGroundRent'
  //         },
  //         serviceCharge: {
  //           css: '#tbServiceCharge'
  //         },
  //         rentCharge: {
  //           css: '#tbFeudalDuty'
  //         },
  //         additionalCommittedExpenditure: {
  //           css: '#tbOtherNonRegularExpenditure'
  //         }
  //       },
  //       "No" : {
  //         css: '[for="rbNonRegularMonthlyExpenditureNo"]'
  //       }
  //     },
  //     click6: '#btnContinue'
  //   },
  //   extraction: {
  //     price: { css: '#pnlStep4 > div > div > div > div > div.affordResultsWrap > p.resultSuccess.noImg > strong > span' }
  //   }
  // },
//   {
//     lender: 'Halifax',
//     logo: 'halifax',
//     domain: 'halifax-intermediaries.co.uk',
//     affordability: 'https://www.halifax-intermediaries.co.uk/tools_and_calculators/mortgage_affordability_calculator/default.aspx',
//     mapping: {
//       waitFor: 2000,
//       numOfApplying: {
//        css: '#ctl00_ContentPlaceHolder_ctl00_adults'
//      },
//      numOfdependants: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_children',
//          logic: 'parseInt(input[childUnder5]) + parseInt(input[childUnder11]) + parseInt(input[childUnder17]) + parseInt(input[childOver18])',
//          new: true
//        },
//      residenceInScotland: {
//        css: '#ctl00$ContentPlaceHolder$ctl00$ddlIsScottish'
//       },
//       propertyValue: {
//         css: '#ctl00_ContentPlaceHolder_ctl00_propertyValue'
//       },
//       loanValue: {
//         css: '#ctl00_ContentPlaceHolder_ctl00_amount'
//       },
//       mortgageTermYears: {
//         css: '#ctl00_ContentPlaceHolder_ctl00_term'
//       },
//       typeOfOwnerShip: {
//           css: "#ctl00_ContentPlaceHolder_ctl00_ddlhelptobuy",
//           logic: `('@value' === 'Other') ? 'No': 'Yes'`,
//           "new": true
//        },
//       requiredInterest: {
//         css: '#ctl00_ContentPlaceHolder_ctl00_interestonly'
//       },
//       requiredInterestMonthly: {
//         css: '#ctl00_ContentPlaceHolder_ctl00_monthlypremium'
//       },
//       propertyLegalStatus: {
//         css: '#ctl00_ContentPlaceHolder_ctl00_propertytype',
//         logic: `('@value' === 'freehold' || '@value' === 'Interest only - endowment or investment' ) ? 'Freehold': 'Leashold'`
//       },
//       annualIncome1: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_annualincome1'
//        },
//        annualIncome2: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_annualincome2'
//        },
//        totalOvertimeAnnually1: {
//           css: '#ctl00_ContentPlaceHolder_ctl00_overtime1'
//        },
//        totalOvertimeAnnually2: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_overtime2'
//        },
//        annualBonus1: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_bonus1'
//        },
//        annualBonus2: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_bonus2'
//        },
//        totalOvertimeAnnually1: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_commission1'
//        },
//        totalOvertimeAnnually2: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_commission2'
//        },
//        // otherIncome: {},
//        totalCreditCards: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_credit1'
//        },
//        creditCardBalances: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_card1'
//        },
//        otherMortgagePayments: {
//          css: '#ctl00_ContentPlaceHolder_ctl00_mortgage1'
//        },
//       click1: '#ctl00_ContentPlaceHolder_ctl00_submitproduct'
//     },
//     extraction: {
//       price: { css: '#ctl00_ContentPlaceHolder_ctl00_loanamount' }
//     }
// },
{
  lender: 'Natwest',
  domain: 'rbsintermediaries.hdddirectsolutions.co.uk',
  affordability: 'https://rbsintermediaries.hdddirectsolutions.co.uk/Natwest',
  logo: 'netwest',
  mapping: {
    waitFor: 2000,
    loanValue: {
      css: '#LoanToValue',
      logic: `((input[propertyValue] - input[loanValue]) / input[propertyValue]) * 100`
    },
    methodOfRepayment: {
      css: '#RepaymentMethod',
      logic: `('@value' === 'Capital and interest') ? 'Capital and interest £' : ('@value'.includes('Interest only')) ?  'Interest Only £' : 'Mixed Repayment'`,
      'Capital and interest £': {
        mortgageTermYears: {
            css: '#TermOfMortgageYears'
        },
        mortgageTermMonths: {
          css: '#TermOfMortgageMonths'
        },
      },
      'Interest Only £': {
        requiredInterest: {
          css: '#InterestOnlyAmount'
        },
        repaymentStrategyAmount: {
          css: '#RepaymentStrategyAmount'
        },
        mortgageTermYears: {
            css: '#TermOfMortgageYears'
        },
        mortgageTermMonths: {
          css: '#TermOfMortgageMonths'
        },
      },
      'Mixed Repayment': {
        requiredInterest: {
          css: '#InterestOnlyAmount'
        },
        repaymentStrategyAmount: {
          css: '#RepaymentStrategyAmount'
        },
        capitalAndInterestAmount: {
          css: '#CapitalAndInterestAmount'
        },
        isRepaymentStrategySale: {
          css: '#IsRepaymentStrategySale'
        },
        mortgageTermYears: {
            css: '#TermOfMortgageYears'
        },
        mortgageTermMonths: {
          css: '#TermOfMortgageMonths'
        },
      }
    },
    typeOfOwnerShip: {
        css: '#IsSharedEquityMortgage',
        logic: `('@value' === 'Shared Equity') ? 'Yes' : 'No'`
    },
    annualIncome1: {
      css: '#MainApplicantRegularGrossIncome'
    },
    annualIncome2: {
      css: '#JointApplicantGrossIncome'
    },
    annualBonus1: {
      css: '#MainApplicantOtherGrossIncome'
    },
    annualBonus2: {
      css: '#JointApplicantOtherGrossIncome'
    },
    monthlyLoanPayments: {
      css: '#MonthlyLoanPayments'
    },
    monthlyHirePurchasePayments: {
      css: '#MonthlyHirePurchasePayments'
    },
    rentCharge: {
      css: '#MonthlyLeaseAgreementPayments'
    },
    otherMortgagePayments: {
      css: '#OtherMortgagePayments'
    },
    otherCommittedPayments: {
      css: '#OtherCommittedExpenditure'
    },
    creditCardBalances: {
      css: '#TotalCreditCardBalance'
    },
    totalApplicantsAndDependants: {
      css: '#TotalNoApplicantsAndDependants',
      logic: 'parseInt(input[childUnder5]) + parseInt(input[childUnder11]) + parseInt(input[childUnder17]) + parseInt(input[childOver18]) + parseInt(input[numOfApplying])',
      new: true
    },
    expectedChangeToFinancialCircumstances1: {
      css: '#ExpectedChangeToFinancialCircumstances'
    },
    click1: '#btnCalculate'
  },

  extraction: {
    price: { css: '#mortgage-calculator-results > strong' }
    }
  }
]

class Metadata {

  process(processor) {
      /* eslint no-new-func: 0 */
      // console.log(processor);
      //console.log(processor);
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
      // console.log(description);
      lenderObject['description'] = description
      lenderObject['extraction'] = lender.extraction
      results.push(lenderObject)
      }
      console.log(JSON.stringify(results));
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
      //    console.log(input);
      for (var lenderKey of Object.keys(lender)) {
        if (lenderKey !== 'css' && lenderKey !== 'logic') {
          //  console.log(lender);
        let i = 1
        for (let inp of input) {
          let nestedLenderConfig = lender[lenderKey]
          //  console.log(nestedLenderConfig);
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
                css: (lenderVal.css.endsWith('"]')) ? lenderVal.css.replace('"]',`${index}"]`) : `${lenderVal.css}${index}`,
                value:  (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[`${lenderKey}${index}`], input ) : input[`${lenderKey}${index}`],
                name: `${lenderKey}${index}`,
                line: '432'
              })
        } else {
          let test = (lenderVal.logic) ? await this.editValue(lenderVal.logic, input[`${lenderKey}${index}`], input ) : input[`${lenderKey}${index}`]
          description.push({
              css: (lenderVal.css.endsWith('"]')) ? lenderVal.css.replace('"]',`${index}"]`) : `${lenderVal.css}${index}`,
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
          if (lenderKey.toString().startsWith('click')) {
            description.push({
              css: lenderVal,
              action: 'click',
            })
            continue
          }
          if (inputKeys.includes(lenderKey)) {
            console.log('contains laner key: ' + lenderKey);
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
