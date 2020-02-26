const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Order=require('../models/order');
const product=require('../models/product')

router.get('/', (req,res,next)=>
{
    Order.find()
    .select('product quantity _id')
    .populate('product','name')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count: docs.length,
            orders:docs.map(doc=>{
                return{
                    _id:doc._id,
                    product:doc.product,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/orders/'+doc._id
                    }
                }
            })

        });
    })
    .catch(err=>{
        console.log(err);
        res.status().json({
            error:err
        })

    });
});

router.post('/', (req,res,next)=>
{
    product.findById(req.body.productId)
    .then(product=>{
        if(!product)
        {
            res.status(404).json({
                message:'Product not found'
            });
        }
        const orders=new Order({
            _id:mongoose.Types.ObjectId(),
           quantity:req.body.quantity,
           product:req.body.productId
        });
       return orders.save();

    })
    .then(result=>{
        res.status(201).json({
            message:'ORDER STORED',
            createdOrder:{
                _id:result._id,
                quantity:result.quantity,
                product:result.product
            },
            request:{
                type:'GET',
                url:'http://localhost:3000/orders/'+result._id
            }
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
   
});

router.get('/:orderId', (req,res,next)=>
{
    Order.findById(req.params.orderId)
    .populate('product','name price')
    .exec()
    .then(order=>{
        if(!order)
        {
            res.status(500).json({
                message:'order not found'
            })
        }
        res.status(200).json({
            order:order,
            request:{
                type:'GET',
                url:'http://localhost:3000/orders/'
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
});

router.delete('/:orderId', (req,res,next)=>
{
    id=req.params.orderId;
    Order.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:'order deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/orders/',
                body:{productId:'ID',quantity:'Number'}
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'no product id found',
            error:err
        })
    })
    
});

module.exports=router;