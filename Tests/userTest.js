let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let endPoint = "http://localhost:3000/api";

describe('Users',() =>{
	it('it should sign up goodly (correct info)', (done) => {
		chai.request(endPoint)
			.post('/users/signup')
			.send({"email":"test1@email.com","type":"teacher","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status(1);
				done();
			});
	});

	it('it shouldnt sign up since repeat (repeat)', (done) => {
		chai.request(endPoint)
			.post('/users/signup')
			.send({"email":"test1@email.com","type":"teacher","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status(122);
				done();
			});
	});

	it('it shouldnt sign up since bad email (bad email)', (done) => {
		chai.request(endPoint)
			.post('/users/signup')
			.send({"email":"thisIsNotAnEmail","type":"teacher","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status(121);
				done();
			});
	});
});