var convertSubmit = document.getElementById("convertForm");
var convertedData = document.getElementById("convertedResult");
var clearConvert = document.getElementById("convertClear");
<<<<<<< HEAD

=======
var clearRates = document.getElementById("rateClear");
var mapDataSection = document.getElementById("mapSection");
>>>>>>> c94d0bede1e9eaf0ef93bb8b7978e7bdda15154f

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
    var convResult =document.createElement("ul");
    var result = data.result;
    convertedData.appendChild(convResult);
    convResult.style.color = "#e4ebee";
    convResult.style.fontSize = "18px"
    convResult.innerHTML = convertAmount + " " + convertFrom + " = " + convertTo + " " + result;
  });
    
}

function formConvertSubmit(event) {
  event.preventDefault();

  var convertAmount = document.getElementById("convertAmount").value;
  var convertFrom = document.getElementById("convertFrom").value;
  var convertTo = document.getElementById("convertTo").value;

  searchApiConvert(convertAmount, convertFrom, convertTo);
}


// Clear button function

function clearConvertResult() {
  convertedData.innerHTML = "";
}

// Form submisson eventListener

convertSubmit.addEventListener("submit", formConvertSubmit);

// Clear buttons

clearConvert.addEventListener("click", clearConvertResult)

//Map API Functions

function searchMapApi(latitude, longitude) {
  console.log(latitude,longitude)

  fetch("https://www.mapquestapi.com/search/v4/place?location="+ longitude +"%2C"+ latitude +"&category=sic%3A602101&sort=distance&feedback=false&key=zv2C2Yfo2khXbeaMsTionsrkGqV6Els8&pageSize=5")
  .then((response)=> response.json())
  .then((data) => {
    console.log(data)
    console.log(data.results[0].name)
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
