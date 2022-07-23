var myHeaders = new Headers();
myHeaders.append("apikey", "StIg02R52rnm6rdrlD001Zu112XqJBGH");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

function getParams() {
  var paramsSource = document.getElementById("#search-form-source").textContent();
  var paramsCurrency = document.getElementById("#search-form-currency").textContent()

  searchApi(paramsSource, paramsCurrency);
}


function searchApi(paramsSource, paramsCurrency) {
  var currencyQueryUrl = "https://api.apilayer.com/currency_data/live?"
  
  if (paramsSource, paramsCurrency) {
    currencyQueryUrl = "https://api.apilayer.com/currency_data/live?source=" + paramsSource + "&currencies=" + paramsCurrency;
  }

fetch(currencyQueryUrl, requestOptions)
.then(function (response) {
  return response.json();
})
}

getParams();