const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const router=express.Router();
const bodyParser = require('body-parser');
const Devices = require('../models/devices');
const Status=require('../models/status');
const accessTokenSecret = 'youraccesstokensecret';
app.use(bodyParser.json());
var counter=1
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(403);
    }
  };
  router.get('/devices', authenticateJWT,(req,res,next)=>
{
    let items = Devices.find({}, function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});
router.get('/devices/:device/:key?', authenticateJWT,(req,res,next)=>
{
    var deviceNumber=req.params.device;
  var key = req.params.key;
  if (!key) {
        Status.find({device:deviceNumber}).sort({createdAt:-1}).skip((counter-1)*10).limit(10)
      .select()
      .exec()
      .then(docs=>{
        if(docs)
        {
             var latlong=[]
             docs.map(doc=>{
                 latlong.push(doc.gps)
             })
             if(isLocationHalted(latlong))
             {
                 res.status(200).json("Location seems to be halted. We are getting stale location from device")
             }
             else
             {
                 res.status(200).json(docs);
             }
         }
         else
         {
            res.status(404).json({message:"not a data with this id"});
         }
        counter=counter+1
    })
      .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
        });
    return;
  }
  else{
    Status.find({device:deviceNumber}).sort({createdAt:-1}).skip((key-1)*10).limit(10)
   .select()
   .exec()
   .then(docs=>{
       if(docs)
       {
            var latlong=[]
            docs.map(doc=>{
                latlong.push(doc.gps)
            })
            if(isLocationHalted(latlong))
            {
                res.status(200).json("Location seems to be halted. We are getting stale location from device")
            }
            else
            {
                res.status(200).json(docs);
            }
        }
        else
        {
           res.status(404).json({message:"not a data with this id"});
        }
   })
   .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
    });
  }
});
function isLocationHalted(latlong)
{
    var isHalted=true
    var dist;
    for(var i=0;i<latlong.length-1;i++)
    {
        dist=distance(latlong[i][0],latlong[i][1],latlong[i+1][0],latlong[i+1][1])
        if(dist>0.1)
        {
            isHalted=false
            return false
        }
    }
    return true;
}
function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344
		return dist;
	}
}
module.exports=router;