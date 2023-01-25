/* eslint-disable no-undef */

'use strict';

const request = require('supertest');
const app = require('./app');

describe('Test the company/applicant service', () => {
  //
  // Test get /
  //

  test('GET / succeeds', () => {
    return request(app).get('/').expect(200);
  });

  //
  // Test get /company/nameAndID
  //

  test('GET /company/nameAndID succeeds', () => {
    return request(app).get('/company/nameAndID').expect(200);
  });

  test('GET /company/nameAndID returns JSON object', () => {
    return request(app)
      .get('/company/nameAndID')
      .expect('Content-type', /json/);
  });

  test('GET /company/nameAndID includes name of companies', () => {
    return request(app)
      .get('/company/nameAndID')
      .expect(/companyName/);
  });

  test('GET /company/nameAndID includes ids of companies', () => {
    return request(app).get('/company/nameAndID').expect(/id/);
  });

  test('GET /company/nameAndID includes name of specific company in the DB', () => {
    return request(app)
      .get('/company/nameAndID')
      .expect(/Bob's pizzaria/);
  });

  //
  // Test get /company/:companyID
  //

  test('GET /company/:companyID succeeds', () => {
    return request(app).get('/company/someRandomID123').expect(200);
  });

  test('GET /company/:companyID returns JSON object in valid input', () => {
    return request(app)
      .get('/company/a8349e11-b94c-49d2-8dcd-7565f0b185b1')
      .expect('Content-type', /json/);
  });

  test('GET /company/:companyID includes company type', () => {
    return request(app)
      .get('/company/a8349e11-b94c-49d2-8dcd-7565f0b185b1')
      .expect(/type/);
  });

  test('GET /company/:companyID includes company applicant list', () => {
    return request(app)
      .get('/company/a8349e11-b94c-49d2-8dcd-7565f0b185b1')
      .expect(/applicants/);
  });

  //
  // Test get /company/:companyID/applicantNameAndID
  //

  test('GET /company/:companyID/applicantNameAndID succeeds', () => {
    return request(app)
      .get('/company/someRandomID123/applicantNameAndID')
      .expect(200);
  });

  test('GET /company/:companyID/applicantNameAndID returns JSON object in valid input', () => {
    return request(app)
      .get('/company/a8349e11-b94c-49d2-8dcd-7565f0b185b1/applicantNameAndID')
      .expect('Content-type', /json/);
  });

  test('GET /company/:companyID/applicantNameAndID of company with no applicants returns {}', () => {
    return request(app)
      .get('/company/a8349e11-b94c-49d2-8dcd-7565f0b185b1/applicantNameAndID')
      .expect([]);
  });

  test('GET /company/:companyID/applicantNameAndID of company with applicants includes applicantName', () => {
    return request(app)
      .get('/company/1a6577d6-f1a8-4a6d-8e1c-b255010c74f3/applicantNameAndID')
      .expect(/applicantName/);
  });

  test('GET /company/:companyID/applicantNameAndID of company with applicants includes applicant id', () => {
    return request(app)
      .get('/company/1a6577d6-f1a8-4a6d-8e1c-b255010c74f3/applicantNameAndID')
      .expect(/id/);
  });

  //
  // Test get /company/:companyID/:applicantID
  //

  test('GET /company/:companyID/:applicantID works if company id given', () => {
    return request(app)
      .get('/company/1a6577d6-f1a8-4a6d-8e1c-b255010c74f3/someRandomID123')
      .expect(200);
  });

  test('GET /company/:companyID/:applicantID fails with random ids', () => {
    return request(app)
      .get('/company/someRandomID123/someRandomID123')
      .expect(500);
  });

  test('GET /company/:companyID/:applicantID works with only applicant id', () => {
    return request(app)
      .get('/company/someRandomID123/61ba597f-45b4-400b-8d50-050efc0f4f01')
      .expect(500);
  });

  test('GET /company/:companyID/:applicantID returns JSON object in valid input', () => {
    return request(app)
      .get(
        '/company/1a6577d6-f1a8-4a6d-8e1c-b255010c74f3/61ba597f-45b4-400b-8d50-050efc0f4f01'
      )
      .expect('Content-type', /json/);
  });

  test('GET /company/:companyID/:applicantID of valid applicant contains job', () => {
    return request(app)
      .get(
        '/company/1a6577d6-f1a8-4a6d-8e1c-b255010c74f3/61ba597f-45b4-400b-8d50-050efc0f4f01'
      )
      .expect(/job/);
  });

  test('GET /company/:companyID/:applicantID of valid applicant contains uni', () => {
    return request(app)
      .get(
        '/company/1a6577d6-f1a8-4a6d-8e1c-b255010c74f3/61ba597f-45b4-400b-8d50-050efc0f4f01'
      )
      .expect(/uni/);
  });

  //
  // Test get /company/new
  //

  test('POST /company/new succeeds', () => {
    const params = {
      name: 'Testing',
      type: 'Ltd',
      emailAddress: 'testing@tests.ts',
      countryOfOrigin: 'Testain',
      contactNumber: '7357-7357-7357',
      description: 'Testing Ltd is a company that tests things by jesting it',
      lookingFor:
        'We are looking for skilled tests and testers, as well as passed tests'
    };
    return request(app).post('/company/new').send(params).expect(200);
  });

  //
  // Test get /company/new
  //

  test('POST /company/apply/:companyID fails if not given a proper companyID', () => {
    const params = {
      firstName: 'Test',
      lastName: 'Passed',
      emailAddress: 'please@passtest.plz',
      countryOfOrigin: 'VScode console',
      phoneNumber: '1234567890',
      uni0: 'Testham',
      degree0: 'Tesing',
      gradeEdu0: 'Pass++',
      job0: 'Tester',
      company0: 'Test inc.',
      durationJob0: '0.05s',
      skill0: 'Test coverage'
    };
    return request(app)
      .post('/company/apply/someRandomID123')
      .send(params)
      .expect(500);
  });

  test('POST /company/apply/:companyID succeeds', () => {
    const params = {
      firstName: 'Test',
      lastName: 'Passed',
      emailAddress: 'please@passtest.plz',
      countryOfOrigin: 'VScode console',
      phoneNumber: '1234567890',
      uni0: 'Testham',
      degree0: 'Tesing',
      gradeEdu0: 'Pass++',
      job0: 'Tester',
      company0: 'Test inc.',
      durationJob0: '0.05s',
      skill0: 'Test coverage'
    };
    return request(app)
      .post('/company/apply/1a6577d6-f1a8-4a6d-8e1c-b255010c74f3')
      .send(params)
      .expect(200);
  });
});
