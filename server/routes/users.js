const fs = require('fs');
const os = require('os');
const express = require('express');
const parse = require('csv-parse').parse;
const multer  = require('multer');
const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

const db = require('../models');

router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const csv = fs.readFileSync(file.path);

  parse(csv, { comment: "#", from_line: 2 }, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(400).json('Error parsing csv file');
    }
  
    const t = await db.sequelize.transaction();
    try {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowData = {
          id: row[0],
          login: row[1],
          name: row[2],
          salary: parseFloat(row[3]),
        };
        await db.users.upsert(rowData);
      }
      await t.commit();
      res.json('Csv upload successful');
    } catch (err) {
      t.rollback();
      console.error(err);
      return res.status(400).json('Error parsing csv file');
    }
  });
});

module.exports = router;
