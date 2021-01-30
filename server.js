

const express = require("express");
const cors = require('cors')
const app = express()
// const bodyParser = require("body-parser")


//MIDDLEWARE
app.use(cors())


// app.use(bodyParser.urlencoded({ extended: true }));

//App Routes files

const houseRouter = require('./Routes/HouseListing/HLRoute')


//App route
app.use(houseRouter)


//server entry point
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server is runnning on port: ${PORT}`)
})


