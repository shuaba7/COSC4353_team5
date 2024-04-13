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
    
    expect(response.body).to.not.be.empty;
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

  it('GET /user-fuel-quote/:userId', async () => {
    const userId = 1;
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app).get(`/user-fuel-quote/${userId}`);

    expect(response.body.message).to.equal('GETuser-fuel-quote-success');
  });

  
  it('POST /user-fuel-quote/:userId', async () => {
    const userId = 1;
    const fuelData = { date: '2024-03-29', gallons: 100 };
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .post(`/user-fuel-quote/${userId}`)
      .send(fuelData);

      expect(response.body.message).to.equal('POSTuser-fuel-quote-success');
    });

    it('PUT /user-fuel-quote/:userId', async () => {
      const userId = 1;
      const newHistory = { userID: userId, gallonsRequested: 150, deliveryAddress: "123 Main St, Apt 101, Anytown, CA, 12345", deliveryDate: "2024-03-30", suggestedPricePerGallon: 3.60, totalAmountDue: 540.00 };
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .put(`/user-fuel-quote/${userId}`)
        .send(newHistory);
  
      expect(response.body.message).to.equal('Fuel history updated successfully');
    });

    it('POST /login', async () => {
      const userData = { username: 'TEST', password: 'pass222' };
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .post('/login')
        .send(userData);
      
      //expect(response.body.message).to.equal('Invalid username or password');
      expect(response.body.message).to.equal('Logged in successfully');
    });

    it('POST /register', async () => {
      const userData = { userId: '2', username: 'newUser', password: 'newPassword' };
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .post('/register')
        .send(userData);

        expect(response.body).to.not.be.empty;
    });

    it('GET /user-fuel-history/:userId', async () => {
      const userId = 1; // Assuming a valid user ID
      const chai = await import('chai');
      const expect = chai.expect;
    
      // Make the GET request to fetch user fuel history
      const response = await request(app).get(`/user-fuel-history/${userId}`);
  
    
      // Assert the response body
      expect(response.body).to.not.be.empty;
    });
  /*



*/
});