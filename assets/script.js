var submitForm = document.getElementById("rateForm");
var currentRatesSection = document.getElementById("currentRates")
var convertSubmit = document.getElementById("convertForm")

var myHeaders = new Headers();
myHeaders.append("apikey", "0SLoI4nb45Yf4jdHudgiFS0IMLWXY3Uq");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

// Handles all current rate checks

function searchApi(currBase, currSymb) {

  fetch("https://api.apilayer.com/exchangerates_data/latest?symbols="+ currSymb +"&base=" + currBase, requestOptions)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    var resultList = document.createElement("ul");
    var rate = data.rates[currSymb]
    currentRatesSection.appendChild(resultList);
    resultList.style.color = "#e4ebee"
    resultList.innerHTML = "1 "+ currBase + " = "+ currSymb + " " +rate;
  })
}

function formRateSubmit(event) {
  event.preventDefault();

  var currBase = document.getElementById("currencyBase").value;
  var currSymb = document.getElementById("currencySymbols").value; 

  searchApi(currBase, currSymb);
}

// Handles all convert operations 

function searchApiConvert(convertAmount, convertFrom, convertTo) {
  fetch("https://api.apilayer.com/exchangerates_data/convert?to="+ convertTo +"&from="+ convertFrom +"&amount="+ convertAmount, requestOptions)
  .then((response)=> response.json())
  .then((data) => {
    console.log(data)
  })
}

function formConvertSubmit(event) {
  event.preventDefault();

  var convertAmount = document.getElementById("convertAmount").value;
  var convertFrom = document.getElementById("convertFrom").value;
  var convertTo = document.getElementById("convertTo").value;

  searchApiConvert(convertAmount, convertFrom, convertTo);
}



// Form submisson eventListeners

submitForm.addEventListener("submit", formRateSubmit);
convertSubmit.addEventListener("submit", formConvertSubmit);


 




