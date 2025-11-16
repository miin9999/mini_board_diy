const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL 연결
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // 설치 시 설정한 Root 계정
  password: '1106',      // Root 비밀번호
  database: 'mini_board'    // 미리 만들어둔 DB 이름
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL 연결 성공!');
});

// 글쓰기 API
app.post('/write', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.query(sql, [title, content], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true, id: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Node 서버 실행: http://localhost:${port}`);
});
