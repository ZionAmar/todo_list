const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require("path");
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine","ejs");
var db_M = require('./database');
global.db_pool = db_M.pool;
const port = 5454;
app.use(express.json());
app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port http://localhost:${port}`);
});
//הפניות בראוטר
const categories =require('./routes/cat_R');
app.use('/C',categories);
const tasks =require('./routes/task');
app.use('/T',tasks);
const users =require('./routes/users');
app.use('/U',users);
const color =require('./routes/color');
app.use('/COLOR',color);
const photo =require('./routes/photos');
app.use('/photo',photo);