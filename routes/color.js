const express = require('express');
const multer = require("multer");
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
    res.render("colorPage", {pageTitle: "color"});
});
router.post("/Add", (req, res) => {
    let {name, background_color, text_color} = req.body;
    let Query = "INSERT INTO color";
    Query += "(name,background_color,text_color)";
    Query += "VALUES";
    Query += `('${name}','${background_color}','${text_color}')`
    console.log("adding task", Query);
    db_pool.query(Query, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
            // throw err;
        } else {
            res.status(200).json({message: "OK", lastId: rows.insertId});
        }

    });


    // res.send("good morning");
});
router.get("/List", (req, res) => {
    let q = `SELECT * FROM \`color\``;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
            // throw err;
        } else {
            res.status(200).json({rows: rows});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }
    });
});
router.delete("/Delete/:id", (req, res) => {
    let id = req.params.id;
    // let id = req.body.id;
    let q = `DELETE FROM \`color\` WHERE id = '${id}'`;
    db_pool.query(q, function (err, rows, fields) {
        if (err) {
            res.status(500).json({message: err})
            // throw err;
        } else {
            res.status(200).json({message: `row'${id}'deleted!`});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }
    });
});
router.patch("/Update", (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let background_color = req.body.background_color;
    let text_color = req.body.text_color;
    let q = `UPDATE \`color\` SET \`name\` = '${name}',\`background_color\` = '${background_color}',\`text_color\` = '${text_color}' WHERE id =${id}`;
    db_pool.query(q, function (err, rows, fields) {

        if (err) {
            res.status(500).json({message: err})
            // throw err;
        } else {
            res.status(200).json({message: "OK"});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }

    });
});


