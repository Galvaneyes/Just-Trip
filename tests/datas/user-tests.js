/* globals describe it beforeEach afterEach */

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("User data", () => {
    let sinon;

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class User {
        constructor(properties) {
            this.username = properties.username,
            this.salt = properties.salt,
            this.passHash = properties.passHash,
            this.firstname = properties.firstname,
            this.lastname = properties.lastname
        }

        static find() {}
        static findOne() {}
        static findAll() {}
    }

    let data = require("../../server/data/user-data")({ User });

    describe("getAllUsers()", () => {
        it("Expect to return 2 users", done => {
            let users = ["pesho", "gosho"];

            sinon.stub(User, "find", (_, cb) => {
                cb(null, users);
            });

            data.getAllUsers()
                .then(actualUsers => {
                    expect(actualUsers).to.eql(users);
                    done();
                });
        });
    });

    describe("getUserById()", () => {
        let userId = 1;

        let user = {
            _id: userId,
            name: "Pesho"
        },
        users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let id = query._id;
                let foundUser = users.find(u => u._id === id);

                cb(null, foundUser);
            });
        });

        it("Expect to return the user", done => {
            data.getUserById(userId)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });
    });
});