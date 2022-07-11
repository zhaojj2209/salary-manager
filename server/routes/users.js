const fs = require('fs');
const os = require('os');
const express = require('express');
const parse = require('csv-parse').parse;
const multer  = require('multer');
const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const data = fs.readFileSync(file.path);

  parse(data, { comment: "#" }, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(400).json('Error parsing csv file');
    }

    return res.json({ data });
  });
});

module.exports = router;
