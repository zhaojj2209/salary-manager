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
  await db.users.bulkCreate(mockData);
});

describe('Users GET API', () => {
  it('should fail with missing params', (done) => {
    request(server)
      .get('/users')
      .query({ limit: 30 })
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"Missing query params\"');
        done();
      })
  })

  it('should fail with invalid params', (done) => {
    request(server)
      .get('/users')
      .query({
        minSalary: 0,
        maxSalary: '$1000',
        sortBy: 'id',
        sortOrder: 'ASC',
        limit: 30,
        offset: 0,
      })
      .expect(400)
      .then((res) => {
        expect(res.text).toBe('\"Invalid query params\"');
        done();
      })
  })

  it('should return correct entries with valid params', (done) => {
    const expected = [
      {
        id: "18",
        login: "kemsonh",
        name: "Kizzee Emson",
        salary: 334.35
      },
      {
        id: "3",
        login: "mchafney2",
        name: "Marlon Chafney",
        salary: 156.42
      },
    ]
    const limit = 30;
    const offset = 0;
    request(server)
      .get('/users')
      .query({
        minSalary: 0,
        maxSalary: 500,
        sortBy: 'name',
        sortOrder: 'ASC',
        limit,
        offset,
      })
      .expect(200)
      .then((res) => {
        const data = JSON.parse(res.text);
        expect(data.results[0].id).toBe(expected[0].id);
        expect(data.results[0].login).toBe(expected[0].login);
        expect(data.results[0].name).toBe(expected[0].name);
        expect(data.results[0].salary).toBe(expected[0].salary);
        expect(data.results[1].id).toBe(expected[1].id);
        expect(data.results[1].login).toBe(expected[1].login);
        expect(data.results[1].name).toBe(expected[1].name);
        expect(data.results[1].salary).toBe(expected[1].salary);
        expect(data.count).toBe(2);
        expect(data.limit).toBe(limit);
        expect(data.offset).toBe(offset);
        done();
      })
  })
})