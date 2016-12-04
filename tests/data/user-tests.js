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
            this.lastname = properties.lastname,
            this.email = properties.email,
            this.age = properties.age,
            this.country = properties.country,
            this.city = properties.city
        }

        save() {

        }

        static create() {}
        static find() {}
        static findOne() {}
        static findAll() {}
    }

    let data = require("../../server/data/user-data")({
        User
    });

    describe("getAllUsers()", () => {
        afterEach(() => {
            sinon.restore();
        });

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

        it("Expect to reject if there are no users", done => {
            let users = [],
                errorMessage = "Error";

            sinon.stub(User, "find", (_, cb) => {
                cb(errorMessage, users);
            });

            data.getAllUsers()
                .catch(actualMessage => {
                    expect(actualMessage).to.equal(errorMessage);
                    done();
                })
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

                cb(null, foundUser || null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {
            data.getUserById(userId)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect to return null, if user is not found", done => {
            data.getUserById(42)
                .then(actualUser => {
                    expect(actualUser).to.be.null;
                    done();
                });
        });
    });

    describe("getUserByUsername()", () => {
        let username = "Pesho";

        let user = {
                username
            },
            users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let username = query.username;
                let foundUser = users.find(u => u.username === username);

                cb(null, foundUser || null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {
            data.getUserByUsername(username)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect to reject with name, if user is not found", done => {
            let name = "Gosho";

            data.getUserByUsername(name)
                .catch(err => {
                    expect(err).to.equals(name);
                    done();
                });
        });
    });

    describe("createUser()", () => {
        let username = "Pesho",
            user = {
                username: username,
                salt: "salt123",
                passHash: "passHash123",
                email: "Pesho@myemail.com",
                firstname: "Pesho",
                lastname: "Peshov",
                age: 30,
                country: "Bulgaria",
                city: "Sofia"
            };

        afterEach(() => {
            sinon.restore();
        });

        it("Expect user to be created", done => {
            sinon.stub(User, "create", (user, cb) => {
                cb(null, user);
            });

            data.createUser(user)
                .then(actualUser => {
                    expect(actualUser.username).to.equal(username);
                    done();
                });
        });

        it("Expect to reject with message when user is not created", done => {
            let errorMessage = "Error";

            sinon.stub(User, "create", (user, cb) => {
                cb(errorMessage, user);
            });

            data.createUser(user)
                .catch(actualMessage => {
                    expect(actualMessage).to.equals(errorMessage);
                    done();
                });
        });
    });

    describe("createFacebookUser()", () => {
        let username = "Pesho",
            user = {
                username: username,
                salt: "salt123",
                passHash: "passhash123",
                firstname: "Pesho",
                lastname: "Peshov",
                facebookId: "PeshoPesho",
                facebookToken: "fbToken123"
            };

        afterEach(() => {
            sinon.restore();
        });

        it("Expect Facebook user to be created", done => {
            sinon.stub(User, "create", (user, cb) => {
                cb(null, user);
            });

            data.createUser(user)
                .then(actualUser => {
                    expect(actualUser.username).to.equal(username);
                    done();
                });
        });

        it("Expect to reject with message when user is not create", done => {
            let errorMessage = "Error";

            sinon.stub(User, "create", (user, cb) => {
                cb(errorMessage, user);
            });

            data.createUser(user)
                .catch(actualMessage => {
                    expect(actualMessage).to.equals(errorMessage);
                    done();
                });
        });
    });

    describe("getUserByCredentials()", () => {
        let username = "Pesho",
            password = "password";

        let user = {
                username,
                password
            },
            users = [user];

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {
            sinon.stub(User, "findOne", (query, cb) => {
                let username = query.username,
                    password = query.password;

                let foundUser = users.find(u => u.username === username && u.password === password);

                cb(null, foundUser);
            });

            data.getUserByCredentials(username, password)
                .then(actualUser => {
                    expect(actualUser.username).to.eql(user.username);
                    done();
                });
        });

        it("Expect to reject with message if user is not found", done => {
            let errorMessage = "Error";

            sinon.stub(User, "findOne", (query, cb) => {
                let username = query.username,
                    password = query.password;

                let foundUser = users.find(u => u.username === username && u.password === password);

                cb(errorMessage, foundUser);
            });

            data.getUserByCredentials(username, password)
                .catch(actualError => {
                    expect(actualError).to.equal(errorMessage);
                    done();
                });
        });

        it("Expect to reject with message if the username is wrong", done => {
            let errorMessage = "Error",
                userName = "Gosho";

            sinon.stub(User, "findOne", (query, cb) => {
                let username = userName,
                    password = query.password;

                let foundUser = users.find(u => u.username === username && u.password === password);

                cb(errorMessage, foundUser);
            });

            data.getUserByCredentials(username, password)
                .catch(actualError => {
                    expect(actualError).to.equal(errorMessage);
                    done();
                });
        });

        it("Expect to reject with message if the password is wrong", done => {
            let errorMessage = "Error",
                password = "Gosho";

            sinon.stub(User, "findOne", (query, cb) => {
                let username = query.username,
                    password = query.password;

                let foundUser = users.find(u => u.username === username && u.password === password);

                cb(errorMessage, foundUser);
            });

            data.getUserByCredentials(username, password)
                .catch(actualError => {
                    expect(actualError).to.equal(errorMessage);
                    done();
                });
        });
    });

    describe("updateUser()", () => {
        afterEach(() => {
            sinon.restore();
        });

        let userInfo = {
            firstname: "Pesho"
        };

        let mockedUser = new User(userInfo),
            errorMessage = "Error";

        it("Expect to update the user", done => {
            sinon.stub(User.prototype, "save", cb => {
                cb(null, mockedUser);
            });

            data.updateUser(mockedUser)
                .then(expectedUser => {
                    expect(expectedUser.firstname).to.equals(userInfo.firstname);
                    done();
                });
        });

        it("Expect to reject with errorMessage", done => {
            sinon.stub(User.prototype, "save", cb => {
                cb(errorMessage);
            });

            data.updateUser(mockedUser)
                .catch(expectedError => {
                    expect(expectedError).to.equals(errorMessage);
                    done();
                });
        });

    });
});