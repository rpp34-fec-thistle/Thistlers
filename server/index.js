const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression');
const cors = require('cors');
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
require('dotenv').config();
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const app = express();

app.use(cors())
app.use(compression())
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 8080;
const API_KEY = process.env.API_KEY;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload images only.', 400), false);
  }
};

AWS.config.update({region: 'us-west-1', contentType: 'image/jpeg'});

var uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'fec-answer-images-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, callback) => {
      callback(null, {fieldName: file.fieldname});
    },
    key: (req, file, callback) => {
      callback(null, Date.now().toString());
    }
  }),
  fileFilter: multerFilter
});

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

app.post('/add-answer', uploadS3.array('images'), (req, res) => {
  const { answer, nickname, email, questionId } = req.body;
  const photos = [];
  if (req.files) {
    req.files.forEach(file => {
      if (photos.length < 5) {
        photos.push(file.location);
      }
    })
  }

  const data = {
    body: answer,
    name: nickname,
    email,
    photos
  }

  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`,
    method: 'post',
    headers: {'Authorization': API_KEY},
    data: data
  })
  .then(() => {
    res.status(201).redirect('/');
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

var uploadS3Reviews = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'fec-review-images',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, callback) => {
      callback(null, {fieldName: file.fieldname});
    },
    key: (req, file, callback) => {
      callback(null, Date.now().toString());
    }
  }),
  fileFilter: multerFilter
});

//create a new review
app.post('/newReview', uploadS3Reviews.array('images'), (req, res) => {
  const photos = [];
  if (req.files) {
    req.files.forEach(file => {
      if (photos.length < 5) {
        photos.push(file.location);
      }
    });
  }

  let recommend = req.body.recommend? true : false;
  let {product_id, rating, username, email, summary, body} = req.body;
  let characteristics = {};
  for (let x in req.body) {
    if (!isNaN(parseInt(x))) {
      characteristics[parseInt(x)] = parseInt(req.body[x]);
    }
  }

  console.log({
    product_id: parseInt(product_id),
    rating: parseInt(rating),
    summary,
    body,
    recommend,
    name: username,
    email,
    photos,
    characteristics 
  });

  axios({
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`,
    headers: {'Authorization': API_KEY},
    data: {
      product_id: parseInt(product_id),
      rating: parseInt(rating),
      summary,
      body,
      recommend,
      name: username,
      email,
      photos,
      characteristics 
    }
  })
  .then(() => {
    res.redirect('/64620'); //get last url
  })
  .catch(err => {
    console.log('Err Saving Review', err);
    res.status(401).end(JSON.stringify(err));
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