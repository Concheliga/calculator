document.addEventListener('DOMContentLoaded', () => {
    console.log('Doc loaded')
    const input = document.querySelector('input')
    const activeButton = Array.of(...document.querySelectorAll('button')).filter(button => !button.disabled)
    const numbers = activeButton.filter(item => !Number.isNaN(Number(item.innerText)))
    const notNumberButtons = activeButton.filter(item => !numbers.includes(item))
    let firstValue = 0
    let operation = ''

    numbers.forEach(item => {
        item.addEventListener('click', ()=>input.value += item.innerText)
    })
    notNumberButtons.forEach(item=>{
        const buttonValue = item.textContent
        item.addEventListener('click', () => {
            const inputValue = Number(input.value)

            if (buttonValue === '.') input.value += buttonValue
            if (buttonValue === 'ac') {
                input.value = ''
                firstValue = 0
                operation = ''
            }
            if (buttonValue === '+') {
                firstValue += inputValue
                input.value = ''
                operation = '+'
            }
            if (buttonValue === '-') {
                if (!firstValue) {
                    firstValue = inputValue
                    input.value = ''
                    operation = '-'
                    return
                }
                firstValue -= inputValue
                input.value = ''
                operation = '-'
            }
            if (buttonValue === '%') {
                firstValue = input.value
                input.value = ''
                operation = '%'
            }
            if (buttonValue === '÷') {
                if (!firstValue) {
                    firstValue = inputValue
                    input.value = ''
                    operation = '/'
                    return
                }
                if (firstValue && inputValue === 0) {
                    input.value = 'Ошибка'
                    operation = ''
                    return
                }
                firstValue /= inputValue
                input.value = ''
                operation = '/'
            }
            if (buttonValue === '÷') {
                if (!firstValue) {
                    firstValue = inputValue
                    input.value = ''
                    operation = 'x'
                    return
                }
                firstValue *= inputValue
                input.value = ''
                operation = 'x'
            }
            if (buttonValue === '√') {
                firstValue = inputValue
                input.value = Math.sqrt(firstValue)
            }
            if (buttonValue === '+/-') {
                if (inputValue < 0) input.value = Math.abs(inputValue)
                if (inputValue > 0) input.value = `-${inputValue}`
            }
            if (buttonValue === '=') {
                switch(operation) {
                    case '+':
                        input.value = inputValue + firstValue
                        break
                    case '-':
                        input.value = firstValue - inputValue
                        break
                    case '%':
                        input.value = (inputValue / 100) * firstValue
                        break
                    case '/':
                        if (inputValue === 0) {
                            input.value = 'Ошибка'
                            break
                        }
                        input.value = firstValue / inputValue
                        break
                    case 'x':
                        input.value = firstValue * inputValue
                        break
                }
                operation = ''
                firstValue = 0
            }
        })
    })


















})