const fs = require('fs');
const request = require('supertest');
const app = require('./index');

// hardcode database stuff
let originalData;
before(async () => {originalData = fs.readFileSync("database.json", "utf8"); });
after(async () => {fs.writeFileSync("database.json", originalData);});

describe('API Endpoints', () => {
  it('GET /user-information/:userId', async () => {
    const userId = 1;
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app).get(`/user-information/${userId}`);
    expect(response.status).to.equal(200);
    expect(response.body.userId).to.equal(userId);
  });

  it('GET /user-fuel-history/:userId', async () => {
    const userId = 1;
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app).get(`/user-fuel-history/${userId}`);
    expect(response.status).to.equal(200);
    expect(response.body.length).to.be.greaterThan(0);
  }); 

  it('GET /user-fuel-quote/:userId', async () => {
    const userId = 1;
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app).get(`/user-fuel-quote/${userId}`);
    expect(response.status).to.equal(200);
  });

  it('PUT /update-user-information/:userId', async () => {
    const userId = 1;
    const newData = { firstName: 'John', lastName: 'Doe', address1: '123 New St' };
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .put(`/update-user-information/${userId}`)
      .send(newData);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('User information updated successfully');
  });

  it('POST /user-fuel-quote/:userId', async () => {
    const userId = 1;
    const fuelData = { date: '2024-03-29', gallons: 100 };
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .post(`/user-fuel-quote/${userId}`)
      .send(fuelData);

    expect(response.status).to.equal(200);
  });

  it('POST /login', async () => {
    const userData = { username: 'tempUser123', password: 'TempPass456!' };
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .post('/login')
      .send(userData);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.message).to.equal('Logged in successfully');
  });

  it('POST /register', async () => {
    const userData = { username: 'newUser', password: 'newPassword' };
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .post('/register')
      .send(userData);

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.message).to.equal('Registered successfully');
  });

  it('PUT /user-fuel-quote/:userId', async () => {
    const userId = 1;
    const newHistory = { userID: userId, gallonsRequested: 150, deliveryAddress: "123 Main St, Apt 101, Anytown, CA, 12345", deliveryDate: "2024-03-30", suggestedPricePerGallon: 3.60, totalAmountDue: 540.00 };
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .put(`/user-fuel-quote/${userId}`)
      .send(newHistory);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Fuel history updated successfully');
  });


});