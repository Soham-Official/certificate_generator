"use strict";
const express = require("express");
const app = express();
const fs = require("fs");
const PDFDocument = require("pdfkit");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
var randomstring = require("randomstring");
app.use(bodyParser.json());
app.use(cors());

var csvdb = require("node-csv-query").default;
var databaseConnection = null;

let name;
let token;
app.get("/", (req, res) => {
  return res.send("Hello");
});

app.get(`/download/:token`, (req, res) => {
  if (token == req.params.token) {
    res.download(`${name}.pdf`);
  } else {
    res.json({
      err: "You are not eligible for this certificate . If you think there is a mistake, contact the admins.",
    });
  }
});

app.post("/get_certificate", (req, res) => {
  token = randomstring.generate(10);
  name = req.body.name;
  csvdb(__dirname + "/dataset.csv").then(function (db) {
    databaseConnection = db;
    databaseConnection
      .findOne({
        Username: name,
      })
      .then(function (record) {
        if (name === undefined)
          return res.json({
            err: "You are not eligible for this certificate . If you think there is a mistake, contact the admins.",
          });
        name = record.FullName;
        name = name.trim();
        name = name.toLowerCase();
        var splitStr = name.split(" ");
        for (var i = 0; i < splitStr.length; i++) {
          splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }

        name = splitStr.join(" ");

        console.log(name);
        const doc = new PDFDocument({
          layout: "landscape",
          size: "A4",
        });
        doc.pipe(fs.createWriteStream(`${name}.pdf`));
        doc.image("certificate_november.jpeg", 0, 0, { width: 850 });
        doc.font("fonts/RockoUltraFLF.ttf");
        if (name.length > 14) {
          doc.fontSize(30).fillColor("white").text(name, 300, 220, {
            align: "center",
          });
        } else {
          doc.fontSize(50).fillColor("white").text(name, 300, 220, {
            align: "center",
          });
        }
        doc.end();
        return res.json({
          name,
          token,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({
          err: "You are not eligible for this certificate . If you think there is a mistake, contact the admins.",
        });
      });
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
