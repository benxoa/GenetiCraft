const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aq23416:Aqwert54321@cluster0.bvv41go.mongodb.net/MERN-APP?retryWrites=true&w=majority")
.then(()=> console.log("MongoDb Connected"))
.catch(()=> console.log("MongoDb Failed!"))