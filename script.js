function populateUnits() {
  let unitType = document.getElementById("unitType").value;
  let inputUnitSelect = document.getElementById("inputUnit");
  let outputUnitSelect = document.getElementById("outputUnit");

  inputUnitSelect.innerHTML = "";
  outputUnitSelect.innerHTML = "";

  unitOptions[unitType].forEach((option) => {
    let inputOption = document.createElement("option");
    inputOption.value = option.value;
    inputOption.text = option.text;
    inputUnitSelect.appendChild(inputOption);

    let outputOption = document.createElement("option");
    outputOption.value = option.value;
    outputOption.text = option.text;
    outputUnitSelect.appendChild(outputOption);
  });
}
document.addEventListener("DOMContentLoaded", populateUnits);

function convert() {
  let unitType = document.getElementById("unitType").value;
  let inputValue = parseFloat(document.getElementById("inputValue").value);
  let inputUnit = document.getElementById("inputUnit").value;
  let outputUnit = document.getElementById("outputUnit").value;
  if (isNaN(inputValue)) {
    alert("Please enter a valid number");
    return;
  }

  let conversionFactor = conversionRates[unitType][inputUnit][outputUnit];
  let convertedValue;
  if (unitType === "temperature") {
    convertedValue =
      conversionRates[unitType][inputUnit][outputUnit](inputValue);
  } else {
    convertedValue = inputValue * conversionFactor;
    if (convertedValue > 0) {
      convertedValue = parseFloat(convertedValue.toFixed(5));
    }
  }

  document.getElementById("outputValue").value = convertedValue;

  let formula;
  if (unitType === "temperature") {
    if (inputUnit === "celsius" && outputUnit === "fahrenheit") {
      formula = `multiply the temperature value by 9/5 and add 32`;
    } else if (inputUnit === "fahrenheit" && outputUnit === "celsius") {
      formula = `subtract 32 from the temperature value and multiply by 5/9`;
    } else if (inputUnit === "celsius" && outputUnit === "kelvin") {
      formula = `add 273.15 to the temperature value`;
    } else if (inputUnit === "kelvin" && outputUnit === "celsius") {
      formula = `subtract 273.15 from the temperature value`;
    } else if (inputUnit === "fahrenheit" && outputUnit === "kelvin") {
      formula = `subtract 32 from the temperature value, multiply by 5/9, and add 273.15`;
    } else {
      formula = `subtract 273.15 from the temperature value, multiply by 9/5, and add 32`;
    }
  } else {
    if (conversionFactor >= 1) {
      formula = `multiply the ${unitType} value by ${conversionFactor}`;
    } else {
      let divisor = Math.round(1 / conversionFactor);
      formula = `divide the ${unitType} value by ${divisor}`;
    }
  }

  document.getElementById("conversionFormula").innerText = formula;
}

function clearInput() {
  document.getElementById("inputValue").value = 0;
  document.getElementById("outputValue").value = 0;
  document.getElementById("conversionFormula").innerText = "";
}
