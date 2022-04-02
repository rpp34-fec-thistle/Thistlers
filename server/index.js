const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 8080;
const API_KEY = require('../config.js');

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

app.get('/styles', (req, res) => {
  let id = req.body.id;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`;
  let options = {
    headers: {'Authorization': API_KEY}
  }
  axios.get(url, options)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log('GET Styles ERROR:', err);
      res.sendStatus(500);
    })
});

