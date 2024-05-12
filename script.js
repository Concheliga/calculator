document.addEventListener('DOMContentLoaded', () => {
    console.log('Doc loaded')
    const input = document.querySelector('input')
    const activeButton = Array.of(...document.querySelectorAll('button')).filter(button => !button.disabled)
    const numbers = activeButton.filter(item => !Number.isNaN(Number(item.innerText)))
    const notNumberButtons = activeButton.filter(item => !numbers.includes(item))
    let operationValue = 0
    let operation = ''

    function setOperationValue(inputValue, operationType) {
        if (operationType === '+') operationValue += inputValue
        else if (operationType === '-') operationValue -= inputValue
        else if (operationType === 'x') operationValue *= inputValue
        else if (operationType === '÷') operationValue /= inputValue
        else if (operationType === '%') operationValue = inputValue
        else operationValue = 0

        operation = operationType
        input.value = ''
    }

    function setFirstValue(operationSign, inputValue) {
        operationValue = inputValue
        input.value = ''
        operation = operationSign
    }

    function setResultValue(inputValue, operation) {
        switch (operation) {
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

        operation = ''
        operationValue = 0
    }

    numbers.forEach(item => {
        item.addEventListener('click', () => input.value += item.innerText)
    })
    notNumberButtons.forEach(item => {
        const buttonValue = item.textContent
        item.addEventListener('click', () => {
            const inputValue = Number(input.value)

            if (buttonValue === '.') input.value += buttonValue
            if (buttonValue === 'ac') setOperationValue('', '')
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
                operationValue = inputValue
                input.value = Math.sqrt(operationValue)
            }
            if (buttonValue === '+/-') {
                inputValue <= 0?input.value = Math.abs(inputValue):input.value = `-${inputValue}`
            }
            if (buttonValue === '=' && operation) setResultValue(inputValue, operation)
        })
    })


















})