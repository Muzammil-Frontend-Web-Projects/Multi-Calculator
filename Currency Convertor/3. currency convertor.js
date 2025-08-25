// Event Listener to catch change in seletion in first drop down
const currencySet1 = document.getElementById("currencySet1");
let firstCurrency = "USD";
currencySet1.addEventListener("change", () => {
  fullValue = "";
  firstCurrency = currencySet1.value;
});

// Event Listener to catch change in seletion in first drop down
const currencySet2 = document.getElementById("currencySet2");
let secondCurrency = "PKR";
currencySet2.addEventListener("change", () => {
  fullValue = "";
  secondCurrency = currencySet1.value;
});

// Take input and render it
const digits = document.querySelectorAll(".digits");
const firstDisplay = document.getElementById("firstDisplay");
const secondDisplay = document.getElementById("secondDisplay");
let fullValue = "";
digits.forEach((digit) => {
  digit.addEventListener("click", async () => {
    const value = digit.innerText;
    if (fullValue.length == 0 && value == 0) {
    }
    else {
      fullValue = fullValue + value;
      firstDisplay.innerText = fullValue;
      const result = await calculation();
      historyRender(result);
    }
  });
});

// calculation
const URL = `https://open.er-api.com/v6/latest/USD`;
async function calculation() {
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);

  if (data.result == 'success') {
    const from = data.rates[firstCurrency];
    const to = data.rates[secondCurrency];
    let res = (fullValue / from) * to;
    secondDisplay.innerText = res;
    console.log(res);
    return res;
  }
}

// To remove digits from left
const cross = document.getElementById("cross");
cross.addEventListener("click", async () => {
  fullValue = fullValue.slice(0, -1);
  if (fullValue.length > 0) {
    firstDisplay.innerText = fullValue;
    const result = await calculation();
    historyRender(result);
  }
  else {
    firstDisplay.innerText = 0;
    secondDisplay.innerText = 0;
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
const historyRender = (result) => {
  let historyRecordC = JSON.parse(localStorage.getItem("historyRecordC")) || [];
  fullExpression = fullValue + " " + firstCurrency + "=" + result + secondCurrency;
  historyRecordC.push(fullExpression);
  localStorage.setItem("historyRecordC", JSON.stringify(historyRecordC));
  history.innerHTML = historyRecordC.join("<br><br>");
}

// Event listener to show history container
historyIcon.addEventListener("click", () => {
  let historyRecordC = JSON.parse(localStorage.getItem("historyRecordC")) || [];
  history.innerHTML = historyRecordC.join("<br><br>");
  historyContainer.classList.toggle("show");
});

// Delete history
const deleteHistory = document.querySelector(".fa-trash");
deleteHistory.addEventListener("click", () => {
  localStorage.clear("historyRecordC");
  history.innerHTML = "";
});


