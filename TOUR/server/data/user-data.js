/* globals module Promise */
"use strict";

/*  username: {type: String, validate: /[a-zA-Z0-9]+/, required: true, unique: true},
    firstname: {type: String, validate: /[a-zA-Z]+/, required: true},
    lastname:{type: String, validate: /[a-zA-Z]+/, required: true},
    age: {type: Number, min:0 , max:150, required: true},
    country: {type:String, required: true},
    city: {type:String, required: true},
    userOfferTours:[{}],
    userBoughtTours:[{}] */

module.exports = function(models) {
    const { User } = models.models;

    return {
        createUser(username, password, email, firstname, lastname, age, country, city) {

            const userInfo = {
                username,
                password,
                email,
                firstname,
                lastname,
                age,
                country,
                city,
                userOfferTours: [{}],
                userBoughtTours: [{}]
            };

            return new Promise((resolve, reject) => {

                console.log("CREATING USER...");

                User.create(userInfo, (err, user) => {
                    if (err) {

                        console.log("CAN NOT CREATE USER");
                        return reject(err);
                    }

                    console.log("USER CREATED!");
                    return resolve(user);
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                console.log(`SEARCHING FOR USER ${username}`);

                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        console.log(`USER: ${username} WAS NOT FOUND`);
                        return reject(err);
                    }

                    console.log(`USER ${username} WAS FOUND`);
                    return resolve(user);
                });
            })
        },
        getUserByRange(page, size) {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR USER COLLECTION...");
                User.find()
                    .skip(page * size)
                    .limit(size)
                    .exec((err, users) => {
                        if (err) {
                            console.log("COLLECTION FROM USERS WAS NOT FOUND");
                            return reject(err);
                        }

                        console.log("COLLECTION FROM USERS WAS FOUND");
                        return resolve(users);
                    });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL USERS...");
                User.find({}, (err, users) => {
                    if (err) {
                        console.log("ERROR WHEN GET ALL USERS!");
                        return reject(err);
                    }

                    console.log("USERS FOUND!");
                    return resolve(users);
                });
            });
        }
    };
};