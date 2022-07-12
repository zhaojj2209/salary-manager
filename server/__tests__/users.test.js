const request = require('supertest');
const server = require('../app.js');
const db = require('../models');
const mockData = require('./testdata/testdata.json');

// ugly hack to wait for db to sync before tests start
const delay = () => new Promise((resolve) => {
  setTimeout(() => resolve(), 3000);
});

beforeAll(async () => {
  await delay();
});

beforeEach(async () => {
  await db.users.sync({ force: true });
  await db.users.bulkCreate(mockData);
});

describe('Users API', () => {
  it('POST should fail with empty file', (done) => {
    request(server)
      .post('/users/upload')
      .attach('file', '__tests__/testdata/empty.csv')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"CSV file cannot be empty\"');
        done();
      })
  })

  it('POST should fail with extra columns', (done) => {
    request(server)
      .post('/users/upload')
      .attach('file', '__tests__/testdata/extraColumns.csv')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"CSV file has inconsistent number of columns\"');
        done();
      })
  })

  it('POST should fail with missing columns', (done) => {
    request(server)
      .post('/users/upload')
      .attach('file', '__tests__/testdata/missingColumns.csv')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"CSV file has inconsistent number of columns\"');
        done();
      })
  })

  it('POST should fail with duplicate ID', (done) => {
    request(server)
      .post('/users/upload')
      .attach('file', '__tests__/testdata/duplicateId.csv')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"Duplicate IDs are not allowed\"');
        done();
      })
  })

  it('POST should fail with duplicate login', (done) => {
    request(server)
      .post('/users/upload')
      .attach('file', '__tests__/testdata/duplicateLogin.csv')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"Duplicate logins are not allowed\"');
        done();
      })
  })

  it('POST should fail with invalid salary', (done) => {
    request(server)
      .post('/users/upload')
      .attach('file', '__tests__/testdata/invalidSalary.csv')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"Invalid salary formatting detected\"');
        done();
      })
  })

  it('POST should fail with negative salary', (done) => {
    request(server)
      .post('/users/upload')
      .attach('file', '__tests__/testdata/negativeSalary.csv')
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"Salary cannot be negative\"');
        done();
      })
  })

  it('should POST successfully with valid CSV', (done) => {
    request(server)
      .post('/users/upload')
      .attach('file', '__tests__/testdata/valid.csv')
      .expect(200)
      .then((res) => {
        expect(res.text).toBe('\"CSV file upload successful\"');
        done();
      })
  })
})