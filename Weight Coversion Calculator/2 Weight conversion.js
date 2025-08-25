// Object to store unit values
const unitValues = {
  Milligrams: 0.001,
  Centigrams: 0.01,
  Decigrams: 0.1,
  Grams: 1,
  Dekagrams: 10,
  Hectograms: 100,
  Kilogram: 1000,
  Tonnes: 1000000,
  Ounces: 28.3495,
  Pounds: 453.592,
  Stone: 6350.29,
  // Short tons: 907185,
  // longTon: 1016046.9
};

// variables
let fullValue = '';
let firstUnit = 'Kilogram';
let secondUnit = 'Grams';
let calculatedResult = "";

// To track the change in first dop down
const firstDropDown = document.getElementById("firstDropDown");
firstDropDown.addEventListener("change", () => {

  firstUnit = firstDropDown.options[firstDropDown.selectedIndex].text;
  fullValue = "";
});

// To track the change in second dop down
const secondDropDown = document.getElementById("secondDropDown");
secondDropDown.addEventListener("change", () => {
  secondUnit = secondDropDown.options[secondDropDown.selectedIndex].text;
  fullValue = "";
});

// To render the values
const firstDisplay = document.getElementById("firstDisplay");
digits = document.querySelectorAll(".digits");
digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    const value = digit.innerText;
    fullValue == 0 ? fullValue = "" : fullValue
    if (value == 0) {
      fullValue = 0;
    }
    else {
      fullValue = fullValue + value;
    }
    firstDisplay.innerText = fullValue;
    calculation();
    historyRender()
  });
});

//  To calculate and render results 
const secondDisplay = document.getElementById("secondDisplay");
const calculation = () => {
  calculatedResult = fullValue * unitValues[firstUnit] / unitValues[secondUnit];
  calculatedResult = parseFloat(calculatedResult.toFixed(2));
  secondDisplay.innerText = calculatedResult;
}

// To remove digits from left
const cross = document.getElementById("cross");
cross.addEventListener("click", () => {
  if (fullValue.length > 1) {
    fullValue = fullValue.slice(0, -1);
  }
  else {
    fullValue = 0;
  }
  firstDisplay.innerText = fullValue;
  calculation();
  if (fullValue !== 0) {
    console.log(fullValue);

    historyRender()
  }
});

// To clear all
const clearAll = document.getElementById("clearAll");
clearAll.addEventListener("click", () => {
  fullValue = "";
  firstDisplay.innerText = 0;
  secondDisplay.innerText = 0;
});

// History render
const historyIcon = document.getElementById("historyIcon");
const historyContainer = document.getElementById("historyContainer");
const history = document.getElementById("history");
let fullExpression = "";
const historyRender = () => {
  let historyRecordW = JSON.parse(localStorage.getItem("historyRecordW")) || [];
  fullExpression = fullValue + firstUnit + "=" + calculatedResult + secondUnit;
  historyRecordW.push(fullExpression);
  localStorage.setItem("historyRecordW", JSON.stringify(historyRecordW));
  history.innerHTML = historyRecordW.join("<br><br>");
}

// Event listener to show history container
historyIcon.addEventListener("click", () => {
  let historyRecordW = JSON.parse(localStorage.getItem("historyRecordW")) || [];
  history.innerHTML = historyRecordW.join("<br><br>");
  historyContainer.classList.toggle("show");
});

// Delete history
const deleteHistory = document.querySelector(".fa-trash");
deleteHistory.addEventListener("click",()=>{
localStorage.clear("historyRecordW");
history.innerHTML = "";
});