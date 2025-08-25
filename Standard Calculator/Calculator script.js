const input = document.getElementById("input");
const digits = document.querySelectorAll("#digits");
const operators = document.querySelectorAll("#operators");
const isEqual = document.getElementById("isEqual");
const clearAll = document.getElementById("clearAll");
const sq = document.getElementById("sq");
const historyIcon = document.getElementById("historyIcon");
const historyContainer = document.getElementById("historyContainer");
const history = document.getElementById("history");

// Variables
let appendDigits = "";
let value = "";
let op = "";
let num1 = "";
let num2 = "";
let result = "";
let fullResult = "";
let his = [];

// Even Lisenter for digits
digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        const valueItem = digit.innerText || digit.dataset.value;
        value = valueItem;
        appendToInput(value);

        if (!op) {
            num1 += value;
        }
        else {
            num2 += value;
        }
    });
});
// Event Lintener for operator
operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (!op) {
            num1 ? op = operator.innerText || operator.dataset.value : "";

            appendToInput(op);
        }
    });
});
//  Fn to append input
function appendToInput(val) {
    appendDigits += val;
    input.value = appendDigits;
}
// Event Listener to calculate result
isEqual.addEventListener("click", () => {
    num1 = +num1;
    num2 = +num2;
    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;

            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        case '%':
            result = num1 % num2;
            break;
        default:
            break;
    }
    if(!Number.isInteger(result)){
        result = Math.round((result+Number.EPSILON)*100)/100;    
    }
    fullResult = num1 + op + num2;
    output();
});
// Fn for result
const output = () => {
    fullResult = fullResult + "=" + result;
    input.value = fullResult;
    historyRender();
    clear();
}
// Fn to clear
const clear = () => {
    appendDigits = "";
    op = "";
    num1 = "";
    num2 = "";
    result = "";
    fullResult = "";
}
// Event listener to clear all
clearAll.addEventListener("click", () => {
    input.value = 0;
    clear()
});
// Event Listener to change sign
const signChange = document.getElementById("signChange");
signChange.addEventListener("click", () => {
    if (num1) {
        num1 = 0 - num1;
        appendDigits = "";
        appendToInput(num1);
    }
});
// Event listener to take square
sq.addEventListener("click", () => {
    result = Math.pow(num1, 2);
    fullResult = "Sq of " + num1 +"="+ result;
    input.value = fullResult;
    historyRender();
    clear();
});
// Event listener to take square root
const sqrt = document.getElementById("sqrt");
sqrt.addEventListener("click", () => {
    result = Math.sqrt(num1);
    fullResult = "Sq of " + num1 +"="+ result;
    input.value = fullResult;
    historyRender();
    clear();
});
// Event listener to resiprocal
const resiprocal = document.getElementById("resiprocal");
resiprocal.addEventListener("click", () => {
    result = 1 / num1;
    fullResult = "Sq of " + num1 +"="+ result;
    input.value = fullResult;
    historyRender();
    clear();
});
// Event listener to add deciaml
const decimal = document.getElementById("decimal");
decimal.addEventListener("click", () => {
if (!num2.includes('.')) {
        num2 = num2 + '.';
        value = '.';
        appendToInput(value);
    }
    else if (!num1.includes('.')) {
        num1 = num1 + '.';
        value = '.';
        appendToInput(value);
    }
});

// Event listener for clear Element
const clearEl = document.getElementById("clearEl");
clearEl.addEventListener("click", () => {
    const parts = appendDigits.split(/[+\-*/%]/);
    if (num2) {
        num2 = "";
        appendDigits = parts[0] + op;
        appendToInput("");
        input.value = 0;
    }
    else if (num1 && !op) {
        num1 = ""
        appendDigits = "";
        appendToInput("");
        input.value = 0;
    }
    else if (num1 && op && !num2) {
        op = "";
        appendDigits = parts[0];
        appendToInput("");
    }
    else {
        input.value = 0;
    }
});

// Event to delete left
const cross = document.getElementById("cross");
cross.addEventListener("click", () => {
    if (num2) {
        num2 = num2.slice(0, -1);
    }
    else if (num1 && !op) {
        num1 = num1.slice(0, -1);
    }
    else if (num1 && op && !num2) {
        op = "";
    }

    appendDigits = appendDigits.slice(0, -1);
    appendToInput("");
});
const historyRender = () => {

    history.innerHTML = "";
    let historyRecord = JSON.parse(localStorage.getItem("historyRecord")) || [];
    if (fullResult.trim() !== "") {
        historyRecord.push(fullResult);
    }
    localStorage.setItem("historyRecord", JSON.stringify(historyRecord));
    history.innerHTML += historyRecord.join("<br><br>");

}
// Event listener to show history container
historyIcon.addEventListener("click", () => {
    historyRender();
    historyContainer.classList.toggle("show");
});

// To remove history
const deleteHistory = document.querySelector(".fa-trash");
deleteHistory.addEventListener("click",()=>{
localStorage.clear("historyRecord");
history.innerHTML = "";
});