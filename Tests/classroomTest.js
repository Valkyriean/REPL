/**
 * Created by Li on 2017/5/31.
 */
 let chai = require('chai');
 let chaiHttp = require('chai-http');
 let should = chai.should();

 chai.use(chaiHttp);

 let endPoint = "http://localhost:3000/api";

describe('Classrooms',() =>{
    //需要先创建测试用id 分别为学生身份以及教师身份


    it('student signup', (done) => {
        chai.request(endPoint)
            .post('/users/signup')
            .send({"email":"student@email.com","type":"student","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
            .end((err, res) => {
                res.body.should.have.status("success");
                done();
            });
    });
    let studentToken;
    it('student login', (done) => {
        chai.request(endPoint)
            .post('/users/passLogin')
            .send({"email":"student@email.com","pass":"testpass1"})
            .end((err, res) => {
                studentToken = res.body.token;
                res.body.should.have.status("success");
                done();
            });
    });

    it('teacher signup', (done) => {
        chai.request(endPoint)
            .post('/users/signup')
            .send({"email":"teacher@email.com","type":"teacher","firstname":"test","lastname":"test","pass":"testpass1","conf":"testpass1"})
            .end((err, res) => {
                res.body.should.have.status"success");
                done();
            });
    });

    let teacherToken;
    it('teacher login', (done) => {
        chai.request(endPoint)
            .post('/users/passLogin')
            .send({"email":"teacher@email.com","pass":"testpass1"})
            .end((err, res) => {
                teacherToken = res.body.token;
                res.body.should.have.status("success");
                done();
            });
    });


    //先测试创建classroom 失败条件 学生无权 成功返回"success"
    //分别测试加入和退出开启关闭的时候的 两种 直接转换和setting彻底转换
    //最后分别测试有权无权时（teacher student） 的 clone transfer kicks

    //然而创建classroom的时候并不会返回Jcode 所以要在开启dev模式的时候额外显示jcode
    let Jcode;

    it('teacher creat classroom', (done) => {
        chai.request(endPoint)
            .post('/classrooms/newClassroom')
            .send({
                "token":teacherToken,
                "name":"testClassroom",
                "description":"test Classroom desscription here",
                "programLanguage":"java"
            })
            .end((err, res) => {
                Jcode = res.body.Jcode;
                res.body.should.have.status("success");
                done();
            });
    });

    it('student creat classroom, failure expected', (done) => {
        chai.request(endPoint)
            .post('/classrooms/newClassroom')
            .send({
                "token":studentToken,
                "name":"testClassroom",
                "description":"test Classroom desscription here",
                "programLanguage":"java"
            })
            .end((err, res) => {
                res.body.should.have.status("user no power");
                done();
            });
    });

    //此时学生加入再退出
    it('student join classroom', (done) => {
        chai.request(endPoint)
            .post('/classrooms/joinClassroom')
            .send({
                "token":studentToken,
                "joinCode":Jcode
            })
            .end((err, res) => {
                res.body.should.have.status("success");
                done();
            });
    });

    //额成功加入的code有点问题于是就先写失败加入的了
    //Jocde不存在
    it('student join classroom using wrong Jcode', (done) => {
        chai.request(endPoint)
            .post('/classrooms/joinClassroom')
            .send({
                "token":studentToken,
                "joinCode":"randomFakeJcodeHere"
            })
            .end((err, res) => {
                res.body.should.have.status("Jcode存在しない");
                done();
            });
    });

    //教室关闭加入



    //教室未开放加入


    //喜闻乐见的毁尸灭迹时刻
    it('delete teacher', (done) => {
        chai.request(endPoint)
            .delete('/users/deleteUser')
            .send({"token":teacherToken,"pass":"testpass1"})
            .end((err, res) => {
                res.body.should.have.status("success");
                done();
            });
    });

    it('delete student', (done) => {
        chai.request(endPoint)
            .delete('/users/deleteUser')
            .send({"token":studentToken,"pass":"testpass1"})
            .end((err, res) => {
                res.body.should.have.status("success");
                done();
            });
    });
    console.log(teacherToken);
    console.log(studentToken);
});
