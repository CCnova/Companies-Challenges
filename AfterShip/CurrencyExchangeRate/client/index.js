const currencyInput = document.getElementById("currency-input");
const dateInput = document.getElementById("date-input");
const currencyBtn = document.getElementById("currency-btn");
const latestList = document.getElementById("latest-list");
const historicalList = document.getElementById("historical-list");

currencyBtn.addEventListener("click", () => {
  fetch(
    `http://localhost:3000?currency=${currencyInput.value}&date=${dateInput.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { latest, historical } = data;

      latestList.innerHTML = "";
      historicalList.innerHTML = "";

      for (const [currency, rate] of Object.entries(latest.rates)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${currency}: ${rate}`;
        latestList.appendChild(listItem);
      }

      for (const [currency, rate] of Object.entries(historical.rates)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${currency}: ${rate}`;
        historicalList.appendChild(listItem);
      }
    });
});
