const get = document.querySelector.bind(document);
const diceDropdown = get('.number-of-sides');
const throwButton = get('.throw-button');
const modifierInput = get('.modifier');
const resultsList = get('.wyniki');
const clearButton = get('.clear-button');
const customDiceInput = get('.choose-dice');
const diceCount = get('.dice-count');
const addButton = get('.add-button');
const throwTemplate = get('#throw-template');
const throwsList = get('.throws-list');

addButton.onclick = function () {
  const newThrow = throwTemplate.cloneNode(true);
  newThrow.id = '';
  throwsList.appendChild(newThrow);
};

function getChildrenByClass(htmlElement, stringSelector) {
  // zczytaj listę elementów html w throwsList
  const nodesList = htmlElement.querySelectorAll(stringSelector);
  // zamień upośledzoną listę elementów na legitny array
  const elementsArray = Array.from(nodesList);

  return elementsArray;
}

//Wyświetlanie wyników
function addThrowResult(result, numberOfSides, mod, diceCount) {
  const element = document.createElement('li');
  const diceType = `k${numberOfSides}`;
  const modSign = mod < 0 ? `-` : `+`;
  const modInfo = mod === 0 ? '' : ` ${modSign} ${Math.abs(mod)}`;
  const resultInfo = ` = ${result}`;
  const ammontOfDice = diceCount === '1' ? '' : diceCount;
  element.innerHTML = ammontOfDice + diceType + modInfo + resultInfo;
  resultsList.appendChild(element);
}

//Czyszczenie wyników rzutu
clearButton.addEventListener('click', function () {
  resultsList.innerHTML = '';
});

// move it inside single doTheFuckingThrow
diceCount.addEventListener('input', function (event) {
  if (parseInt(event.target.value) <= 0) {
    diceCount.value = 1;
  }
});

function doTheFuckingThrow(throwElement) {
  // zbieramy wartości pól pojedynczego rzutu
  let diceCountInput = throwElement.querySelector('.dice-count').value;
  const numberOfSidesInput =
    throwElement.querySelector('.number-of-sides').value;
  const customDiceSidesInput = throwElement.querySelector('.choose-dice').value;
  const modifierInput = throwElement.querySelector('.modifier').value;

  // prettier-ignore
  let sides = numberOfSidesInput === 'custom'
    ? customDiceSidesInput
    : numberOfSidesInput;

  sides = parseInt(sides);

  const modifier = modifierInput === '' ? 0 : parseInt(modifierInput);

  let result = modifier;
  // dodaj do wyniku tyle rzutów kości ile jest diceCount
  for (let i = 0; i < diceCountInput; i++) {
    result += Math.ceil(Math.random() * sides);
  }

  addThrowResult(result, sides, modifier, diceCountInput);
  //Chujowy sposób
  // resultsList.innerHTML += `<li>${result}</li>`;
}

//Throw button
throwButton.addEventListener('click', function () {
  const throws = getChildrenByClass(throwsList, '.throw');
  throws.forEach(doTheFuckingThrow);
});

//
diceDropdown.addEventListener('change', function () {
  // if (diceDropdown.value === "custom") {
  //   customDiceInput.disabled = false;
  // }
  // else {
  //   customDiceInput.disabled = true;
  // }
  // customTypeReference.disabled = !(diceReference.value === "custom");
  customDiceInput.disabled = diceDropdown.value !== 'custom';
});
