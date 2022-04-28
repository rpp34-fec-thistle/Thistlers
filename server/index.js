const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression');
require('dotenv').config();

const app = express();

app.use(compression())
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 8080;
// const API_KEY = require('../config.js');
const API_KEY = process.env.API_KEY;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

// app.get('/:id', (req, res) => {
//   let id = req.params.id;



// })

app.post('/interactions', (req, res) => {
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions';
  let options = {
    headers: {'Authorization': API_KEY}
  }
  axios.post(url, req.body, options)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('POST: Interactions Error:', err);
      res.sendStatus(500);
    })
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

app.post('/questions/:question_id/answers', (req, res) => {
  const { body, name, email } = req.body;
  const question_id = req.params.question_id;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${question_id}/answers`,
    method: 'post',
    headers: {'Authorization': API_KEY},
    data: {
      body,
      name,
      email
    }
  })
  .then(() => {
    res.status(201).send('answer created successfully');
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

//Reviews
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

//get reviews
app.get('/reviews-meta/:id', (req, res) => {
  let {id} = req.params;
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${id}&sort=newest&count=1000`,
    headers: {'Authorization': API_KEY}
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in reviews GET request');
    res.status(500).send(err);
  });
});

app.post('/get-reviews', (req, res) => {
  const id = req.body.id;
  const sort = req.body.sort;

  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${id}&sort=${(sort || 'relevant')}&count=1000`,
    headers: {'Authorization': API_KEY}
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in reviews GET request');
    res.status(500).send(err);
  });
});

//create a new review
app.post('/newReview', (req, res) => {
  axios({
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`,
    headers: {'Authorization': API_KEY},
    data: req.body
  })
  .then((response) => {
    console.log('success posting data: ', response.data);
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in reviews post request', err);
    res.status(500).send(err);
  });
});

//makr a review helpful
app.get('/review-helpful/:id', (req, res) => {
  let {id} = req.params;

  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${id}/helpful`,
    headers: {'Authorization': API_KEY},
  })
  .then((response) => {
    console.log('success posting data');
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in reviews post request', err);
    res.status(500).send(err);
  });
});

//report a review
app.get('/review-report/:id', (req, res) => {
  let {id} = req.params;

  axios({
    method: 'put',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${id}/report`,
    headers: {'Authorization': API_KEY},
  })
  .then((response) => {
    console.log('success posting data');
    res.send(response.data);
  })
  .catch((err) => {
    console.log('error in reviews post request', err);
    res.status(500).send(err);
  });
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});