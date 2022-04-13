const diceDropdown = document.querySelector("#number-of-sides");
const throwButton = document.querySelector(".throw-button");
const modifierInput = document.querySelector("#modifier");
const resultsList = document.querySelector(".wyniki");
const clearButton = document.querySelector(".clear-button");
const customDiceInput = document.querySelector("#choose-dice");

function addThrowResult(result, numberOfSides) {
  const element = document.createElement("li");
  element.innerHTML = `k${numberOfSides} = ${result}`;
  resultsList.appendChild(element);
}

throwButton.addEventListener("click", function () {
  //Else IF
  // let numberOfSides = diceDropdown.value;
  // if (diceDropdown.value === "custom") {
  //   numberOfSides = customDiceInput.value;
  // }
  //turnary operator
  const numberOfSides =
    diceDropdown.value === "custom"
      ? customDiceInput.value
      : diceDropdown.value;

  const result = Math.ceil(Math.random() * numberOfSides);
  addThrowResult(result, numberOfSides);
  //Chujowy sposób
  // resultsList.innerHTML += `<li>${result}</li>`;
});

clearButton.addEventListener("click", function () {
  resultsList.innerHTML = "";
});

diceDropdown.addEventListener("change", function () {
  // if (diceReference.value === "custom") {
  //   customTypeReference.disabled = false;
  // }
  // else {
  //   customTypeReference.disabled = true;
  // }
  // customTypeReference.disabled = !(diceReference.value === "custom");
  customDiceInput.disabled = diceDropdown.value !== "custom";
});
