const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const deviceRoute=require('./routes/devices');
const loginRoute=require('./routes/login');
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://backendconcoxdeveloper:V3jUV7QXqEoAtnhy@cluster0-zhjde.mongodb.net/__CONCOX__", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
app.post('/login',loginRoute)
app.get('/devices',deviceRoute)
app.get('/devices/:device/:key?',deviceRoute)
app.listen(3000, () => {
});