const express = require('express');
require('dotenv').config();
const cors = require('cors');

const linksRouter = require('./src/routes/links.route');
const userRouter = require('./src/routes/user.route');
const swaggerRouter = require('./src/routes/swagger.route')
require('./src/config/passport');
const swaggerUi = require("swagger-ui-express");

// setup express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// middlewares

// routes
app.use('/api/links', linksRouter);
app.use('/api/users', userRouter);
app.use('/api/docs', swaggerRouter)
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