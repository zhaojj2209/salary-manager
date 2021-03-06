const fs = require('fs');
const os = require('os');
const { Op } = require('sequelize');
const express = require('express');
const queue = require('express-queue');
const parse = require('csv-parse').parse;
const multer  = require('multer');
const upload = multer({ dest: os.tmpdir() });
const router = express.Router();

const db = require('../models');

// GET API error messages
const MISSING_PARAMS_ERROR = 'Missing query params';
const INVALID_PARAMS_ERROR = 'Invalid query params';

// POST API error messages
const PARSE_ERROR = 'Error parsing CSV file';
const EMPTY_ERROR = 'CSV file cannot be empty';
const INCONSISTENT_COLUMNS_ERROR = 'CSV file has inconsistent number of columns';
const DUPLICATE_ID_ERROR = 'Duplicate IDs are not allowed';
const DUPLICATE_LOGIN_ERROR = 'Duplicate logins are not allowed';
const SALARY_FORMAT_ERROR = 'Invalid salary formatting detected';
const SALARY_NEGATIVE_ERROR = 'Salary cannot be negative';

const sortKeys = ['id', 'login', 'name', 'salary'];
const sortOrderOptions = ['ASC', 'DESC'];

const isInvalidFloat = (value) => {
  const val = parseFloat(value);
  return isNaN(val) || val < 0;
}

const isInvalidInt = (value) => {
  const val = parseInt(value);
  return isNaN(val) || val < 0;
}

router.get('/', async (req, res) => {
  const minSalary = req.query.minSalary;
  const maxSalary = req.query.maxSalary;
  const offset = req.query.offset;
  const limit = req.query.limit;
  const sortBy = req.query.sortBy;
  const sortOrder = req.query.sortOrder;

  if (!minSalary || !maxSalary || !offset || !limit || !sortBy || !sortOrder) {
    return res.status(400).json(MISSING_PARAMS_ERROR);
  }
  if (isInvalidFloat(minSalary) || isInvalidFloat(maxSalary) || isInvalidInt(offset) || (parseInt(limit) !== 30)) {
    return res.status(400).json(INVALID_PARAMS_ERROR);
  }
  if (!sortKeys.includes(sortBy) || !sortOrderOptions.includes(sortOrder)) {
    return res.status(400).json(INVALID_PARAMS_ERROR);
  }

  const queryOptions = {
    where: {
      salary: {
        [Op.gte]: minSalary,
        [Op.lte]: maxSalary,
      }
    },
    order: [[sortBy, sortOrder]],
    limit,
    offset,
  }
  const { count, rows } = await db.users.findAndCountAll(queryOptions);
  res.json({ 
    results: rows, 
    count,
    limit: parseInt(limit),
    offset: parseInt(offset),
  });
})

router.post('/upload', queue({ activeLimit: 1, queuedLimit: -1 }), upload.single('file'), (req, res) => {
  const file = req.file;
  const csv = fs.readFileSync(file.path);

  parse(csv, { comment: '#', from_line: 2 }, async (err, data) => {
    if (err) {
      console.error(err);
      if (err.code === 'CSV_RECORD_INCONSISTENT_FIELDS_LENGTH') {
        return res.status(400).json(INCONSISTENT_COLUMNS_ERROR);
      }
      return res.status(400).json(PARSE_ERROR);
    }
    if (data.length === 0) {
      return res.status(400).json(EMPTY_ERROR);
    }
  
    const t = await db.sequelize.transaction();
    const ids = new Map();
    try {
      for (let i = 0; i < data.length; i++) {
        const row = data[i];

        const id = row[0];
        if (ids.has(row[0])) {
          throw new Error(DUPLICATE_ID_ERROR);
        }

        const salary = parseFloat(row[3]);
        if (isNaN(salary)) {
          throw new Error(SALARY_FORMAT_ERROR);
        }

        ids.set(id, 1);
        const rowData = {
          id: row[0],
          login: row[1],
          name: row[2],
          salary,
        };
        await db.users.upsert(rowData, { transaction: t });
      }
      await t.commit();
      res.json('CSV file upload successful');
    } catch (err) {
      await t.rollback();
      console.error(err);
      let message = PARSE_ERROR;
      if (err.message === DUPLICATE_ID_ERROR || err.message === SALARY_FORMAT_ERROR) {
        message = err.message;
      } else if (err.name === 'SequelizeUniqueConstraintError') {
        message = DUPLICATE_LOGIN_ERROR;
      } else if (err.name === 'SequelizeValidationError') {
        message = SALARY_NEGATIVE_ERROR;
      }
      return res.status(400).json(message);
    }
  });
});

module.exports = router;
