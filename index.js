const get = document.querySelector.bind(document);
const diceDropdown = get("#number-of-sides");
const throwButton = get(".throw-button");
const modifierInput = get("#modifier");
const resultsList = get(".wyniki");
const clearButton = get(".clear-button");
const customDiceInput = get("#choose-dice");
const diceCount = get("#dice-count");

//Wyświetlanie wyników
function addThrowResult(result, numberOfSides, mod) {
  const element = document.createElement("li");
  const diceType = `k${numberOfSides}`;
  const modSign = mod < 0 ? `-` : `+`;
  const modInfo = mod === 0 ? "" : ` ${modSign} ${Math.abs(mod)}`;
  const resultInfo = ` = ${result}`;
  const ammontOfDice = diceCount.value === "1" ? "" : `${diceCount.value}`;
  element.innerHTML = ammontOfDice + diceType + modInfo + resultInfo;
  resultsList.appendChild(element);
}
//Funkcja rzutu
function throwDice(numberOfSides, mod) {
  return Math.ceil(Math.random() * numberOfSides) + mod;
}
//Czyszczenie wyników rzutu
clearButton.addEventListener("click", function () {
  resultsList.innerHTML = "";
});
diceCount.addEventListener("input", function (event) {
  if (parseInt(event.target.value) <= 0) {
    diceCount.value = 1;
  }
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

  const modifier =
    modifierInput.value === "" ? 0 : parseInt(modifierInput.value);
  // const result = Math.ceil(Math.random() * numberOfSides) + modifier;
  let result = modifier;
  for (let i = 0; i < diceCount.value; i++) {
    result += Math.ceil(Math.random() * numberOfSides);
  }
  addThrowResult(result, numberOfSides, modifier);

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
