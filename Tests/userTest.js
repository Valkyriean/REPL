let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

let endPoint = "http://localhost:3000/api";

describe('Users',() =>{
	//sign up
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

	//passlogin
	let token;
	let loginToken;

	it('it should use password log in goodly (correct info)', (done) => {
		chai.request(endPoint)
			.post('/users/passLogin')
			.send({"email":"test1@email.com","pass":"testpass1"})
			.end((err, res) => {
				loginToken = res.body.loginToken;
				token = res.body.token;
				res.body.should.have.status(1);
				done();
			});
	});

	it('it shouldnt use password log in (wrong pass)', (done) => {
		chai.request(endPoint)
			.post('/users/passLogin')
			.send({"email":"test1@email.com","pass":"testpass2"})
			.end((err, res) => {
				res.body.should.have.status(141);
				done();
			});
	});

	it('it shouldnt use password log in (user not found)', (done) => {
		chai.request(endPoint)
			.post('/users/passLogin')
			.send({"email":"test2@email.com","pass":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status(142);
				done();
			});
	});

	//token login
	it('it should use token log in goodly(correct info)', (done) => {
		chai.request(endPoint)
			.post('/users/tokenLogin')
			.send({"token":loginToken})
			.end((err, res) => {
				res.body.should.have.status(1);
				done();
			});
	});

	it('it shouldnt use token log in (wrong token)', (done) => {
		chai.request(endPoint)
			.post('/users/tokenLogin')
			.send({"token":"fakeTokenHere"})
			.end((err, res) => {
				res.body.should.have.status(111);
				done();
			});
	});

	//change pass
	it('it should change password (correct info)', (done) => {
		chai.request(endPoint)
			.put('/users/changePass')
			.send({"token":token,})
			.end((err, res) => {
				res.body.should.have.status(111);
				done();
			});
	});


});