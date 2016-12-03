/* globals describe it beforeEach afterEach */

const chai = require("chai");
// const sinonModule = require("sinon");
const sinon = require("sinon");
let expect = chai.expect;

describe("User data", () => {
    // let sinon;

    // beforeEach(() => {
    //     sinon = sinonModule.sandbox.create();
    // });

    // class User {
    //     constructor(properties) {
    //         this.username = properties.username,
    //         this.salt = properties.salt,
    //         this.passHash = properties.passHash,
    //         this.firstname = properties.firstname,
    //         this.lastname = properties.lastname
    //     }

    //     static find() {}
    //     static findAll() {}
    // }

    let User = {
        find: () => {}
    };

    let data = require("../../server/data/user-data")({ User });

    describe("getUserData()", () => {
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
});