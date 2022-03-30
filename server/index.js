const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})