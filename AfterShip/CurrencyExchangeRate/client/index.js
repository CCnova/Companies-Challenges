const currencyInput = document.getElementById("currency-input");
const currencyBtn = document.getElementById("currency-btn");
const currencyList = document.getElementById("currency-list");

currencyBtn.addEventListener("click", () => {
  console.log(currencyInput.value);
  fetch(`http://localhost:3000?currency=${currencyInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { rates } = data;

      currencyList.innerHTML = "";

      for (const [currency, rate] of Object.entries(rates)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${currency}: ${rate}`;
        currencyList.appendChild(listItem);
      }
    });
});
