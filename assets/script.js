var convertSubmit = document.getElementById("convertForm");
var convertedData = document.getElementById("convertedResult");
var clearConvert = document.getElementById("convertClear");
var amountError = document.getElementById('error');
var allconversionResults = [];

var dataName1 = document.getElementById("dataName1");
var dataName2 = document.getElementById("dataName2");
var dataName3 = document.getElementById("dataName3");
var dataName4 = document.getElementById("dataName4");
var dataName5 = document.getElementById("dataName5");
var dataName6 = document.getElementById("dataName6");

var dataAddress1 = document.getElementById("dataAddress1");
var dataAddress2 = document.getElementById("dataAddress2");
var dataAddress3 = document.getElementById("dataAddress3");
var dataAddress4 = document.getElementById("dataAddress4");
var dataAddress5 = document.getElementById("dataAddress5");
var dataAddress6 = document.getElementById("dataAddress6");

var myHeaders = new Headers();
myHeaders.append("apikey", "0SLoI4nb45Yf4jdHudgiFS0IMLWXY3Uq");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

// Handles all convert operations 

function searchApiConvert(convertAmount, convertFrom, convertTo) {
  fetch("https://api.apilayer.com/exchangerates_data/convert?to="+ convertTo +"&from="+ convertFrom +"&amount="+ convertAmount, requestOptions)
  .then((response)=> response.json())
  .then((data) => {
    if (convertAmount === "") {
      amountError.classList.add('error');
      amountError.innerHTML = "Please enter a valid amount.";
    } else {
      var convResult =document.createElement("ul");
      var result = data.result;
      amountError.innerHTML = "";
      amountError.classList.remove('error');
      convertedData.appendChild(convResult);
      convResult.style.color = "#e4ebee";
      convResult.style.fontSize = "18px";
      convResult.innerHTML = convertAmount + " " + convertFrom + " = " + convertTo + " " + result;
      
  
      allconversionResults.push(convResult.innerHTML);
      localStorage.setItem("key", JSON.stringify(allconversionResults));
    }
  });
}

// pull selected values for the search API function to use as parameters

function formConvertSubmit(event) {
  event.preventDefault();

  var convertAmount = document.getElementById("convertAmount").value;
  var convertFrom = document.getElementById("convertFrom").value;
  var convertTo = document.getElementById("convertTo").value;

  searchApiConvert(convertAmount, convertFrom, convertTo);
}

// LocalStorage functions

function getLocal() {
  var getLocalResults = localStorage.getItem("key");
  var presentResults = JSON.parse(getLocalResults);

  for (var i = 0; i < presentResults.length; i++) {
    var convResult =document.createElement("ul");
    convResult.innerHTML = presentResults[i];
    convResult.style.color = "#e4ebee";
    convResult.style.fontSize = "18px"
    convertedData.appendChild(convResult);
  }
}


// Clear button function

function clearConvertResult() {
  convertedData.innerHTML = "";
  localStorage.clear();
}

// Form submisson eventListener

convertSubmit.addEventListener("submit", formConvertSubmit);

// Clear button click event

clearConvert.addEventListener("click", clearConvertResult)

//Map API Functions

function searchMapApi(latitude, longitude) {

  fetch("https://www.mapquestapi.com/search/v4/place?location="+ longitude +"%2C"+ latitude +"&category=sic%3A602101&sort=distance&feedback=false&key=zv2C2Yfo2khXbeaMsTionsrkGqV6Els8&pageSize=6")
  .then((response)=> response.json())
  .then((data) => {
    
    var resultName1 = data.results[0].name;
    var resultName2 = data.results[1].name;
    var resultName3 = data.results[2].name;
    var resultName4 = data.results[3].name;
    var resultName5 = data.results[4].name;
    var resultName6 = data.results[5].name;

    var resultAddress1 = data.results[0].displayString;
    var resultAddress2 = data.results[1].displayString;
    var resultAddress3 = data.results[2].displayString;
    var resultAddress4 = data.results[3].displayString;
    var resultAddress5 = data.results[4].displayString;
    var resultAddress6 = data.results[5].displayString;

    dataName1.innerHTML = resultName1;
    dataName2.innerHTML = resultName2;
    dataName3.innerHTML = resultName3;
    dataName4.innerHTML = resultName4;
    dataName5.innerHTML = resultName5;
    dataName6.innerHTML = resultName6;
    
    dataAddress1.innerHTML = resultAddress1;
    dataAddress2.innerHTML = resultAddress2;
    dataAddress3.innerHTML = resultAddress3;
    dataAddress4.innerHTML = resultAddress4;
    dataAddress5.innerHTML = resultAddress5;
    dataAddress6.innerHTML = resultAddress6;
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

// Calls LocalStorage Function 
getLocal();
