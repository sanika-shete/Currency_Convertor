let mainCurrecncySelectors = document.getElementById("from-currency");
let outPutCurrancyType = document.getElementById("to-currency");
let inputAmout = document.getElementById("amount");
let convertedAmount = document.getElementById("Converted");

let currencyTypes = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "NZD"];

let inputCurracyType = "USD";
let userEenteredAmount = 1;

// Populate dropdowns
currencyTypes.forEach((currency) => {
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");

    option1.value = currency;
    option1.innerText = currency;

    option2.value = currency;
    option2.innerText = currency;

    mainCurrecncySelectors.appendChild(option1);
    outPutCurrancyType.appendChild(option2);
});

// Change input currency
mainCurrecncySelectors.addEventListener("change", () => {
    inputCurracyType = mainCurrecncySelectors.value;
    userEenteredAmount = inputAmout.value;
});

// Convert function
async function convertCurrancy(changeto) {
    try {
        userEenteredAmount = inputAmout.value;

        if (inputCurracyType === changeto) {
            convertedAmount.value = userEenteredAmount;
            return;
        }

        let response = await fetch(`https://api.frankfurter.app/latest?from=${inputCurracyType}&to=${changeto}`);
        let data = await response.json();

        let rate = data.rates[changeto];
        let result = rate * userEenteredAmount;

        convertedAmount.value = result;

    } catch (error) {
        console.error("Error converting currency:", error);
    }
}

// When user changes "to currency"
outPutCurrancyType.addEventListener("change", () => {
    convertCurrancy(outPutCurrancyType.value);
});

// Button convert click
document.getElementById("convertBtn").addEventListener("click", () => {
    convertCurrancy(outPutCurrancyType.value);
});
