var submitForm = document.getElementById("rateForm");
var currentRatesSection = document.getElementById("currentRates")

var myHeaders = new Headers();
myHeaders.append("apikey", "0SLoI4nb45Yf4jdHudgiFS0IMLWXY3Uq");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};


function searchApi(currBase, currSymb) {

  fetch("https://api.apilayer.com/exchangerates_data/latest?symbols="+ currSymb +"&base=" + currBase, requestOptions)
  .then((response) => response.json())
  .then((data)=> {
    console.log(data)
    var resultList = document.createElement("ul");
    var rate = data.rates[currSymb]
    currentRatesSection.appendChild(resultList);
    resultList.innerHTML = "1 "+ currBase + " = "+ currSymb + " " +rate;
  })
  

  
}

function formSubmit(event) {
  event.preventDefault();

  var currBase = document.getElementById("currencyBase").value;
  var currSymb = document.getElementById("currencySymbols").value; 

  searchApi(currBase, currSymb);
}



submitForm.addEventListener("submit", formSubmit)



 




