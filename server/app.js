const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");

const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "konteineriai",
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/login", (req, res) => {
  const sessionId = uuidv4();

  const sql = `
        UPDATE users
        SET session = ?
        WHERE name = ? AND psw = ?
    `;

  con.query(
    sql,
    [sessionId, req.body.name, md5(req.body.psw)],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows) {
        res.cookie("containerCookie", sessionId);
        res.json({
          status: "ok",
          name: req.body.name,
        });
      } else {
        res.json({
          status: "error",
        });
      }
    }
  );
});

app.get("/login", (req, res) => {
  const sql = `
        SELECT name, role
        FROM users
        WHERE session = ?
    `;
  con.query(sql, [req.cookies.containerCookie || ""], (err, result) => {
    if (err) throw err;

    if (result.length) {
      res.json({
        status: "ok",
        name: result[0].name,
        role: result[0].role,
      });
    } else {
      res.json({
        status: "error",
      });
    }
  });
});

app.post("/logout", (req, res) => {
  res.cookie("containerCookie", "", { maxAge: -3600 });
  res.json({
    status: "logout",
  });
});

app.post("/boxes", (req, res) => {
  let fileName = null;

  if (req.body.file !== null) {
    let type = "unknown";
    let file;

    if (req.body.file.indexOf("data:image/png;base64,") === 0) {
      type = "png";
      file = Buffer.from(
        req.body.file.replace("data:image/png;base64,", ""),
        "base64"
      );
    } else if (req.body.file.indexOf("data:image/jpeg;base64,") === 0) {
      type = "jpg";
      file = Buffer.from(
        req.body.file.replace("data:image/jpeg;base64,", ""),
        "base64"
      );
    } else {
      file = Buffer.from(req.body.file, "base64");
    }

    fileName = uuidv4() + "." + type;

    fs.writeFileSync("./public/img/" + fileName, file);
  }

  const sql = `
        INSERT INTO box (name, weight, isPer, isFlame, photo)
        VALUES (?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.weight,
      req.body.isPer,
      req.body.isFlame,
      fileName,
    ],
    (err) => {
      if (err) throw err;
      res.json({});
    }
  );
});

app.get("/containers", (req, res) => {
  const sql = `
        SELECT id, name, weight, photo
        FROM box
        
        
    
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Bank is on port number: ${port}`);
});
