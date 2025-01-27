const express = require('express');
const { model } = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const AuthRouter = require('./Routes/AuthRouter')
const ProductRouter = require('./Routes/ProductRouter')
require ('dotenv').config();
require ('./Model/db')

const PORT = process.env.PORT || 8080;


app.get ('/ping', (req,res)=>{
    res.send('pong')
})

app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})