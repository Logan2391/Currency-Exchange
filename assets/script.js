var submitForm = document.getElementById("rateForm");
var currentRatesSection = document.getElementById("currentRates");
var convertSubmit = document.getElementById("convertForm");
var convertedData = document.getElementById("convertedResult");
var clearConvert = document.getElementById("convertClear");
var clearRates = document.getElementById("rateClear");

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
    var resultList = document.createElement("ul");
    var rate = data.rates[currSymb]
    currentRatesSection.appendChild(resultList);
    resultList.style.color = "#e4ebee";
    resultList.style.fontSize = "18px"
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
    var convResult =document.createElement("ul");
    var result = data.result;
    convertedData.appendChild(convResult);
    convResult.style.color = "#e4ebee";
    convResult.style.fontSize = "18px"
    convResult.innerHTML = convertAmount + " " + convertFrom + " = " + convertTo + " " + result;
  
    var storedConvert = localStorage.getItem(convResult.innerHTML);
    if (storedConvert) {
      storedConvert = JSON.parse(convResult.innerHTML);
    } else {
      storedConvert =[];
    }
    
    localStorage.setItem('store', JSON.stringify(convResult.innerHTML));
  });
    
}

function formConvertSubmit(event) {
  event.preventDefault();

  var convertAmount = document.getElementById("convertAmount").value;
  var convertFrom = document.getElementById("convertFrom").value;
  var convertTo = document.getElementById("convertTo").value;

  searchApiConvert(convertAmount, convertFrom, convertTo);
}


// Clear button functions

function clearCurrentRates() {
  currentRatesSection.innerHTML = "";
}

function clearConvertResult() {
  convertedData.innerHTML = "";
}

// Form submisson eventListeners

submitForm.addEventListener("submit", formRateSubmit);
convertSubmit.addEventListener("submit", formConvertSubmit);

// Clear buttons

clearConvert.addEventListener("click", clearConvertResult)
clearRates.addEventListener("click", clearCurrentRates)



//Map API Function

function searchMapApi(latitude, longitude) {
  console.log(latitude,longitude)

  fetch("https://www.mapquestapi.com/search/v4/place?location="+ longitude +"%2C"+ latitude +"&category=sic%3A602101&sort=distance&feedback=false&key=zv2C2Yfo2khXbeaMsTionsrkGqV6Els8&pageSize=5")
  .then((response)=> response.json())
  .then((data) => {
    console.log(data)
  });
}

navigator.geolocation
navigator.geolocation.getCurrentPosition(console.log, console.error);

function success(data) {
var api_key = 'c8ca6ab069824bf79076a57e8ef4e905';
  var latitude = data.coords.latitude;
  var longitude = data.coords.longitude;

  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:

    if (request.status === 200){
      // Success!
      var data = JSON.parse(request.responseText);
    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request

searchMapApi(latitude, longitude);
}

navigator.geolocation.getCurrentPosition(success, console.error);


