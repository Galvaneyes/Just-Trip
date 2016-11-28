/* globals module Promise */
"use strict";

module.exports = function(models) {
    const { User } = models.models;

    return {
        createUser(userInfo) {

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