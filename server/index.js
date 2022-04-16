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

app.get('/styles/:id', (req, res) => {
  let id = req.params.id;
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

app.post('/cart', (req, res) => {
  let options = {
    headers: {'Authorization': API_KEY}
  }
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart';
  axios.post(url, req.body, options)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log('Add to Cart ERROR:', err);
      res.sendStatus(500)
    })
})

app.get('/avgstars/:id', (req, res) => {
  const id = req.params.id;
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${id}`;
  let options = {
    headers: {'Authorization': API_KEY}
  }
  axios.get(url, options)
    .then((response) => {
      res.send(response.data)
    })
    .catch((err) => {
      console.log('GET Avg Stars ERROR:', err);
      res.sendStatus(500);
    })
})

app.get('/questions/:id', (req, res) => {
  const id = req.params.id;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${id}&count=100`,
    method: 'get',
    headers: {'Authorization': API_KEY}
  })
  .then(results => {
    res.json(results.data);
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

app.post('/questions', (req, res) => {
  const { body, name, email, product_id } = req.body;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions`,
    method: 'post',
    headers: {'Authorization': API_KEY},
    data: {
      body,
      name,
      email,
      product_id
    }
  })
  .then(() => {
    res.status(201).send('question created successfully');
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

app.put('/answers/:answer_id/helpful', (req, res) => {
  const answerId = req.params.answer_id;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/helpful`,
    method: 'put',
    headers: {'Authorization': API_KEY}
  })
  .then(() => {
    res.end();
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

app.put('/questions/:question_id/helpful', (req, res) => {
  const questionId = req.params.question_id;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/helpful`,
    method: 'put',
    headers: {'Authorization': API_KEY}
  })
  .then(() => {
    res.end();
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

app.put('/questions/:question_id/report', (req, res) => {
  const questionId = req.params.question_id;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/report`,
    method: 'put',
    headers: {'Authorization': API_KEY}
  })
  .then(() => {
    res.end();
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

app.put('/answers/:answer_id/report', (req, res) => {
  const answerId = req.params.answer_id;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`,
    method: 'put',
    headers: {'Authorization': API_KEY}
  })
  .then(() => {
    res.end();
  })
  .catch(err => {
    res.status(500).send(err);
  })
})

app.get('/products/:id', (req, res) => {
  let { id } = req.params;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`,
    headers: {'Authorization': API_KEY}
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in products/:id GET request');
    res.status(500).send(err);
  })
})


app.get('/products/:id/related', (req, res) => {
  let { id } = req.params;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`,
    headers: {'Authorization': API_KEY}
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in products/:id/related GET request');
    res.status(500).send(err);
  })
});

app.get('/reviews/:id', (req, res) => {
  let { id } = req.params;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${id}`,
    headers: {'Authorization': API_KEY}
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in reviews GET request');
    res.status(500).send(err);
  })
});

app.post('/newReview', (req, res) => {

  const testData = {
    product_id: 2, 
    rating: 3,
    summary: 'it was good',
    body: 'test, test, etst',
    recommend: true, 
    name: 'darian',
    email: 'dh0324@gmail.com',
    photos: ["", ""],
    characteristics: {"14": 1}
  }

  axios({
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`,
    headers: {'Authorization': API_KEY},
    data: testData
  })
  .then((response) => {
    console.log('success posting data');
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in reviews post request', err);
    res.status(500).send(err);
  })
});