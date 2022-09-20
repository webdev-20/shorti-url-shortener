const express = require('express');
const app = express();
const port = 4002;
const linksRouter = require('./routes/links.route')

app.use(express.json());
app.use('/api/links',linksRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
