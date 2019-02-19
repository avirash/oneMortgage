var inputCollection = {}
let mortgageDetails = [{index: 1 }]
let mortgageDetailsFree = [{index: 1 }]

$(document).ready(function () {
/// mortgage
  $('[name="numOfApplying"]').on('click', function(ev) {

    if (this.value === '1') {
      console.log('1');
      document.getElementById("numOfApplying1").checked = true
      document.getElementById("numOfApplying2").checked = false

      $('#advacedSalaryApplicant2').css('display', 'none')
       $('#genericApplicant2').css('display', 'none')
       $('#monthlyDeductionsApplicant2').css('display', 'none')
       $('#earnAnyEmployedAllowancesApplicant2').css('display', 'none')
       $('#receiveAnyGovernmentBenefitsApplicant2').css('display', 'none')
       $('#earmAnyOtherAnnualIncomeApplicant2').css('display', 'none')
    } else {
      document.getElementById("numOfApplying1").checked = false
     document.getElementById("numOfApplying2").checked = true
      console.log('2');
        $('#advacedSalaryApplicant2').css('display', 'block')
        $('#genericApplicant2').css('display', 'block')
        $('#monthlyDeductionsApplicant2').css('display', 'block')
        $('#earnAnyEmployedAllowancesApplicant2').css('display', 'block')
        $('#receiveAnyGovernmentBenefitsApplicant2').css('display', 'block')
        $('#earmAnyOtherAnnualIncomeApplicant2').css('display', 'block')
    }
      // if ($(this).attr('value') === '1') {
      //   console.log('here');
      //   $('#advacedSalaryApplicant2').css('display', 'none')
      //   $('#genericApplicant2').css('display', 'none')
      //   $('#monthlyDeductionsApplicant2').css('display', 'none')
      //   $('#earnAnyEmployedAllowancesApplicant2').css('display', 'none')
      //   $('#receiveAnyGovernmentBenefitsApplicant2').css('display', 'none')
      //   $('#earmAnyOtherAnnualIncomeApplicant2').css('display', 'none')
      //
      // //  $('#numOfApplying1').prop('checked', true)
      //   // $('#numOfApplying2').prop('checked', false)
      //   document.getElementById("numOfApplying1").checked = true
      //   document.getElementById("numOfApplying2").checked = false
      //
      // } else {
      //   $('#advacedSalaryApplicant2').css('display', 'block')
      //   $('#genericApplicant2').css('display', 'block')
      //   $('#monthlyDeductionsApplicant2').css('display', 'block')
      //   $('#earnAnyEmployedAllowancesApplicant2').css('display', 'block')
      //   $('#receiveAnyGovernmentBenefitsApplicant2').css('display', 'block')
      //   $('#earmAnyOtherAnnualIncomeApplicant2').css('display', 'block')
      //   document.getElementById("numOfApplying1").checked = false
      //   document.getElementById("numOfApplying2").checked = true
      // }
  })

  $('#advancedQuestionsDiv > a').on('click', function(ev){
      if ($(this).attr('class')=='icon-plus') {
        $(this).attr('class','icon-close')
        $(this).text(' Close Advanced')
      //  if ($('#requiredInterestDiv').css('display') !== 'none')  $('#requiredInterestMonthlyDiv').fadeIn('slow')
        $('#clientFountNewHouse').fadeIn('slow')
        $('#otherPropertyDiv').fadeIn('slow')
        if ( $('#foundNewHomeYes').prop('checked') ) {
          $('#propertyLegalStatusDiv').fadeIn('slow')
          $('#propertyTypeDiv').fadeIn('slow')
        }
        if ( $('#otherPropertyYes').prop('checked') ) $('#borrowMoreThan').fadeIn('slow')
        if ( $('#borrowMoreThan90No').prop('checked') ) $('#provideMoreDetailsDiv').fadeIn('slow')
        if ( $('#provideMoreDetailsYes').prop('checked')) {
          $('#mortgagedPropertiesDiv').fadeIn('slow')
          $('#mortgageFreePropertiesDiv').fadeIn('slow')
        }
        $('#firstAffPageSecondTab').fadeIn('slow')


      } else {
        $(this).attr('class','icon-plus')
        $(this).text(' Advanced Questions')
        //$('#requiredInterestMonthlyDiv').fadeOut('slow')
        $('#clientFountNewHouse').fadeOut('slow')
        $('#propertyLegalStatusDiv').fadeOut('slow')
        $('#propertyTypeDiv').fadeOut('slow')
        $('#otherPropertyDiv').fadeOut('slow')
        $('#borrowMoreThan').fadeOut('slow')
        $('#provideMoreDetailsDiv').fadeOut('slow')
        $('#mortgagedPropertiesDiv').fadeOut('slow')
        $('#mortgageFreePropertiesDiv').fadeOut('slow')
        $('#firstAffPageSecondTab').fadeOut('slow')
      }
  })

  $('#mortgagedProperties, #mortgageFreeProperties').on('change', function(ev) {
    let currentId = `${ev.target.id}Details`
    let originalId = ev.target.id
    let value = parseInt($(this).find(":selected").attr('value'))
    let mainDiv = document.querySelector(`#${originalId}Board`)
    if (value === 0) {
      $(`#${originalId}Board`).fadeOut('slow')
    } else {
      let delta = 0
      let numOfDivs = ($(`[id*="${currentId}Div"]`) || [] ).length
      if ( numOfDivs < value ) {
        delta = value - numOfDivs
        for (let i = 0; i < delta; i++) {
           let propertyUse = createMortgagePropertyDiv(numOfDivs + i + 1, currentId)
           mainDiv.appendChild(propertyUse)

          $(`[id="propertyUse${i + 1}"]`).bind('change', { parentDiv: `${currentId}Div${numOfDivs + i + 1}` , currentId},  propertyUseEvent)
        }
      } else if (numOfDivs > value) {
        delta =  numOfDivs - value
        for (let i = 0 ; i < delta  ;i++) {
          let divToRemove = `#${currentId}Div${numOfDivs - i}`
          $(divToRemove).remove()
        }
      }
      $(`[id*="typeOfMortgage${i + 1}"]`).bind('change', {currentId} ,typeOfMortgageEvent)
    }
  })

  function createMortgagePropertyDiv(index, divId) {
    let div = document.createElement('div')
    div.id = `${divId}Div${index}`
    let scope = (div.id .toLowerCase().includes('free')) ? 'Free' : ''
    div.style['border-color'] = '#ff9f07'
    div.style['border-style'] = 'solid'
    div.setAttribute('class', 'form-group col-md-12 form-group')

    let h3 = document.createElement('h3')
    h3.innerHTML = (divId.includes('mortgageFreeProperties')) ? `Mortgage-free property ${index} details` : `Mortgaged property ${index} details`

    div.appendChild(h3)

    let propertyUse =  createDropdown([
      { text: "It's already let", value: 1 , selected: true},
      { text: "It's to be let", value: 2  },
      { text: "Holiday home/second home (for own use)", value: 3  },
      { text: "Home for dependent relative", value: 4  }
    ], `propertyUse${scope}${(index)}`, 'Property use', div.id)

    div.appendChild(propertyUse)

    let propertyUseBody = generatePropertyUseBodyForLet(index, divId)
    div.appendChild(propertyUseBody)
    return div
  }

  function generatePropertyUseBodyForRelatives(index, container){
    let scope = (container.toLowerCase().includes('free')) ? 'Free' : ''
    let div = document.createElement('div')
    div.id = `propertyUseBody${scope}Div${index}`
    let currencyInput = createCurrencyInput(`estimatedPropertyValue${scope}${index}`, 'Estimated property value')
    let mortgageBalance = createCurrencyInput(`mortgageBalance${scope}${index}`, 'Mortgage balance')
    let typeOfMortgage =  createDropdown([
      { text: "Interest only", value: 1 , selected: true},
      { text: "Repayment", value: 2  },
      { text: "Part and part", value: 3  }
    ], `typeOfMortgage${scope}${(index)}`, 'Type of mortgage')
    let monthlyMortgagePaymentInput = createCurrencyInput(`monthlyMortgagePayment${index}`, 'Monthly mortgage payment')
    let monthlyUtilities = createCurrencyInput(`monthlyUtilities${scope}${index}`, 'Monthly utilities (gas, water, electric)')
    let monthlyCouncilTax = createCurrencyInput(`monthlyCouncilTax${scope}${index}`, 'Monthly council tax')
    let monthlyPropertyMaintenance = createCurrencyInput(`monthlyPropertyMaintenance${scope}${index}`, 'Monthly property maintenance')
    let monthlyGroundRent = createCurrencyInput(`monthlyGroundRent${scope}${index}`, 'Monthly ground rent / service charges')
    let otherMonthlyCostsForproperty = createCurrencyInput(`otherMonthlyCostsForproperty${scope}${index}`, 'Other monthly costs for this property')

    let h3 = document.createElement('h3')
    h3.innerHTML = `Monthly property costs`

    div.appendChild(currencyInput)
    div.appendChild(mortgageBalance)
    div.appendChild(typeOfMortgage)
    div.appendChild(monthlyMortgagePaymentInput)
    div.appendChild(h3)
    div.appendChild(monthlyUtilities)
    div.appendChild(monthlyCouncilTax)
    div.appendChild(monthlyPropertyMaintenance)
    div.appendChild(monthlyGroundRent)
    div.appendChild(otherMonthlyCostsForproperty)

    return div
  }

  function generatePropertyUseBodyForLet(index, container) {
    let scope = (container.toLowerCase().includes('free')) ? 'Free' : ''
    let div = document.createElement('div')
    div.id = `propertyUseBody${scope}Div${index}`
    let currencyInput = createCurrencyInput(`estimatedPropertyValue${scope}${(index)}`, 'Estimated property value')
    let mortgageBalance = createCurrencyInput(`mortgageBalance${scope}${(index)}`, 'Mortgage balance')

    let typeOfMortgage =  createDropdown([
      { text: "Interest only", value: 1 , selected: true},
      { text: "Repayment", value: 2  },
      { text: "Part and part", value: 3  }
    ], `typeOfMortgage${scope}${(index)}`, 'Type of mortgage')

    let monthlyMortgagePaymentInput = createCurrencyInput(`monthlyMortgagePayment${scope}${(index)}`, 'Monthly mortgage payment')
    let monthlyGrossRent = createCurrencyInput(`monthlyGrossRent${scope}${(index)}`, 'Monthly gross rent')
    let rentReceivedForeignCurrency = createRadioInput(`rentReceivedForeignCurrency${scope}${(index)}`, 'Will the rent be received in a foreign currency?')

    let monthlyAgentFees = createCurrencyInput(`monthlyAgentFees${scope}${(index)}`, `Monthly agent's fees (if applicable)`)
    let monthlyAllowance = createCurrencyInput(`monthlyAllowance${scope}${(index)}`, 'Monthly allowance for rental voids')
    let monthlyPropertyMaintenance = createCurrencyInput(`monthlyPropertyMaintenance${scope}${(index)}`, `Monthly property maintenance`)
    let otherMonthlyCostsForproperty = createCurrencyInput(`otherMonthlyCostsForproperty${scope}${(index)}`, 'Other monthly costs for this property')

    div.appendChild(currencyInput)
    div.appendChild(mortgageBalance)
    div.appendChild(typeOfMortgage)
    div.appendChild(monthlyMortgagePaymentInput)
    div.appendChild(monthlyGrossRent)
    div.appendChild(rentReceivedForeignCurrency)

    div.appendChild(monthlyAgentFees)
    div.appendChild(monthlyAllowance)
    div.appendChild(monthlyPropertyMaintenance)
    div.appendChild(otherMonthlyCostsForproperty)

    return div

  }

  function typeOfMortgageEvent(ev) {
    ev.preventDefault()
    let currentSecion = ev.data.currentId
    let scope = (currentSecion.toLowerCase().includes('free')) ? 'Free' : ''
    let index = (ev.target.id).replace('typeOfMortgage','').replace('Free','')
    let selected = $(this).find(':selected')
    let value = parseInt(selected.attr('value'))
    let selectDiv = document.querySelector(`select[id="typeOfMortgage${scope}${index}"]`).parentNode.parentNode
    $(`#repaymentBalance${scope}${index}Div`).remove()
    $(`#interestOnlyBalance${scope}${index}Div`).remove()
    $(`#remainingTerm${scope}${index}Div`).remove()
    if (value === 1) {
    } else if (value === 2)  {
      if (!(document.getElementById(`remainingTerm${scope}${index}`))) {
        let yearAndMonthsInput = createYearAndMonthsInput(`remainingTerm${scope}${index}`, 'Remaining term')
        $(selectDiv).after(yearAndMonthsInput)
      }
    } else {
      let repaymentBalance  = createCurrencyInput(`repaymentBalance${scope}${index}`, `Repayment balance `)
      let interestOnlyBalance = createCurrencyInput(`interestOnlyBalance${scope}${index}`, 'Interest only balance')
      let yearAndMonthsInput = createYearAndMonthsInput(`remainingTerm${scope}${index}`, 'Remaining term')
      $(selectDiv).after(repaymentBalance)
      $(repaymentBalance).after(interestOnlyBalance)
      $(interestOnlyBalance).after(yearAndMonthsInput)
    }
    ev.stopPropagation()
   }

  function propertyUseEvent(ev) {
      ev.preventDefault()
      let currentSecion = ev.data.currentId
      let scope = (currentSecion.toLowerCase().includes('free')) ? 'Free' : ''
        let div = document.getElementById(ev.data.parentDiv)
        let index = (ev.target.id).replace('propertyUse','')
        let selected = $(this).find(':selected')
        let value = parseInt(selected.attr('value'))
        if ([1, 2].includes(value)) {
          $(`#propertyUseBody${scope}Div${index}`).remove()
          let fatherDivId = document.querySelector(`#${ev.data.parentDiv}`)
          let propertyUseBody = generatePropertyUseBodyForLet(index, scope)
          fatherDivId.appendChild(propertyUseBody)
          $('[id*="typeOfMortgage"]').bind('change', {currentId: currentSecion} ,typeOfMortgageEvent)
          return div
        } else  {
          $(`#propertyUseBody${scope}Div${index}`).remove()
          let fatherDivId = document.querySelector(`#${currentSecion}Div${index}`)
          let propertyUseBody = generatePropertyUseBodyForRelatives(index, scope)
          fatherDivId.appendChild(propertyUseBody)
          $('[id*="typeOfMortgage"]').bind('change', {currentId: currentSecion} ,typeOfMortgageEvent)
          return div
        }
  }

  function createYearAndMonthsInput(id, labelText){
    let div = document.createElement('div')
    div.setAttribute('class', 'form-group')
    div.id = `${id}Div`

    let label = document.createElement('label')
    label.innerHTML = labelText
    label.setAttribute('class', 'control-label')

    let innerDiv = document.createElement('div')
    innerDiv.setAttribute('class', 'control-group')

    let divInline = document.createElement('div')
    divInline.setAttribute('class', 'controls form-inline')

    let inputYear = document.createElement('input')
    inputYear.setAttribute('class', 'form-control mortgageDetails')
    inputYear.maxlength = '2'
    inputYear.type = 'tel'
    inputYear.max = '30'
    inputYear.min = '1'
    inputYear.placeholder = 'YY'
    inputYear.id = `Years${id}`
    inputYear.style = 'text-align: center;width:40px;line-height: 28px;padding: 0 .6rem;height: 40px;'

    let labelYear = document.createElement('label')
    labelYear.for = `Years${id}`
    labelYear.innerHTML = 'Years'
    labelYear.setAttribute('class', 'control-label')
    labelYear.style = 'margin-left: 5px'


    let inputMonths = document.createElement('input')
    inputMonths.setAttribute('class', 'form-control mortgageDetails')
    inputMonths.maxlength = '2'
    inputMonths.type = 'tel'
    inputMonths.max = '12'
    inputMonths.min = '1'
    inputMonths.placeholder = 'MM'
    inputMonths.id = `Months${id}`
    inputMonths.style = 'text-align: center;width:40px;line-height: 28px;padding: 0 .6rem;height: 40px;margin-left: 3px;'


    let labelMonths = document.createElement('label')
    labelMonths.for = `Months${id}`
    labelMonths.innerHTML = 'Months'
    labelMonths.setAttribute('class', 'control-label')
    labelMonths.style = 'margin-left: 5px'

    divInline.appendChild(inputYear)
    divInline.appendChild(labelYear)
    divInline.appendChild(inputMonths)
    divInline.appendChild(labelMonths)

    innerDiv.appendChild(divInline)
    div.appendChild(label)
    div.appendChild(innerDiv)

    return div
  }

  function createRadioInput(id, labelText) {
    let fieldset = document.createElement('fieldset')
    fieldset.setAttribute('class', 'form-group')

fieldset.innerHTML =
    `
        <label class="control-label">${labelText}</label>
        <div class="form-check">
           <label class="form-check-label">
           <input type="radio" class="form-check-input" name="${id}" id="${id + 'Yes'}" value="Yes"> Yes
           </label>
        </div>
        <div class="form-check disabled">
           <label class="form-check-label">
           <input type="radio" class="form-check-input" name="${id}" id="${id + 'No'}" value="No" checked=""> No
           </label>
        </div>
    `
      // let fieldset = document.createElement('fieldset')
      // fieldset.setAttribute('class', 'form-group')
      //
      // let outterLabel = document.createElement('label')
      // outterLabel.innerHTML = labelText
      // outterLabel.setAttribute('class', 'control-label')
      //
      // let divYes = document.createElement('div')
      // let divNo = document.createElement('div')
      //
      // divYes.setAttribute('class', 'form-check')
      // divNo.setAttribute('class', 'form-check')
      //
      // let labelYes = document.createElement('label')
      // labelYes.innerHTML = 'Yes'
      // let labelNo = document.createElement('label')
      // labelNo.innerHTML = 'No'
      //
      // labelYes.setAttribute('class', 'form-check-label')
      // labelNo.setAttribute('class', 'form-check-label')
      //
      // let inputYes = document.createElement('input')
      // let inputNo = document.createElement('input')
      //
      // inputYes.id = id + 'Yes'
      // inputYes.name = id
      // inputYes.value = 'Yes'
      // inputYes.type = 'radio'
      // inputYes.setAttribute('class', 'form-check-input mortgageDetails')
      //
      //
      // inputNo.id = id + 'No'
      // inputNo.name = id
      // inputNo.type = 'radio'
      // inputNo.value = 'No'
      // inputNo.setAttribute('class', 'form-check-input mortgageDetails')
      //
      // inputNo.checked = true
      //
      // labelYes.appendChild(inputYes)
      // divYes.appendChild(labelYes)
      //
      // labelNo.appendChild(inputNo)
      // divNo.appendChild(labelNo)
      //
      // fieldset.appendChild(outterLabel)
      // fieldset.appendChild(divYes)
      // fieldset.appendChild(divNo)
      //
      return fieldset
    }

  function createDropdown(options, id, labelText) {
      let div = document.createElement('div')
      div.setAttribute('class', 'form-group')

      let label = document.createElement('label')
      label.for = id
      label.innerHTML = labelText
      label.setAttribute('class', 'control-label')

      let innerDiv = document.createElement('div')
      innerDiv.setAttribute('class', 'input-group col-md-8')

      div.appendChild(label)
      let selecet = document.createElement('select')
      selecet.id = id
      selecet.setAttribute('class', 'form-control col-md-7 mortgageDetails')

      for (let i = 0 ; i < options.length; i++) {
        let inputOption = options[i]
        let option = document.createElement('option')
        // option.setAttribute('class', 'mortgageDetails')
        option.value = inputOption.value || inputOption.text
        option.text = inputOption.text
        if (option.selected) option.selected = true
        selecet.options.add(option);
      }
      innerDiv.appendChild(selecet)
      div.appendChild(innerDiv)

      return div
    }

  function createCurrencyInput(id, labelText) {
      let div = document.createElement('div')
      div.setAttribute('class','form-group')
      div.id = `${id}Div`

      let label = document.createElement('label')
      label.for = id
      label.setAttribute('class', 'control-label')
      label.innerHTML = labelText

      div.appendChild(label)

      let innerDiv = document.createElement('div')
      innerDiv.setAttribute('class', 'input-group col-md-5')

      let span = document.createElement('span')
      span.style.background = 'white'
      span.setAttribute('class', 'input-group-addon')
      span.innerHTML = '£'

      let input = document.createElement('input')
      input.id = id
      input.setAttribute('class', 'form-control mortgageDetails')
      input.maxlength = '10'
      input.type = 'tel'
      input.placeholder = '0'

      innerDiv.appendChild(span)
      innerDiv.appendChild(input)

      div.appendChild(innerDiv)
      return div
    }

  $('[name="provideMoreDetails"]').on('change', function(ev) {
      if ($(this).attr('value') === 'Yes') {
        $('#newStep').css('display', 'table-cell')
        // let firstStep = document.querySelector('.stepwizard-step')
        //let newStep = document.createElement('div')
        // newStep.id = 'new-stepwizard-step'
        // newStep.setAttribute('class', 'stepwizard-step')
        //
        // let a =  document.createElement('a')
        // a.setAttribute('class', 'btn btn-circled')
        // a.setAttribute('type', 'button')
        // a.setAttribute('href', '#otherProperty1b')
        // a.setAttribute('disabled', 'disabled')
        // a.style = 'color: white'
        // a.innerHTML = '1b'
        //
        //
        // let p =  document.createElement('p')
        // p.style = 'margin-left: -30px'
        // p.innerHTML = 'Other properties'
        //
        // newStep.appendChild(a)
        // newStep.appendChild(p)
        // $(firstStep).after(newStep)
        // $('#mortgagedPropertiesDiv').fadeIn('slow')
        // $('#mortgageFreePropertiesDiv').fadeIn('slow')
      } else {
        $('#newStep').css('display', 'none')
        // $('#mortgagedPropertiesDiv').fadeOut('slow')
        // $('#mortgageFreePropertiesDiv').fadeOut('slow')
      }

    })

  $('#methodOfRepaymentDiv').on('change', function(ev) {
      let value = $(this).find(":selected").attr('value')
      if (['2', '3'].includes(value)) {
        $('#requiredInterestDiv').fadeIn('slow')
        $('#repaymentStrategyAmountDiv').fadeIn('slow')
        $('#isRepaymentStrategySaleDiv').fadeIn('slow')
        $('#requiredInterestMonthlyDiv').fadeOut('slow')
        $('#capitalAndInterestAmountDiv').fadeOut('slow')
      } else if (['4', '5'].includes(value)) {
        $('#requiredInterestDiv').fadeIn('slow')
        $('#repaymentStrategyAmountDiv').fadeIn('slow')
        $('#isRepaymentStrategySaleDiv').fadeIn('slow')
        $('#requiredInterestMonthlyDiv').fadeIn('slow')
        $('#capitalAndInterestAmountDiv').fadeIn('slow')
      } else {
        $('#requiredInterestDiv').fadeOut("slow")
        $('#requiredInterestMonthlyDiv').fadeOut("slow")
        $('#capitalAndInterestAmountDiv').fadeOut('slow')
        $('#repaymentStrategyAmountDiv').fadeOut("slow")
        $('#isRepaymentStrategySaleDiv').fadeOut("slow")
      }
    })

  $('#typeOfOwnerShip').on('change', function(ev) {
      if ($(this).find(":selected").attr('value') === '1') {
          $('#equityLoanDiv').fadeIn('slow')
      } else {
        $('#equityLoanDiv').fadeOut('slow')
      }
    })

  $('[name="foundNewHome"]').on('change', function(ev) {
      if ($(this).attr('value') === 'Yes') {
        $('#propertyLegalStatusDiv').fadeIn('slow')
        $('#propertyTypeDiv').fadeIn('slow')
      } else {
        $('#propertyLegalStatusDiv').fadeOut('slow')
        $('#propertyTypeDiv').fadeOut('slow')
      }

    })

  $('[name="borrowMoreThan90"]').on('change', function(ev) {
       if ($(this).attr('value') === 'No' || '') {
         $('#provideMoreDetailsDiv').fadeIn('slow')
       } else {
         alert('you cannot')
         $('#provideMoreDetailsNo').prop('checked', true)
         $('#provideMoreDetailsDiv').fadeOut('slow')
         $('#newStep').css('display', 'none')

       }
     })

  $('[name="otherProperty"]').on('change', function(ev) {
       if ($(this).attr('value') === 'No') {
          $('#borrowMoreThan').fadeOut('slow')
          $('#provideMoreDetailsDiv').fadeOut('slow')
          $('#borrowMoreThan90No').prop('checked', false)
          $('#borrowMoreThan90Yes').prop('checked', false)
          $('#provideMoreDetailsNo').prop('checked', true)
          $('#newStep').css('display', 'none')
       } else {
         $('#borrowMoreThan').fadeIn('slow')
       }
    })
    // prevent multi selections in radio button
  $('input[type="radio"]').on('change', function() {
      var name = $(this).attr('name')
      $(`[name="${name}"]`).each(function(id, el) {
          $(this).prop('checked', false)
      })
      $(this).prop('checked', true)
    })
/// incomings
 $('[name="retired"]').on('change', function(ev){
   if ($(this).attr('value') === 'Yes') {
      $('#retirementAgeDiv').fadeOut('slow')
   } else {
     $('#retirementAgeDiv').fadeIn('slow')
   }
 })

 $('#advacedSalaryAanualIncomeClick > a').on('click', function(ev){
     if ($(this).attr('class')=='icon-plus') {
       $(this).attr('class','icon-close')
       $(this).text(' Close Advanced')
       $('#advacedSalaryAanualIncomeDiv').fadeIn('slow')
       $('#incomingAffPageSecondTab').fadeIn('slow')
     } else {
       $(this).attr('class','icon-plus')
       $(this).text(' Advaced salary options for anual income ')
       $('#advacedSalaryAanualIncomeDiv').fadeOut('slow')
       $('#incomingAffPageSecondTab').fadeOut('slow')
     }
  })
 $('[name="earmAnyOtherAnnualIncome"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
      $('#earmAnyOtherAnnualIncomeBoard').fadeOut('slow')
   } else {
     $('#earmAnyOtherAnnualIncomeBoard').fadeIn('slow')
   }
 })

 $('[name="receiveAnyGovernmentBenefits"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
      $('#receiveAnyGovernmentBenefitsBoard').fadeOut('slow')
   } else {
     $('#receiveAnyGovernmentBenefitsBoard').fadeIn('slow')
   }
 })

 $('[name="earnAnyEmployedAllowances"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
      $('#earnAnyEmployedAllowancesBoard').fadeOut('slow')
   } else {
     $('#earnAnyEmployedAllowancesBoard').fadeIn('slow')
   }
 })

 $('[name="earnAnyEmployedAllowances2"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
      $('#earnAnyEmployedAllowancesBoard2').fadeOut('slow')
   } else {
     $('#earnAnyEmployedAllowancesBoard2').fadeIn('slow')
   }
 })

 $('[name="receiveAnyBonusOrCommission"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
      $('#bounsPaidEveryMonthDiv').fadeOut('slow')
   } else {
     $('#bounsPaidEveryMonthDiv').fadeIn('slow')
   }
 })

 $('[name="bounsPaidEveryMonth"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
      $('#receiveAnyBonusOrCommissionBoard').fadeOut('slow')
   } else {
     $('#receiveAnyBonusOrCommissionBoard').fadeIn('slow')
   }
 })

 $('[name="receiveAnyOvertime"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
      $('#overtimePaidEveryMonthDiv').fadeOut('slow')
   } else {
     $('#overtimePaidEveryMonthDiv').fadeIn('slow')
   }
 })

 $('[name="overtimePaidEveryMonth"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
      $('#receiveAnyOvertimeBoard').fadeOut('slow')
   } else {
     $('#receiveAnyOvertimeBoard').fadeIn('slow')
   }
 })
 ///// outgoings

 $('[name="monthlyCommitmented"]').on('change', function(ev){
   if ($(this).attr('value') === 'No') {
     //$('#outgoingsAffPageSecondTab').fadeOut('slow')
      $('#outgoingsCommitmentsAndExpenditure').fadeOut('slow')
   } else {
     // $('#outgoingsAffPageSecondTab').fadeIn('slow')
     $('#outgoingsCommitmentsAndExpenditure').fadeIn('slow')
   }
 })

 $('#advacedOutgoingsClick > a').on('click', function(ev){
   if ($(this).attr('class')=='icon-plus') {
     $(this).attr('class','icon-close')
     $(this).text(' Close Advanced')
     $('#outgoingsAffPageSecondTab').fadeIn('slow')
     //$('#outgoingsCommitmentsAndExpenditure').fadeIn('slow')
   }
     else {
       $(this).attr('class','icon-plus')
       $(this).text(' Advaced Outgoings Question ')
       $('#outgoingsAffPageSecondTab').fadeOut('slow')
       $('#outgoingsCommitmentsAndExpenditure').fadeOut('slow')
     }
 })

 $('#howOftenBounsPaid').on('change', function(ev) {
    $('#bounsPaymentInputs').remove()
    let selctedValue = $(this).find(":selected").attr('value')
    let div = document.createElement('div')
    let howOftenBounsPaidDiv = document.getElementById('howOftenBounsPaidDiv')
    div.id = 'bounsPaymentInputs'
    div.setAttribute('class', 'form-group')

     if (selctedValue === '1') {
         let bonusOrCommissionQuarterly1 = createCurrencyInput('bonusOrCommissionQuarterly1', '')
         let bonusOrCommissionQuarterly2 = createCurrencyInput('bonusOrCommissionQuarterly2', '')
         let bonusOrCommissionQuarterly3 = createCurrencyInput('bonusOrCommissionQuarterly3', '')
         bonusOrCommissionQuarterly1.setAttribute('class', '')
         bonusOrCommissionQuarterly2.setAttribute('class', '')
         bonusOrCommissionQuarterly3.setAttribute('class', '')

         let label = document.createElement('label')
         label.innerHTML = `Enter the latest three months' bonus or commission payments from the payslips.`

         div.appendChild(label)
         div.appendChild(bonusOrCommissionQuarterly1)
         div.appendChild(bonusOrCommissionQuarterly2)
         div.appendChild(bonusOrCommissionQuarterly3)
     } else if (selctedValue === '2') {
        let bonusOrCommissionAnnually = createCurrencyInput('bonusOrCommissionAnnually', 'How much bonus or commission is earned annually?')
        div.appendChild(bonusOrCommissionAnnually)

     } else {
       let bonusOrCommission1AnnualEquivalent = createCurrencyInput('bonusOrCommission1AnnualEquivalent', 'How much bonus or commission is earned annually or annual equivalent?')
       div.appendChild(bonusOrCommission1AnnualEquivalent)
     }
     $(howOftenBounsPaidDiv).after(div)
   })

   $('#howOftenOvertimePaid').on('change', function(ev) {
      $('#overtimePaymentInputs').remove()
      let selctedValue = $(this).find(":selected").attr('value')
      let div = document.createElement('div')
      let label = document.createElement('label')
      label.setAttribute('class', 'control-label')

      let howOftenOvertimePaidDiv = document.getElementById('howOftenOvertimePaidDiv')
      div.id = 'overtimePaymentInputs'
      div.setAttribute('class', 'form-group')

       if (selctedValue === '1') {
           label.innerHTML = `Enter the latest three months' overtime payments from the payslips`
           div.appendChild(label)
            for (let i = 1; i <= 3 ; i++ ) {
                let overtime1LatestFourWeekly = createCurrencyInput(`overtime1LatestMonthly${i}`, '')
                overtime1LatestFourWeekly.setAttribute('class', '')
                div.appendChild(overtime1LatestFourWeekly)
            }

       } else if (selctedValue === '2') {
         label.innerHTML = `Enter the latest three months' overtime payments from the payslips`
         div.appendChild(label)
          for (let i = 1; i <= 3 ; i++ ) {
              let overtime1LatestFourWeekly = createCurrencyInput(`overtime1LatestFourWeekly${i}`, '')
              overtime1LatestFourWeekly.setAttribute('class', '')
              div.appendChild(overtime1LatestFourWeekly)
          }

       } else if (selctedValue === '3') {
         label.innerHTML = `Enter the latest six lots of fortnightly overtime payments from the payslips`
         div.appendChild(label)
         let delta = 0
          for (let i = 1; i <= 3 ; i++ ) {
              let overtime1LatestFourWeekly = createCurrencyInput(`overtime1LatestFortnightly${i}`, `Weeks ${i + delta}+${i + delta+1} and ${i + delta+2}+${i + delta+3}`)
              let overtime1LatestFourWeekly2 = createCurrencyInput(`overtime1LatestFortnightly${i+1}`, '')

              delta = delta + 3
              let innerLabel = document.createElement('label')
              overtime1LatestFourWeekly.setAttribute('class', '')
              overtime1LatestFourWeekly2.setAttribute('class', '')
              div.appendChild(overtime1LatestFourWeekly)
              div.appendChild(overtime1LatestFourWeekly2)
              innerLabel.innerHTML = 'Sub Total: '
              let resultLabel = document.createElement('label')
              resultLabel.innerHTML = ' 0 '
              div.appendChild(document.createElement('label'))
              div.appendChild(innerLabel)
              div.appendChild(resultLabel)
          }
       } else {
           label.innerHTML = `Enter the latest 12 weeks' overtime payments from the payslips`
           div.appendChild(label)
           let delta = 0
           for (let i = 1; i <= 3; i++ ) {
               let overtime1LatestFourWeekly = createCurrencyInput(`overtime1LatestWeekly${i}`, `Weeks ${i + delta}-${i + delta + 3}`)
               let overtime1LatestFourWeekly2 = createCurrencyInput(`overtime1LatestWeekly${i+1}`, '')
               let overtime1LatestFourWeekly3 = createCurrencyInput(`overtime1LatestWeekly${i+2}`, '')
               let overtime1LatestFourWeekly4 = createCurrencyInput(`overtime1LatestWeekly${i+3}`, '')

               delta = delta + 3

               let innerLabel = document.createElement('label')
               overtime1LatestFourWeekly.setAttribute('class', '')
               overtime1LatestFourWeekly2.setAttribute('class', '')
               overtime1LatestFourWeekly3.setAttribute('class', '')
               overtime1LatestFourWeekly4.setAttribute('class', '')

               div.appendChild(overtime1LatestFourWeekly)
               div.appendChild(overtime1LatestFourWeekly2)
               div.appendChild(overtime1LatestFourWeekly3)
               div.appendChild(overtime1LatestFourWeekly4)

               innerLabel.innerHTML = 'Sub Total: '
               let resultLabel = document.createElement('label')
               resultLabel.innerHTML = ' 0 '
               div.appendChild(document.createElement('label'))
               div.appendChild(innerLabel)
               div.appendChild(resultLabel)
           }
       }
       $(howOftenOvertimePaidDiv).after(div)
     })

  var endPoint = 'http://localhost:3000'
  var navListItems = $('div.setup-panel div a,div.setup-panel div img'),
          allWells = $('.setup-content'),
          allNextBtn = $('.nextBtn');

  allWells.hide();

  navListItems.click(function (e) {
      e.preventDefault();
      if($(this).prop("tagName") === 'IMG') {
        $target = $($(this).prev().attr('href'))
        $item = $(this);
      } else {
        var $target = $($(this).attr('href')),
                $item =$(this).prev();
      }

      if (!$item.hasClass('disabled')) {
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
      }
  });

  // next step in the form
  allNextBtn.click(function(){
      var curStep = $(this).closest(".setup-content"),
      curStepBtn = curStep.attr("id"),
      curStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]'),
      prev = curStepWizard.prev(),
      curInputs = curStep.find("input[type='number']:visible,input[type='tel']:visible,input[type='url']:visible"),
      isValid = true

      var nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a")

      if (curStepBtn === 'mortgage' && !$('#provideMoreDetailsYes').prop('checked')) {
            nextStepWizard = $('div.setup-panel div a[href="#otherProperty1b"]').parent().next().children("a")
        }

      $(".form-group").removeClass("has-error");
      for(var i=0; i<curInputs.length; i++){
          if (!curInputs[i].validity.valid || ($(curInputs[i]).prop('required') && $(curInputs[i]).val() === "0" )){
              isValid = false;
              $(curInputs[i]).closest(".form-group").addClass("has-error");
              $(curInputs[i]).focus()
          }
      }

      if (isValid) {
        collectInputs()
        $(curStepWizard).css('display', 'none')
        $(curStepWizard).next().css('display', 'inline-table')
        nextStepWizard.removeAttr('disabled').trigger('click');
        if (nextStepWizard[0].innerHTML === '5')  calculate()
        }
  });

  // jump between inputs when maxlength is reached
  var inputs = $('input[type="tel"]');
  inputs.each(function(i) {
    $(this).keyup(function(ev) {
      var next = inputs.eq(i+1)
      if((ev.keyCode) < 48 || (ev.keyCode) > 90 ) {
      } else if (ev.keyCode > 65 && ev.keyCode < 90 ) {
        return false
      } else if ($(this) && $(this).length) {
        if ($(this).prop('maxlength') > 4) $(this).val(numberWithCommas($(this).val()))
        if ( ($(this).val().length) === $(this).prop('maxlength')) {
          next.focus()
        }
      }
    })
  })

  function numberWithCommas(x) {
    x = x.replace(/,/g,'')
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function insertToMortgageArray(el, array){
    let cleanedId = el.id.replace('Yes','').replace('No','')
    let index =  parseInt(cleanedId[cleanedId.length-1])
    let exists = array.find( x => x.index === index )

    if (!exists) {
      exists = { index }
      array.push(exists)
    }
    insertToInputObject(el,exists)
  }

  function insertToInputObject(el, obj){
    if (el.tagName === 'INPUT') {
      if (['tel', 'text', 'number'].includes(el.type)) obj[el.id] = el.value.replace(/,/g,'') || 0
      if (el.type === 'radio' && $(el).is(':checked')) obj[$(el).attr('name')] = el.value



    }
    if (el.tagName === 'SELECT') {
      obj[el.id] = $(el).find(":selected").text()
    }
  }
  // send request to get meta data and then async requests to affordability
  function collectInputs() {
    $('form input:visible, form select:visible').each(function(id, el) {
      if ($(el).attr('class') && $(el).attr('class').includes('mortgageDetails')) {
        let cleanedId = el.id.replace('Yes','').replace('No','')
        if(el.id && el.id.includes("Free")){
          insertToMortgageArray(el,mortgageDetailsFree)
        } else {
          insertToMortgageArray(el,mortgageDetails)
        }
      } else {
         insertToInputObject(el, inputCollection)
      }
    })

    if (Object.keys(mortgageDetailsFree[0]).length > 1) {
      inputCollection['mortgageDetailsFree'] = mortgageDetailsFree
    }
    if (Object.keys(mortgageDetails[0]).length > 1) {
      inputCollection['mortgageDetails'] = mortgageDetails
    }


    // $('.mortgageDetails').each(function(id, el) {
    //   if(el.id && el.id.includes("Free")){
    //
    //   } else {
    //
    //   }
    // }

  }

  function calculate() {
    $("#loader").fadeIn('slow')
    $("#tableResults").find("tr:gt(0)").remove();
    $("#tableResults").fadeOut('slow')
    console.log(inputCollection);

    $.ajax({
       url: `${endPoint}/getExtractionInput/`,
       method: 'POST',
       contentType: 'application/x-www-form-urlencoded',
       headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
       },
       data: inputCollection,
       success: function(data) {
         for (var lender of data.results ) {
           sendRequerst(lender)
         }
       },
       error: function(request,msg,error) {
         $("#loader").fadeOut('slow')
       }
   });
  }

  $('div.setup-panel div a.btn-primary').trigger('click');


  // sort table by id
  function sortTable(id) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(id);
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        //check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  // send request to affordability
  function sendRequerst(input) {
    let data = input
    $.ajax({
      type: 'POST',
      data: data,
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded',
      url: `${endPoint}/aff_calc`,
       success: function(data) {
         $("#loader").fadeOut('slow')
         if (data.results.length) {
           for (var result of data.results) {
             for ( var extracted of result.extarcted) {
               var table = document.getElementById('tableResults')
               table.style.display = 'block'
               var row = table.insertRow(1)
               var cell1 = row.insertCell(0)
               var cell2 = row.insertCell(1)
               var cell3 = row.insertCell(2)
               cell1.innerHTML = '<img src="js/' + result.logo + '.png" width="150px" height="50px"/>'
               cell2.innerHTML = result.lender
               cell3.innerHTML = extracted.price
             }
           }
           sortTable("tableResults")
         }
         console.log(data);
       },
       error: function(request,msg,error) {
         console.log(error);
       //  alert(error)
       }
   })
  }
});
