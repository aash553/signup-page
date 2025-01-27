const ensureAuthentication = require('../Middlewares/auth');


const router  = require('express').Router();

router.get('/',ensureAuthentication,(req,res)=>{
    res.status(200).json([
        {
        name:"iphone",
        price:1000
        },
        {
            name:"samsung",
            price:100
        }
    ])
});

module.exports= router