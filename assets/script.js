var myHeaders = new Headers();
myHeaders.append("apikey", "StIg02R52rnm6rdrlD001Zu112XqJBGH");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/currency_data/live?source=AUD&currencies=USD,EUR", requestOptions)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data) 
})