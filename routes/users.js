const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/",(req, res) => {
    res.render("mainPage3",{pageTitle:"users"});
});
router.post("/Add",(req, res) => {
    let {name,username,password}=req.body;
    let Query="INSERT INTO users";
    Query +="(name,username,password)";
    Query +="VALUES";
    Query +=`('${name}','${username}','${password}')`
    console.log("adding users",Query);
    db_pool.query(Query, function(err, rows, fields){

        if(err)
        {
            res.status(500).json({message: err})
            // throw err;
        }
        else
        {
            res.status(200).json({message: "OK",lastId:rows.insertId});
        }

    });


    // res.send("good morning");
});
router.get("/List",(req,res)=>{
    let q = `SELECT * FROM \`users\``;
    db_pool.query(q, function(err, rows, fields) {
        if(err)
        {
            res.status(500).json({message: err})
            // throw err;
        }
        else
        {
            res.status(200).json({rows:rows });
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }
    });
});
router.delete("/Delete/:id",(req,res)=>{
    let id = req.params.id;
    // let id = req.body.id;
    let q = `DELETE FROM \`users\` WHERE id = '${id}'`;
    db_pool.query(q, function(err, rows, fields) {
        if(err)
        {
            res.status(500).json({message: err})
            // throw err;
        }
        else
        {
            res.status(200).json({message: `row'${id}'deleted!`});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }
    });
});
router.patch("/Update",(req, res) => {
    let id =req.body.id;
    let name =req.body.name;
    let username =req.body.username;
    let password =req.body.password;
    let q=`UPDATE \`users\` SET \`name\`= '${name}',\`username\`='${username}',\`password\`='${password}' WHERE id =${id}`;
    db_pool.query(q, function(err, rows, fields){

        if(err)
        {
            res.status(500).json({message: err})
            // throw err;
        }
        else
        {
            res.status(200).json({message: "OK"});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }

    });


    // res.send("good morning");
});
