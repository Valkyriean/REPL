let chai = require('chai');
let chaiHttp = require('chai-http');
//let server = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

let endPoint="http://localhost:3000/api";

describe('AUTH', () => {
      
      it('it shouldnt login a user (incorrect password)', (done) => {
        chai.request(endPoint)
            .post('/users/auth')
            .send({ password: '123', email: 'soyeed2000@gmail.com' })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
      });

      it('it should login a user (correct info)', (done) => {
        chai.request(endPoint)
            .post('/users/auth')
            .send({ password: 'changeme', email: 'soyeed2000@gmail.com' })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
      });

      it('School:- it should login a user (is school admin)', (done) => {
        chai.request(endPoint)
            .post('/school/auth')
            .send({ password: 'changeme', email: 'soyeed2000@gmail.com', schoolid: 5})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
      });


  });