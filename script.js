const unitOptions = {
  length: [
    { value: "meters", text: "Meter" },
    { value: "kilometers", text: "Kilometer" },
    { value: "centimeters", text: "Centimeter" },
    { value: "feet", text: "Foot" },
    { value: "miles", text: "Miles" },
    { value: "inches", text: "Inch" },
  ],
  area: [
    { value: "squareMeters", text: "Square Meter" },
    { value: "squareKilometers", text: "Square Kilometer" },
    { value: "squareCentimeters", text: "Square Centimeter" },
    { value: "squareFeet", text: "Square Foot" },
    { value: "squareMiles", text: "Square Miles" },
    { value: "squareInches", text: "Square Inch" },
  ],
  temperature: [
    { value: "celsius", text: "Celsius" },
    { value: "fahrenheit", text: "Fahrenheit" },
    { value: "kelvin", text: "Kelvin" },
  ],
  time: [
    { value: "seconds", text: "Second" },
    { value: "minutes", text: "Minute" },
    { value: "hours", text: "Hour" },
    { value: "days", text: "Day" },
    { value: "months", text: "Month" },
    { value: "years", text: "Year" },
  ],
};

const conversionRates = {
  length: {
    meters: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      feet: 3.28084,
      miles: 0.000621371,
      inches: 39.3701,
    },
    kilometers: {
      meters: 1000,
      kilometers: 1,
      centimeters: 100000,
      feet: 3280.84,
      miles: 0.621371,
      inches: 39370.1,
    },
    centimeters: {
      meters: 0.01,
      kilometers: 0.00001,
      centimeters: 1,
      feet: 0.0328084,
      miles: 0.0000062137,
      inches: 0.393701,
    },
    feet: {
      meters: 0.3048,
      kilometers: 0.0003048,
      centimeters: 30.48,
      feet: 1,
      miles: 0.000189394,
      inches: 12,
    },
    miles: {
      meters: 1609.34,
      kilometers: 1.60934,
      centimeters: 160934,
      feet: 5280,
      miles: 1,
      inches: 63360,
    },
    inches: {
      meters: 0.0254,
      kilometers: 0.0000254,
      centimeters: 2.54,
      feet: 0.0833333,
      miles: 0.0000157828,
      inches: 1,
    },
  },
  area: {
    squareMeters: {
      squareMeters: 1,
      squareKilometers: 1e-6,
      squareCentimeters: 10000,
      squareFeet: 10.7639,
      squareMiles: 3.861e-7,
      squareInches: 1550,
    },
    squareKilometers: {
      squareMeters: 1e6,
      squareKilometers: 1,
      squareCentimeters: 1e10,
      squareFeet: 1.076e7,
      squareMiles: 0.386102,
      squareInches: 1.55e9,
    },
    squareCentimeters: {
      squareMeters: 0.0001,
      squareKilometers: 1e-10,
      squareCentimeters: 1,
      squareFeet: 0.00107639,
      squareMiles: 3.861e-11,
      squareInches: 0.155,
    },
    squareFeet: {
      squareMeters: 0.092903,
      squareKilometers: 9.2903e-8,
      squareCentimeters: 929.03,
      squareFeet: 1,
      squareMiles: 3.587e-8,
      squareInches: 144,
    },
    squareMiles: {
      squareMeters: 2.59e6,
      squareKilometers: 2.58999,
      squareCentimeters: 2.59e10,
      squareFeet: 2.788e7,
      squareMiles: 1,
      squareInches: 4.014e9,
    },
    squareInches: {
      squareMeters: 0.00064516,
      squareKilometers: 6.4516e-10,
      squareCentimeters: 6.4516,
      squareFeet: 0.00694444,
      squareMiles: 2.491e-10,
      squareInches: 1,
    },
  },
  temperature: {
    celsius: {
      celsius: (value) => value,
      fahrenheit: (value) => (value * 9) / 5 + 32,
      kelvin: (value) => value + 273.15,
    },
    fahrenheit: {
      celsius: (value) => ((value - 32) * 5) / 9,
      fahrenheit: (value) => value,
      kelvin: (value) => ((value - 32) * 5) / 9 + 273.15,
    },
    kelvin: {
      celsius: (value) => value - 273.15,
      fahrenheit: (value) => ((value - 273.15) * 9) / 5 + 32,
      kelvin: (value) => value,
    },
  },
  time: {
    seconds: {
      seconds: 1,
      minutes: 1 / 60,
      hours: 1 / 3600,
      days: 1 / 86400,
      months: 1 / 2.628e6,
      years: 1 / 3.154e7,
    },
    minutes: {
      seconds: 60,
      minutes: 1,
      hours: 1 / 60,
      days: 1 / 1440,
      months: 1 / 43800,
      years: 1 / 525600,
    },
    hours: {
      seconds: 3600,
      minutes: 60,
      hours: 1,
      days: 1 / 24,
      months: 1 / 730,
      years: 1 / 8760,
    },
    days: {
      seconds: 86400,
      minutes: 1440,
      hours: 24,
      days: 1,
      months: 1 / 30.417,
      years: 1 / 365,
    },
    months: {
      seconds: 2.628e6,
      minutes: 43800,
      hours: 730,
      days: 30.417,
      months: 1,
      years: 1 / 12,
    },
    years: {
      seconds: 3.154e7,
      minutes: 525600,
      hours: 8760,
      days: 365,
      months: 12,
      years: 1,
    },
  },
};

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
