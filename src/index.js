const axios = require('axios');
const express = require('express')
const app = express()
const Socket = require('blockchain.info/Socket')
const mySocket = new Socket()

const endpoint = 'http://localhost:9200/transactions/transaction/';
let initialIndex = 0;

app.get('/', function (req, res) {
  axios.get(endpoint + '_search')
  .then(function (response) {
      res.send(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
})

const saveData = function(id, objJson) {
    axios.post(endpoint + id, objJson)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

mySocket.onTransaction(function (value) {
    saveData(initialIndex, value);
    initialIndex++;
});

setTimeout(() => {
    mySocket.close();
}, 10000);


//Launch listening server on port 8081
app.listen(8081, function () {
    console.log('app listening on port 8081!')
})
