const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const router=express.Router();
const bodyParser = require('body-parser');
const Devices = require('../models/devices');
const Status=require('../models/status')
const accessTokenSecret = 'youraccesstokensecret';
app.use(bodyParser.json());
const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'member'
    }
  ];
  router.post('/login',(req,res,next)=>
{
    const { username, password } = req.body;

  const user = users.find(u => { return u.username === username && u.password === password });
  if (user) {
      const accessToken = jwt.sign({ username: user.username}, accessTokenSecret,{
        expiresIn: '1h'
         });

      res.json({
          accessToken
      });
  } else {
      res.send('Username or password incorrect');
  }
});
module.exports=router;