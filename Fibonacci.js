const FibonacciInput = document.getElementById("FibonacciInput");
const FibonacciOutput = document.getElementById("FibonacciOutput");
const OutputWrapper = document.querySelector(".OutputWrapper");
const Rectangle = document.querySelector(".Rectangle");
const ResetButton = document.getElementById("ResetButton");
const Loading = document.getElementById("Loading");
const InputError = document.getElementById("InputError");
const Error = document.getElementById("Error");
const SaveCalculation = document.getElementById("SaveCalculation");
const SaveCalculationDiv = document.getElementById("SaveCalculationDiv");
const Checkbox = document.getElementById("Checkbox");
const PastResults = document.getElementById("PastResults");

const Loading2 = document.getElementById("Loading2");
const SaveCalculationCheckbox = document.getElementById(
  "SaveCalculationCheckbox"
);

document.getElementById("FibonacciInput").onblur = function () {
  OnBlur();
};

var inputs = document.getElementsByTagName("input");

function OnBlur() {
  if (FibonacciInput.value === "") {
    ShowError();
    Error.textContent = "Input cannot be empty";
    Rectangle.classList.remove("RectangleBorder");
  }
}

function FibonnaciEquation(Number) {
  if (Number === 0) {
    return 0;
  } else if (Number === 1) {
    return 1;
  } else {
    let a = 0;
    let b = 1;
    for (let i = 2; i <= Number; i++) {
      let Temporary = a + b;
      a = b;
      b = Temporary;
    }
    return b;
  }
}

function ShowLoading(Show) {
  Loading.classList.remove("Hidden");
}

function ShowLoading2(Show) {
  Loading2.classList.remove("Hidden");
  document.querySelector("li").classList.add("Hidden");
}

function ShowError(message) {
  Error.textContent = message;
  Error.classList.remove("Hidden");
  FibonacciInput.classList.add("InputError");
  FibonacciOutput.classList.add("Hidden");
  Loading.classList.add("Hidden");
  OutputWrapper.classList.remove("Margin");
  SaveCalculation.classList.add("Hidden");
  document.getElementById("Checkbox").checked = false;
}

function HideError() {
  Error.classList.add("Hidden");
  FibonacciInput.classList.remove("InputError");
  OutputWrapper.classList.add("Margin");
}

FibonacciInput.addEventListener("input", () => {
  const Number = parseInt(FibonacciInput.value);
  if (Number >= 0 && Number <= 20) {
    HideError();
    FibonacciOutput.classList.remove("Hidden");
    Rectangle.classList.remove("RectangleBorder");
    const Fibonacci = GetFromServer(Number);
  } else {
    SaveCalculationDiv.classList.add("Hidden");
    ShowError();
    SaveCalculation.classList.add("Hidden");
    Error.textContent = "Number must be lower than 20";
  }
});

FibonacciInput.addEventListener("input", () => {
  setTimeout(() => {
    const Number = parseInt(FibonacciInput.value);
    if (Number >= 0 && Number <= 20) {
      const Fibonacci = FibonnaciEquation(Number);
      FibonacciOutput.textContent = Fibonacci;
      FibonacciOutput.classList.remove("Hidden");
      OutputWrapper.classList.add("Margin");
    } else {
      FibonacciOutput.textContent = "Y";
    }
  }, 2500);
});

function FibonnaciEquation(Number) {
  HideError();
  if (Number === 0) {
    return 0;
  } else if (Number === 1) {
    return 1;
  } else {
    let a = 0;
    let b = 1;
    for (let i = 2; i <= Number; i++) {
      let Temporary = a + b;
      a = b;
      b = Temporary;
    }
    return b;
  }
}

FibonacciInput.addEventListener("input", () => {
  const Number = parseInt(FibonacciInput.value);
  if (Number == 123) {
    ShowError();
    Error.textContent = "418 - I'm a teapot!";
  }
});

FibonacciInput.addEventListener("input", () => {
  const Number = parseInt(FibonacciInput.value);
  if (Number > 123) {
    ShowError();
    Error.textContent = "Number is too high! Deleting input...";
    setTimeout(() => {
      FibonacciInput.value = "";
      Error.classList.add("Hidden");
      FibonacciInput.classList.remove("InputError");
      SaveCalculation.classList.add("Hidden");
      FibonacciOutput.classList.remove("Hidden");
      FibonacciOutput.textContent = "Y";
      document.getElementById("FibonacciOutput").textContent = "Y";
      SaveCalculationDiv.classList.add("Hidden");
      OutputWrapper.classList.add("Margin");
      Rectangle.classList.add("RectangleBorder");
    }, 800);
  }
});

function ResetInput() {
  FibonacciInput.value = "";
  Error.classList.add("Hidden");
  Loading.classList.add("Hidden");
  FibonacciInput.classList.remove("InputError");
  FibonacciOutput.classList.remove("Hidden");
  SaveCalculation.classList.add("Hidden");
  FibonacciOutput.textContent = "Y";
  document.getElementById("FibonacciOutput").textContent = "Y";
  document.getElementById("FibonacciInput").textContent = "";
  SaveCalculationDiv.classList.add("Hidden");
  OutputWrapper.classList.add("Margin");
  Rectangle.classList.add("RectangleBorder");
  document.getElementById("Checkbox").checked = false;
}

document.getElementById("ResetButton").addEventListener("click", ResetInput);

async function GetFromServer() {
  const FibonacciInput = document.getElementById("FibonacciInput");
  const Number = parseInt(FibonacciInput.value);
  SaveCalculation.classList.add("Hidden");
  ShowLoading();
  FibonacciOutput.classList.add("Hidden");
  OutputWrapper.classList.remove("Margin");
  SaveCalculationDiv.classList.remove("RemovePadding");
  ShowLoading2();
  try {
    const Response = await fetch(`http://localhost:3000/calculate/${Number}`);
    const data = await Response.json();
    console.log({ Response });
    if (Response.ok) {
      SaveCalculation.classList.remove("Hidden");
      FibonacciOutput.textContent = `${data.result}`;
      FibonacciOutput.classList.remove("Hidden");
      OutputWrapper.classList.add("Margin");
      Loading2.classList.add("Hidden");
      SaveCalculationDiv.classList.add("RemovePadding");
    } else {
      Error.textContent = `${data.error}`;
    }
  } finally {
    Loading.classList.add("Hidden");
    document.querySelector("li").classList.remove("Hidden");
  }
}

Checkbox.addEventListener("click", ShowDiv);

function ShowDiv() {
  const Checkbox = document.getElementById("Checkbox");
  const SaveCalculationDiv = document.getElementById("SaveCalculationDiv");
  if (Checkbox.checked) {
    SaveCalculationDiv.classList.remove("Hidden");
    FibonacciOutput.classList.add("Hidden");
  } else {
    SaveCalculationDiv.classList.add("Hidden");
    FibonacciOutput.classList.remove("Hidden");
  }
}

fetch("http://localhost:3000/results")
  .then((response) => {
    if (!response.ok) {
      ShowError();
      Error.textContent = "Failed to fetch past results";
      SaveCalculationDiv.classList.add("Hidden");
      return;
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.results.forEach((result) => {
      const li = document.createElement("li");
      li.className = "PastResult";
      li.textContent = `The Fibonnaci of ${result.number} is ${
        result.result
      }  ${GetDate(result.createdDate)}`;
      PastResults.appendChild(li);
    });
  })
  .catch((error) => {
    ShowError();
    Error.textContent = "Failed to fetch past results";
    SaveCalculationDiv.classList.add("Hidden");
  });

function GetDate(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}`;
}
