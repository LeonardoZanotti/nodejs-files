const express = require('express');
const app = express();

app.use(express.json());

app.listen(process.env.SYSTEM_PORT, () => {
  console.log('Server running at port: ' + process.env.SYSTEM_PORT);
});

module.exports = app;
