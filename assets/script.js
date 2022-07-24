var myHeaders = new Headers();
myHeaders.append("apikey", "0SLoI4nb45Yf4jdHudgiFS0IMLWXY3Uq");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=EUR&base=USD", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  



 




