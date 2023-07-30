// DOM
let cDisplay = document.querySelector(".current-display")
let pDisplay = document.querySelector(".previus-display")

const display = document.querySelector(".display")
const currentDisplayContainer = document.querySelector(".current-display")
const numberInput = document.querySelectorAll(".number")
const operatorInput = document.querySelectorAll(".operator")
const reverseSign = document.querySelector(".reverse-sign")
const backspace = document.querySelector(".backspace")
const equal = document.querySelector(".equal")
const square = document.querySelector(".square-root")
const squared = document.querySelector(".squared")
const overx = document.querySelector(".overx")
const clear = document.querySelector(".clear")
const cancelEntry = document.querySelector(".cancel-entry")

// Start variables
let currentDisplay = []
let previusDisplay = []
let lastIsOperator = false

let previus = ""
let current = ""

let previusNumber = 0
let currentNumber = 0
let result = 0

let operatorUsed = ""

cDisplay.innerText += `0`
pDisplay.style.display = "none"

// Functions

const updateDisplay = () => {
    previus = previusDisplay.join("")
    current = currentDisplay.join("")
    operatorUsed = previusDisplay[previusDisplay.length - 1]
    previusNumber = Number(previus.slice(0, -1))
    currentNumber = Number(currentDisplay.join(""))
    pDisplay.innerText = previus
    cDisplay.innerText = current
    calculate(previusNumber, currentNumber, operatorUsed)
    adjustFontSize()
}

const adjustFontSize = () => {
    let currentFontSize = parseInt(getComputedStyle(cDisplay).fontSize)

    switch (true) {
        case cDisplay.clientWidth > display.clientWidth && currentFontSize >= 15:
            cDisplay.style.fontSize = `${currentFontSize - 1}px`
            break
        case cDisplay.clientWidth < display.clientWidth && currentFontSize <= 40:
            cDisplay.style.fontSize = `${currentFontSize + 1}px`
            break
        default:
            break
    }
}

const calculate = (previusNumber, currentNumber, operatorUsed) => {
    result = 0
    switch (operatorUsed) {
        case "+":
            result = previusNumber + currentNumber
            break
        case "-":
            result = previusNumber - currentNumber
            break
        case "*":
            result = previusNumber * currentNumber
            break
        case "/":
            result = previusNumber / currentNumber
            break
    }
}

const showResult = () => {
    pDisplay.innerText = `${previusNumber} ${operatorUsed} ${currentNumber} = `
    cDisplay.innerText = result.toFixed(3)
    resetVariables()
}

const performOperation = (operation) => {
    if (currentDisplay.length === 0) return
    switch (operation) {
        case "squareRoot":
            currentNumber = Math.sqrt(currentNumber)
            break
        case "pow":
            currentNumber = Math.pow(currentNumber, 2)
            break
        case "inverter":
            currentNumber = 1 / currentNumber
            break

        default:
            break
    }
    currentDisplay = currentNumber.toString().split("")
    updateDisplay()
}

const isOperator = (value) => ["+", "-", "*", "/"].includes(value)

const updateOperator = (buttonClicked) =>
    (previusDisplay[previusDisplay.length - 1] = buttonClicked)

const addOperator = (buttonClicked) => {
    currentDisplay.push(buttonClicked)
    previusDisplay = [...currentDisplay]
    currentDisplay.pop()
    lastIsOperator = true
    pDisplay.style.display = "flex"
}

const startNewExpression = (buttonClicked) => {
    currentDisplay = [buttonClicked]
    lastIsOperator = false
}

const addDigit = (buttonClicked) => {
    if (isOperator(buttonClicked)) {
        lastIsOperator
            ? updateOperator(buttonClicked)
            : addOperator(buttonClicked)
    } else {
        if (buttonClicked === ".") {
            if (!currentDisplay.includes(".")) {
                if (currentDisplay.length === 0) {
                    currentDisplay.push("0")
                }
                currentDisplay.push(buttonClicked)
            }
        } else {
            lastIsOperator
                ? startNewExpression(buttonClicked)
                : currentDisplay.push(buttonClicked)
        }
        lastIsOperator = false
    }
    updateDisplay()
}

const clearAll = () => {
    resetVariables()
    updateDisplay()
}

const clearEntry = () => {
    currentDisplay = []
    current = ""
    currentNumber = 0
    updateDisplay()
}

const removeDigit = () => {
    if (currentDisplay.length === 0) return
    currentDisplay.pop()
    updateDisplay()
}

const invertSign = () => {
    if (currentNumber !== 0) {
        currentNumber = -currentNumber
        currentDisplay = String(currentNumber).split("")
        updateDisplay()
    }
}

const resetVariables = () => {
    currentDisplay = []
    previusDisplay = []
    lastIsOperator = false
    previus = ""
    current = ""
    lastCalc = ""
    operatorUsed = ""
    result = 0
}
// Event Listeners

numberInput.forEach((buttonClicked) => {
    buttonClicked.addEventListener("click", () => {
        let clickedNumber = buttonClicked.value
        addDigit(clickedNumber)
    })
})

operatorInput.forEach((buttonClicked) => {
    buttonClicked.addEventListener("click", () => {
        let clickedNumber = buttonClicked.textContent
        addDigit(clickedNumber)
    })
})

backspace.addEventListener("click", removeDigit)
reverseSign.addEventListener("click", invertSign)
equal.addEventListener("click", showResult)
square.addEventListener("click", () => performOperation("squareRoot"))
squared.addEventListener("click", () => performOperation("pow"))
overx.addEventListener("click", () => performOperation("inverter"))
clear.addEventListener("click", clearAll)
cancelEntry.addEventListener("click", clearEntry)
