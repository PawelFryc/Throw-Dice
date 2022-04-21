const diceDropdown = document.querySelector("#number-of-sides");
const throwButton = document.querySelector(".throw-button");
const modifierInput = document.querySelector("#modifier");
const resultsList = document.querySelector(".wyniki");
const clearButton = document.querySelector(".clear-button");
const customDiceInput = document.querySelector("#choose-dice");
const diceCount = document.querySelector("#dice-count");

//Wyświetlanie wyników
function addThrowResult(result, numberOfSides, mod) {
  const element = document.createElement("li");
  const diceType = `k${numberOfSides}`;
  const modSign = mod < 0 ? `-` : `+`;
  const modInfo = mod === 0 ? "" : ` ${modSign} ${Math.abs(mod)}`;
  const resultInfo = ` = ${result}`;
  element.innerHTML = diceType + modInfo + resultInfo;
  resultsList.appendChild(element);
}

function throwDice(numberOfSides, mod) {
  return Math.ceil(Math.random() * numberOfSides) + mod;
}

//Czyszczenie wyników rzutu
clearButton.addEventListener("click", function () {
  resultsList.innerHTML = "";
});

//Throw button
throwButton.addEventListener("click", function () {
  //Else IF
  // let numberOfSides = diceDropdown.value;
  // if (diceDropdown.value === "custom") {
  //   numberOfSides = customDiceInput.value;
  // }
  //turnary operator
  let numberOfSides =
    diceDropdown.value === "custom"
      ? customDiceInput.value
      : diceDropdown.value;
  //Zmiana stringu w cyfry (parsefloat dla ułamków)
  numberOfSides = parseInt(numberOfSides);

  const mod = modifierInput.value === "" ? 0 : parseInt(modifierInput.value);
  const result = Math.ceil(Math.random() * numberOfSides) + mod;
  addThrowResult(result, numberOfSides, mod);

  //Chujowy sposób
  // resultsList.innerHTML += `<li>${result}</li>`;
});

//
diceDropdown.addEventListener("change", function () {
  // if (diceDropdown.value === "custom") {
  //   customDiceInput.disabled = false;
  // }
  // else {
  //   customDiceInput.disabled = true;
  // }
  // customTypeReference.disabled = !(diceReference.value === "custom");
  customDiceInput.disabled = diceDropdown.value !== "custom";
});
