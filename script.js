const amountSlider = document.getElementById("loan-amount");
const daysSlider = document.getElementById("loan-days");
const amountDisplay = document.getElementById("loan-amount-display");
const daysDisplay = document.getElementById("loan-days-display");
const result = document.getElementById("loan-result");

function calculateLoan() {
    let amount = parseFloat(amountSlider.value);
    let days = parseInt(daysSlider.value);
    // Простой расчёт процентов: 0.5% в день
    let total = amount + (amount * 0.005 * days);
    result.textContent = total.toFixed(2);
}

// Слушатели ползунков
amountSlider.addEventListener("input", () => {
    amountDisplay.textContent = amountSlider.value;
    calculateLoan();
});
daysSlider.addEventListener("input", () => {
    daysDisplay.textContent = daysSlider.value;
    calculateLoan();
});

// Инициализация
calculateLoan();
