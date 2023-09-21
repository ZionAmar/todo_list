const express = require('express');
const router = express.Router();
module.exports = router;

router.get("/",(req, res) => {
    res.render("mainPage2",{pageTitle:"ערב טוב"});
});
router.post("/Add",(req, res) => {
    let {name,due_date,done_date,category_id,owner_id,creator_id}=req.body;
    let Query="INSERT INTO tasks";
        Query +="(name,due_date,done_date,category_id,owner_id,creator_id)";
        Query +="VALUES";
        Query +=`('${name}','${due_date}','${done_date}','${category_id}','${owner_id}','${creator_id}')`
    console.log("adding task",Query);
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
    let q = `SELECT * FROM \`tasks\``;
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
    let q = `DELETE FROM \`tasks\` WHERE id = '${id}'`;
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
    let due_date =req.body.due_date;
    let done_date =req.body.done_date;
    let category_id =req.body.category_id;
    let owner_id =req.body.owner_id;
    let creator_id =req.body.creator_id;
    let q=`UPDATE \`tasks\` SET \`name\` = '${name}',\`due_date\` = '${due_date}',\`done_date\` = '${done_date}',\`category_id\` = '${category_id}',\`owner_id\` = '${owner_id}',\`creator_id\` = '${creator_id}' WHERE id =${id}`;
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
