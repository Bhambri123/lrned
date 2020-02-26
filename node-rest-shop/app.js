const express=require('express');

const app=express();

const morgan=require('morgan');

const bodyParser=require('body-parser');

const mongoose=require('mongoose');
// creating routers for different url's
const productRoutes=require('./api/routes/products');

const orderRoutes=require('./api/routes/orders');

mongoose.connect('mongodb+srv://gautam_bhambri:'
+process.env.pwd+
'@node-rest-shop-rxfcy.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
);

// to use log information of requests in terminal
app.use(morgan('dev'));
// CORS allows some headers and origins
/*
app.use((req,res,next)=>{
    res.header('Acess-Control-Allow-Origin','*');
    res.header('Acess-Control-Allow-Headers','*');
    if(req.method==='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
});*/

// parsing the body of incoming requests
app.use(bodyParser.urlencoded({extended:false}));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.json());
// route for product url
app.use('/products',productRoutes);
// route for order url
app.use('/orders',orderRoutes);
// to create our own error
app.use((req,res,next)=>
{
    const error=new Error('Not found');
    error.status= 404;
    next(error);
})

app.use((error,req,res,next)=>
{
    res.status(error.status || 500)
    res.json({
        error:{
        message:error.message
        }
    });
});

module.exports=app;
