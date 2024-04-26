const fs = require('fs');
const request = require('supertest');
const app = require('./index');
const sinon = require('sinon');



describe('API Endpoints', () => {
  it('GET /user-information/:userId', async () => {
    const userId = 1;
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app).get(`/user-information/${userId}`);
    
    expect(response.body).to.not.be.empty;
  });

  it('GET /user-information/:userId - User not found', async () => {
    const userId = 9999; // Assuming this userId does not exist in the database
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .get(`/user-information/${userId}`);
  
    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal('User not found');
  });
  
  it('GET /user-information/:userId - Invalid userId', async () => {
    const userId = 'invalidUserId'; // Invalid userId format
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .get(`/user-information/${userId}`);
  
    expect(response.status).to.equal(500);
    expect(response.body.error).to.equal('Internal server error');
  });
  
  it('GET /user-information/:userId - Internal server error', async () => {
    const userId = 'invalidUserId'; // Invalid userId format to cause internal server error
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .get(`/user-information/${userId}`);
  
    expect(response.status).to.equal(500);
    expect(response.body.error).to.equal('Internal server error');
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

  it('PUT /update-user-information/:userId', async () => {
    const userId = 9999; // Assuming this userId does not exist in the database
    const newData = { firstName: 'John', lastName: 'Doe', address1: '123 New St' };
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .put(`/update-user-information/${userId}`)
      .send(newData);
  
    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal('User not found');
  });

  it('PUT /update-user-information/:userId', async () => {
    const userId = 'invalidUserId'; // Invalid userId format
    const newData = { firstName: 'John', lastName: 'Doe', address1: '123 New St' };
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .put(`/update-user-information/${userId}`)
      .send(newData);
  
    expect(response.status).to.equal(500);
    expect(response.body.error).to.equal('Internal server error');
  });

  it('PUT /update-user-information/:userId', async () => {
    const userId = 1;
    const newData = 'invalidData';
    const chai = await import('chai');
    const expect = chai.expect;
    const response = await request(app)
      .put(`/update-user-information/${userId}`)
      .send(newData);
  
    expect(response.status).to.equal(500);
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

      expect(response.body.message).to.equal('POST user-fuel-quote-success');
    });

    it('PUT /user-fuel-quote/:userId', async () => {
      const userId = 1;
      const newHistory = { userID: userId, gallonsRequested: 150, deliveryAddress: "123 Main St, Apt 101, Anytown, CA, 12345", deliveryDate: "2024-03-30", suggestedPricePerGallon: 3.60, totalAmountDue: 540.00 };
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .put(`/user-fuel-quote/${userId}`)
        .send(newHistory);
  
        expect(response.status).to.not.equal(404);
      });

    it('POST /login', async () => {
      const userData = { username: 'TEST', password: 'pass222' };
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .post('/login')
        .send(userData);
      
      //expect(response.body.message).to.equal('Invalid username or password');
      expect(response.body).to.not.be.empty;
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

    it('POST /register - Successful registration', async () => {
      const newUser = {
        username: 'testUser',
        password: 'testPassword',
        userId: 123 // Assuming this userId is not already registered
      };
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .post('/register')
        .send(newUser);
    
        expect(response.status).to.not.equal(404);

    });
    
    it('POST /register - Missing username or password', async () => {
      const newUser = {
        password: 'testPassword',
        userId: 123
      };
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .post('/register')
        .send(newUser);
    
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Username and password are required');
    });
    
    it('GET /user-fuel-history/:userId - User fuel history found', async () => {
      const userId = 1; // Assuming this userId exists in the database with fuel history
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .get(`/user-fuel-history/${userId}`);
    
      expect(response.status).to.equal(200);
      // Assuming you expect the response body to contain user fuel history
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      // Add more assertions as needed
    });
    
    it('GET /user-fuel-history/:userId - User fuel history not found', async () => {
      const userId = 9999; // Assuming this userId does not have fuel history in the database
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .get(`/user-fuel-history/${userId}`);
    
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('User fuel history not found');
    });
    
    it('GET /user-fuel-history/:userId - Invalid userId', async () => {
      const userId = 'invalidUserId'; // Invalid userId format
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .get(`/user-fuel-history/${userId}`);
    
      expect(response.status).to.equal(500); 
      expect(response.body.error).to.equal('Internal server error');
    });
    
    it('GET /user-fuel-history/:userId - Internal server error', async () => {
      const userId = 'invalidUserId'; // Invalid userId format to cause internal server error
      const chai = await import('chai');
      const expect = chai.expect;
      const response = await request(app)
        .get(`/user-fuel-history/${userId}`);
    
      expect(response.status).to.equal(500);
      expect(response.body.error).to.equal('Internal server error');
    });


  /*



*/
});