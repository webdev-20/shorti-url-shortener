const express = require('express');
const http = require('http')
const mongoose = require('mongoose');
require('dotenv').config();
const {PORT} = require('./src/config');

const linksRouter = require('./src/routes/links.route');

// setup express app
const app = express();
app.use(express.json());

// setup swagger
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = YAML.load('./src/docs.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// middlewares

// routes
app.use('/api/links', linksRouter);

app.get('/', (req, res) => {
  res.send('Express backend running');
});
app.get('/api', (req, res) => {
  res.send({ message: `Welcome to &lt;LinkShortener&gt; API` });
});

// mongodb and express server connection
const server = http.createServer(app);

(async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB.')
  }catch (err){
    console.log('Failed to connect to MongoDB. ', err)
  }
})()

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});




module.exports = server