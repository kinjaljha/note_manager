var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
const Note = require("../note/note.model");

describe("CRUD OPERATIONS", function () {
    var notes = [
        {
            title : "test note",
            content : "this is test body"
        }
    ];
    it("Should add Note in DB", done => {
        for (note in notes) {
            chai.request(server)
                .post("/notes")
                .send(notes[note])
                .end((err, res) => {
                    res.should.have.status(201);
                    console.log("Response Body:", res.body);
                });
        }
        done();
    });
});

describe("/GET notes", () => {
    it("it should GET all the notes", done => {
        chai.request(server)
            .get("/notes")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.data.should.be.a("array");
                done();
            });
    });
});

