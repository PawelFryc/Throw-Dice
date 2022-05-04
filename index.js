const get = document.querySelector.bind(document);

function addWiersz() {
  const throwTemplate = get("#throw-template");
  const newThrow = throwTemplate.cloneNode(true);
  newThrow.id = "";

  const throwsList = get(".throws-list");
  throwsList.appendChild(newThrow);

  const customDiceInput = newThrow.querySelector(".choose-dice");
  const diceDropdownInput = newThrow.querySelector(".number-of-sides");
  const diceCountInput = newThrow.querySelector(".dice-count");

  diceDropdownInput.addEventListener("change", function () {
    customDiceInput.disabled = diceDropdownInput.value !== "custom";
  });
  diceCountInput.addEventListener("input", function (event) {
    if (parseInt(event.target.value) <= 0) {
      diceCountInput.value = 1;
    }
  });
  const removeButton = newThrow.querySelector(".remove-button");
  removeButton.addEventListener("click", function () {
    newThrow.parentNode.removeChild(newThrow);
  });
}

function getChildrenByClass(htmlElement, stringSelector) {
  // zczytaj listę elementów html w throwsList
  const nodesList = htmlElement.querySelectorAll(stringSelector);
  // zamień upośledzoną listę elementów na legitny array
  const elementsArray = Array.from(nodesList);

  return elementsArray;
}

//Wyświetlanie wyników
function displaySingleThrowResult(result, numberOfSides, mod, diceCount) {
  const element = document.createElement("li");
  const diceType = `k${numberOfSides}`;
  const modSign = mod < 0 ? `-` : `+`;
  const modInfo = mod === 0 ? "" : ` ${modSign} ${Math.abs(mod)}`;
  const resultInfo = ` = ${result}`;
  const ammontOfDice = diceCount === "1" ? "" : diceCount;
  element.innerHTML = ammontOfDice + diceType + modInfo + resultInfo;

  const resultsList = get(".wyniki");
  resultsList.appendChild(element);
}

//Wyświetlanie wyników
function displayThrowsSum(sum) {
  const element = document.createElement("li");
  element.className = "throw-space";
  element.innerHTML = `Sum: ${sum}`;
  const resultsList = get(".wyniki");
  resultsList.appendChild(element);
}

function doTheFuckingThrow(throwElement) {
  // zbieramy wartości pól pojedynczego rzutu
  let diceCountInput = throwElement.querySelector(".dice-count").value;
  const numberOfSidesInput =
    throwElement.querySelector(".number-of-sides").value;
  const customDiceSidesInput = throwElement.querySelector(".choose-dice").value;
  const modifierInput = throwElement.querySelector(".modifier").value;

  // prettier-ignore
  let sides = numberOfSidesInput === 'custom'
    ? customDiceSidesInput
    : numberOfSidesInput;

  sides = parseInt(sides);

  const modifier = modifierInput === "" ? 0 : parseInt(modifierInput);

  let result = modifier;
  // dodaj do wyniku tyle rzutów kości ile jest diceCount
  for (let i = 0; i < diceCountInput; i++) {
    result += Math.ceil(Math.random() * sides);
  }

  displaySingleThrowResult(result, sides, modifier, diceCountInput);
  //Chujowy sposób
  // resultsList.innerHTML += `<li>${result}</li>`;
  return result;
}

//Throw button

window.addEventListener("load", function () {
  const throwButton = get(".throw-button");
  const clearButton = get(".clear-button");
  const addButton = get(".add-button");

  throwButton.addEventListener("click", function () {
    const throwsList = get(".throws-list");
    const throws = getChildrenByClass(throwsList, ".throw");
    let resultsSum = 0;
    throws.forEach(function (element) {
      resultsSum += doTheFuckingThrow(element);
    });
    displayThrowsSum(resultsSum);
  });

  clearButton.addEventListener("click", function () {
    const resultsList = get(".wyniki");
    resultsList.innerHTML = "";
  });

  addButton.onclick = addWiersz;

  addWiersz();
});
//
