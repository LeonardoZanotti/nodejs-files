const express = require('express');
const app = express();
const router = require('./routes/router');
require('./database');

app.use(express.json());
app.use(router);

app.listen(process.env.SYSTEM_PORT, () => {
  console.log('Server running at port: ' + process.env.SYSTEM_PORT);
});

module.exports = app;
