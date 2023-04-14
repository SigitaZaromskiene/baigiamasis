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

app.listen(port, () => {
  console.log(`Bank is on port number: ${port}`);
});
