const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const createSocketIoConnection = require('./socketIo/socket');

//database connection
const dbConnection = require('./database/connection');
dbConnection();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const router = require('./routes/index');

app.use(router);

const PORT = process.env.PORT || 4000


const server = app.listen(PORT || 4000 ,()=>{

    console.log("listning at port 4000");
})

//socketIo connection
createSocketIoConnection(server);