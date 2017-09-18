'use strict';

// const faker = require('faker');
const mocks = require('../lib/mocks');
// const User = require('../../model/user');
const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');

describe('Testing basic auth routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(mocks.user.removeAll);


  describe('POST to /api/signUp', function() {
    beforeAll(() => {
      this.mockUserData = {
        name: 'Madeline',
        username: 'MaddyRocks101',
        password: 'ILoveCodez',
        email: 'test@test.com',
        subscribedToEmail: true,
        isAdmin: true,
      };

      return superagent.post(':4444/api/signUp')
        .send(this.mockUserData)
        .then(res => this.res = res)
        .catch(console.error);
    });

    test('should respond with a token on successful signUp', () => {
      expect(this.res.body.username).toEqual('MaddyRocks101');
      expect(this.res.body._id.length > 1).toBeTruthy();
    });
    test('should return a status of 201', () => {
      expect(this.res.status).toBe(201);
    });
  });

  describe('GET to /api/signIn', function() {
    beforeAll(() => {
      return mocks.user.createOne()
        .then(userData => {
          this.tempUser = userData.user;

          return superagent.get(':4444/api/signin')
            .auth(userData.user.username, userData.password)
            .then(res => this.res = res);
        });
    });

    test('should return a token', () => {
      expect(this.res.text).toBeTruthy();
      expect(this.res.text.length > 1).toBeTruthy();
    });

    test('should return a status of 200', () => {
      expect(this.res.status).toBe(200);
    });
  });
});