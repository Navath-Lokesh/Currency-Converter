const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
let finalAmount = (amtVal * rate).toFixed(2);
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});



// mode button start here

let modeBtn = document.querySelector("#modeBtn");
let moon = document.querySelector("#moon");
let sun = document.querySelector("#sun");
let modeText = document.querySelector("#modeBtn h3")
let body = document.querySelector("body");
let container = document.querySelector(".container");



modeBtn.addEventListener("click",() => {
    if(body.classList.contains("light")){
        body.classList.replace("light","dark");
        container.classList.remove("container_light");
        container.classList.add("container_dark");
        moon.style.display = "none";
        sun.style.display = "block";
        modeText.textContent = "light Mode";
    }
    else {
        body.classList.replace("dark","light");
        container.classList.remove("container_dark");
        container.classList.add("container_light")
        sun.style.display = "none";
        moon.style.display = "block";
        modeText.textContent = "Dark Mode";
    }
});



