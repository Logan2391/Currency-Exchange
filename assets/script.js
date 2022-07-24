var myHeaders = new Headers();
myHeaders.append("apikey", "0SLoI4nb45Yf4jdHudgiFS0IMLWXY3Uq");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

var submitForm = document.getElementById("rateForm");


function searchApi(currBase, currSymb) {

  fetch("https://api.apilayer.com/exchangerates_data/latest?symbols="+ currSymb +"&base=" + currBase, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

function formSubmit(event) {
  event.preventDefault();

  var currBase = document.getElementById("currencyBase").value;
  var currSymb = document.getElementById("currencySymbols").value; 

  searchApi(currBase, currSymb);
}

submitForm.addEventListener("submit", formSubmit)





 




