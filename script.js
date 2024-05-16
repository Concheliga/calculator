document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('input')
    const historyBlock = document.querySelector('.history')
    const activeButton = Array.of(...document.querySelectorAll('button')).filter(button => !button.disabled)
    const numbers = activeButton.filter(item => !Number.isNaN(Number(item.innerText)))
    const notNumberButtons = activeButton.filter(item => !numbers.includes(item))
    let operationValue = 0
    let operation = ''
    let historyText = ''

    function setOperationValue(inputValue, operationType) {
        if (!operation) operation = operationType
        if (operation === '+') operationValue += inputValue
        else if (operation === '-') operationValue -= inputValue
        else if (operation === 'x') operationValue *= inputValue
        else if (operation === '÷') operationValue /= inputValue
        else if (operation === '%') operationValue = inputValue
        else operationValue = 0
        
        historyText += `${inputValue} ${operationType} `
        operation = operationType
        input.value = ''
    }

    function setFirstValue(operationSign, inputValue) {
        operationValue = inputValue
        input.value = ''
        operation = operationSign
        historyText += `${inputValue} ${operationSign} `
    }

    function setResultValue(inputValue, operationType) {
        switch (operationType) {
            case '+':
                input.value = inputValue + operationValue
                break
            case '-':
                input.value = operationValue - inputValue
                break
            case '%':
                input.value = (inputValue / 100) * operationValue
                break
            case '÷':
                if (inputValue === 0) {
                    input.value = 'Ошибка'
                    break
                }
                input.value = operationValue / inputValue
                break
            case 'x':
                input.value = operationValue * inputValue
                break
        }

        if (operationType === '%') historyText += ` from ${inputValue} = ${input.value}`
        else historyText += `${inputValue} = ${input.value}`
        operationType = ''
        operation = ''
        operationValue = 0
    }

    numbers.forEach(item => {
        item.addEventListener('click', () => {
            if (input.value != 'Ошибка') input.value += item.innerText
            else input.value = item.innerText
        })
    })
    notNumberButtons.forEach(item => {
        const buttonValue = item.textContent

        item.addEventListener('click', () => {
            const inputValue = Number(input.value)
            const historyP = document.createElement('p')

            if (buttonValue === '.') {
                if (input.value.length === 0) {
                    input.value += buttonValue
                }
                else if (!(input.value.includes('.'))){
                    input.value += buttonValue
                } else {
                    input.value = 'Ошибка'
                    historyText = historyText.slice(0, historyText.length - 2)
                }
                
            }
            if (buttonValue === 'ac') {
                setOperationValue('', '')
                historyText = ''
            }
            if (buttonValue === '+') setOperationValue(inputValue, buttonValue)
            if (buttonValue === '-') {
                if (!operationValue) {
                    setFirstValue(buttonValue, inputValue)
                    return
                }

                setOperationValue(inputValue, buttonValue)
            }
            if (buttonValue === '%') setOperationValue(inputValue, buttonValue)
            if (buttonValue === '÷') {
                if (!operationValue) {
                    setFirstValue(buttonValue, inputValue)
                    return
                }
                if (operationValue && inputValue === 0) {
                    input.value = 'Ошибка'
                    operation = ''
                    return
                }

                setOperationValue(inputValue, buttonValue)
            }
            if (buttonValue === 'x') {
                if (!operationValue) {
                    setFirstValue(buttonValue, inputValue)
                    return
                }

                setOperationValue(inputValue, buttonValue)
            }
            if (buttonValue === '√') {
                if (input.value >= 0) {
                    operationValue = inputValue
                    input.value = Math.sqrt(operationValue)
                }
                else {
                    input.value = 'Ошибка'
                    operationValue = ''
                }

                historyP.insertAdjacentText('beforeend', `√${inputValue} = ${input.value}`)
                historyBlock.insertAdjacentElement('beforeend', historyP)
            }
            if (buttonValue === '+/-') {
                inputValue <= 0?input.value = Math.abs(inputValue):input.value = `-${inputValue}`
            }
            if (buttonValue === '=' && operation) {
                setResultValue(inputValue, operation)
                historyP.insertAdjacentText('beforeend', historyText)
                historyBlock.insertAdjacentElement('beforeend', historyP)
                historyText = ''
            }
        })
    })


















})