const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT || 4002
const linksRouter = require('./src/routes/links.route');

// setup express app
const app = express();
app.use(express.json());

// setup swagger
const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = YAML.load('./src/docs.yaml')
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// middlewares
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));

// routes
app.use('/api/links', linksRouter);

app.get('/', (req,res) =>{
    res.send('Express backend running')
})
app.get('/api', (req, res) => {
    res.send({message: `Welcome to &lt;LinkShortener&gt; API`});
});

// mongodb and express server connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('MongoDB is connected')
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
})

