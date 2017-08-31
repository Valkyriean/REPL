/**
 * Created by Li on 2017/5/31.
 */
 let chai = require('chai');
 let chaiHttp = require('chai-http');
 let should = chai.should();

 chai.use(chaiHttp);

 let endPoint = "http://localhost:3000/api";

descrbe('Classroom',() =>{
    //需要先创建测试用id 分别为学生身份以及教师身份
    let studentToken;
    let teacherToken;

    it('student signup', (done) => {
        chai.request(endPoint)
            .post('/users/signup')
            .send({"email":"student@email.com","type":"student","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
            .end((err, res) => {
                res.body.should.have.status(1);
                done();
            });
    });

    it('student login', (done) => {
        chai.request(endPoint)
            .post('/users/passLogin')
            .send({"email":"student@email.com","pass":"testpass1"})
            .end((err, res) => {
                studentToken = res.body.token;
                res.body.should.have.status(1);
                done();
            });
    });

    it('teacher signup', (done) => {
        chai.request(endPoint)
            .post('/users/signup')
            .send({"email":"teacher@email.com","type":"student","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
            .end((err, res) => {
                res.body.should.have.status(1);
                done();
            });
    });

    it('student login', (done) => {
        chai.request(endPoint)
            .post('/users/passLogin')
            .send({"email":"teacher@email.com","pass":"testpass1"})
            .end((err, res) => {
                teacherToken = res.body.token;
                res.body.should.have.status(1);
                done();
            });
    });



    //先测试创建classroom 失败条件 学生无权 成功返回1

});
