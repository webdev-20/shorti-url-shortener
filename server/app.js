const express = require('express');
require('dotenv').config();
const cors = require('cors');

const linksRouter = require('./src/routes/links.route');
const userRouter = require('./src/routes/user.route');

require('./src/config/passport');

// setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// setup swagger
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = YAML.load('./src/docs.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// middlewares

// routes
app.use('/api/links', linksRouter);
app.use('/api/users', userRouter);
if (process.env.NODE_ENV === 'test'){
  const testingRouter = require('./src/controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.get('/', (req, res) => {
  res.send('Express backend running');
});
app.get('/api', (req, res) => {
  res.send({ message: `Welcome to &lt;LinkShortener&gt; API` });
});

module.exports = app;