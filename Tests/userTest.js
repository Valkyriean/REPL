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
				res.body.should.have.status("success");
				done();
			});
	});

	it('it shouldnt sign up since repeat (repeat)', (done) => {
		chai.request(endPoint)
			.post('/users/signup')
			.send({"email":"test1@email.com","type":"teacher","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status("repeat email");
				done();
			});
	});

	it('it shouldnt sign up since bad email (bad email)', (done) => {
		chai.request(endPoint)
			.post('/users/signup')
			.send({"email":"thisIsNotAnEmail","type":"teacher","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status("invalid input");
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
				res.body.should.have.status("success");
				done();
			});
	});

	it('it shouldnt use password log in (wrong pass)', (done) => {
		chai.request(endPoint)
			.post('/users/passLogin')
			.send({"email":"test1@email.com","pass":"testpass2"})
			.end((err, res) => {
				res.body.should.have.status("wrong pass");
				done();
			});
	});

	it('it shouldnt use password log in (user not found)', (done) => {
		chai.request(endPoint)
			.post('/users/passLogin')
			.send({"email":"test2@email.com","pass":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status("user not found");
				done();
			});
	});

	//token login
	it('it should use token log in goodly(correct info)', (done) => {
		chai.request(endPoint)
			.post('/users/tokenLogin')
			.send({"token":loginToken})
			.end((err, res) => {
				res.body.should.have.status("success");
				done();
			});
	});

	it('it shouldnt use token log in (wrong token)', (done) => {
		chai.request(endPoint)
			.post('/users/tokenLogin')
			.send({"token":"fakeTokenHere"})
			.end((err, res) => {
				res.body.should.have.status("invalid token");
				done();
			});
	});

	//change pass
	it('it should change password (correct info)', (done) => {
		chai.request(endPoint)
			.put('/users/changePass')
			.send({"token":token,"oldPass":"testpass1","newPass":"testpass2"})
			.end((err, res) => {
				res.body.should.have.status("success");
				done();
			});
	});

	it('it shouldnt change password (wrong old password)', (done) => {
		chai.request(endPoint)
			.put('/users/changePass')
			.send({"token":token,"oldPass":"testpass1","newPass":"testpass2"})
			.end((err, res) => {
				res.body.should.have.status("user does not exist or wrong pass");
				done();
			});
	});

	//lost pass
	let retrieveToken;
	it('it should retrieve password (correct info)', (done) => {
		chai.request(endPoint)
			.post('/users/lostPass')
			.send({"email":"test1@email.com"})
			.end((err, res) => {
				retrieveToken = res.body.token;
				res.body.should.have.status("success");
				done();
			});
	});

	//find pass
	it('it should retrieve password (correct info)', (done) => {
		chai.request(endPoint)
			.post('/users/findPass')
			.send({"token":retrieveToken,"pass":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status("success");
				done();
			});
	});

	it('it shouldnt retrieve password (wrong token)', (done) => {
		chai.request(endPoint)
			.post('/users/findPass')
			.send({"token":"randomFakeTokenHere","pass":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status("invalid token");
				done();
			});
	});

	//delete user
	it('it should delete user (correct info)', (done) => {
		chai.request(endPoint)
			.delete('/users/deleteUser')
			.send({"token":token,"pass":"testpass1"})
			.end((err, res) => {
				res.body.should.have.status("success");
				done();
			});
	});

	it('it shouldnt delete user (wrong pass)', (done) => {
		chai.request(endPoint)
			.delete('/users/deleteUser')
			.send({"token":token,"pass":"testpass2"})
			.end((err, res) => {
				res.body.should.have.status("user is not found or wrong pass");
				done();
			});
	});
});
