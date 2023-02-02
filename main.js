// Operations and Numbers Button
const buttonNumbers = Array.from(document.querySelectorAll("[data-number]"))
const operations = Array.from(document.querySelectorAll("[data-operation]"))

// Display
const currentDisplay = document.querySelector(".current")
const prevDisplay = document.querySelector(".prev")

// Special Buttons
const buttonAC = document.querySelector("[data-clear]")
const buttonSquare = document.querySelector("[data-square]")
const buttonDelete = document.querySelector("[data-delete]")
const buttonNeg = document.querySelector("[data-negation]")
const buttonCompute = document.querySelector("[data-equals]")

// Select All Button
const allButton = document.querySelectorAll("button")

// Functions
function determineOperation(){
    if (prevDisplay.innerText.includes("+")){
            addition()
    } else if (prevDisplay.innerText.includes("-")){
            subtraction()
    } else if (prevDisplay.innerText.includes("÷")){
            division()
    } else if (prevDisplay.innerText.includes("x")){
            multiplication()
    }
}

function addition(){
    if(currentDisplay.innerText != "" && prevDisplay.innerText == ""){
        prevDisplay.innerText = currentDisplay.innerText + " +"
        currentDisplay.innerText = ""
    } else if(prevDisplay.innerText.includes("+") && currentDisplay.innerText != ""){
        currentDisplay.innerText = Number(prevDisplay.innerText.split(" ")[0]) + Number(currentDisplay.innerText)
        prevDisplay.innerText = ""
    } else {
        determineOperation()
    }
}

function subtraction(){
    if(currentDisplay.innerText != "" && prevDisplay.innerText == ""){
        prevDisplay.innerText = currentDisplay.innerText + " -"
        currentDisplay.innerText = ""
    } else if(prevDisplay.innerText.includes("-") && currentDisplay.innerText != ""){
        currentDisplay.innerText = Number(prevDisplay.innerText.split(" ")[0]) - Number(currentDisplay.innerText)
        prevDisplay.innerText = ""
    } else {
        determineOperation()
    }
}

function multiplication(){
    if(currentDisplay.innerText != "" && prevDisplay.innerText == ""){
        prevDisplay.innerText = currentDisplay.innerText + " x"
        currentDisplay.innerText = ""
    } else if(prevDisplay.innerText.includes("x") && currentDisplay.innerText != ""){
        currentDisplay.innerText = Number(prevDisplay.innerText.split(" ")[0]) * Number(currentDisplay.innerText)
        prevDisplay.innerText = ""
    } else {
        determineOperation()
    }
}

function division(){
    if(currentDisplay.innerText != "" && prevDisplay.innerText == ""){
        prevDisplay.innerText = currentDisplay.innerText + " ÷"
        currentDisplay.innerText = ""
    } else if(prevDisplay.innerText.includes("÷") && currentDisplay.innerText != ""){
        currentDisplay.innerText = Number(prevDisplay.innerText.split(" ")[0]) / Number(currentDisplay.innerText)
        prevDisplay.innerText = ""
        if (!Number.isFinite(Number(prevDisplay.innerText.split(" ")[0]) / Number(currentDisplay.innerText))){
            currentDisplay.innerText = "Math Error!"
            prevDisplay.innerText = ""
        }
    } else {
        determineOperation()
    }
}

function operationFunction(e){
    switch (this.innerText) {
        case "+":
            addition()
            break
        case "-":
            subtraction()
            break
        case "÷":
            division()
            break
        case "x":
            multiplication()
            break
    }
}

function captureButton(e){
    if (currentDisplay.innerText.includes(".")){
        if (this.innerText != "."){
            currentDisplay.innerText += this.innerText
        }
    } else {
        currentDisplay.innerText += this.innerText
    }
    
}   

function specialButtonFunc(e){
    switch (this.innerText){
        case "CLEAR":
            currentDisplay.innerText = "0"
            prevDisplay.innerText = ""
            break
        case "←":
            currentDisplay.innerText = currentDisplay.innerText.slice(0,-1)
            break
        case "√":
            prevDisplay.innerText = ""
            currentDisplay.innerText = Math.sqrt(Number(currentDisplay.innerText)).toFixed(4)
            break
        case "+/-":
            currentDisplay.innerText = Number(currentDisplay.innerText) * -1
            break
        case "=":
            if (prevDisplay.innerText.includes("+")){
                addition()
            } else if (prevDisplay.innerText.includes("-")) {
                subtraction()
            } else if (prevDisplay.innerText.includes("÷")) {
                division()
            } else if (prevDisplay.innerText.includes("x")) {
                multiplication()
            }
            checkLengthDisplay()
            break
    }
}

function timeOutEvent(){
    currentDisplay.innerText = ""
    prevDisplay.innerText = ""
}

function checkLengthDisplay(){
    if((currentDisplay.innerText.length >= 18 && currentDisplay.innerText.length <= 49) || (prevDisplay.innerText.length >= 18 && currentDisplay.innerText.length <= 49)){
        currentDisplay.style.cssText = "font-size:30px"
        prevDisplay.style.cssText = "font-size:30px"
    } else if ((currentDisplay.innerText.length >= 49 && currentDisplay.innerText.length <= 53) || (prevDisplay.innerText.length >= 49 && currentDisplay.innerText.length <= 53)){
        currentDisplay.style.cssText = "font-size:20px"
        prevDisplay.style.cssText = "font-size:20px"
    } else if ((currentDisplay.innerText.length >= 0 && currentDisplay.innerText.length <= 17) || (prevDisplay.innerText.length >= 0 && prevDisplay.innerText.length <= 17)){
        currentDisplay.style.cssText = "font-size:40px"
        prevDisplay.style.cssText = "font-size:40px"
    }
    
    if (currentDisplay.innerText.length >= 53) {
        currentDisplay.innerText = currentDisplay.innerText.slice(0,-1)
    }

    if (prevDisplay.innerText.length >= 53){
        prevDisplay.style.cssText = "font-size:20px"
    }

    if (currentDisplay.innerText == "Infinity"||currentDisplay.innerText == "Math Error!"){
        setTimeout(timeOutEvent,2000)
    }

    if (currentDisplay.innerText == "NaN"){
        currentDisplay.innerText = ""
        prevDisplay.innerText = ""
    }
}

function removeTransition(e){
    e.target.classList.remove("button-transition");
}

function transitionButtonStart(){
    this.classList.add("button-transition")
}

buttonNumbers.map(button => button.addEventListener("click",captureButton))
operations.map(button => button.addEventListener("click", operationFunction))

buttonAC.addEventListener("click",specialButtonFunc)
buttonSquare.addEventListener("click",specialButtonFunc)
buttonDelete.addEventListener("click",specialButtonFunc)
buttonNeg.addEventListener("click",specialButtonFunc)
buttonCompute.addEventListener("click",specialButtonFunc)

// Transition Button - Start - End
allButton.forEach(buttonS => {
    buttonS.addEventListener("click",transitionButtonStart)
})

allButton.forEach(buttonE => {
    buttonE.addEventListener("transitionend",removeTransition)
})

// Check Length Function to All Button
allButton.forEach(buttonAll => {
    buttonAll.addEventListener("click",checkLengthDisplay)
})