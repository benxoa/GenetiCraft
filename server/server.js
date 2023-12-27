const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: ".env"})
const port = process.env.PORT
require('./db/connection')
const path = require('path')




app.use(express.json({limit: '50mb'}));
app.use(cors({
    origin: [
      "https://www.geneticraft.fun",
      "https://geneticraft.fun",
      "www.geneticraft.fun",
      "geneticraft.fun",
    ],
    credentials: true
  }));
const router = require('./router/Router')
app.use("/api", router)




				
		


app.listen(port, ()=> {
    console.log(`The server listening at http://47.236.9.48:${port}`)
})
