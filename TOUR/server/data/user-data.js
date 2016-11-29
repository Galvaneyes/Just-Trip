/* globals module Promise */
"use strict";

module.exports = function(models) {
    const { User } = models.models;
    const encrypt = require('../../utils/encrypt');

    return {
        createUser(userInfo) {
            const salt = encrypt.generateSalt();

            let user = new User({
                username: userInfo.username,
                salt: salt,
                passHash: encrypt.hashPassword(salt, userInfo.password || encrypt.genenerateRandomPassword()),
                email: userInfo.email,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                age: userInfo.age,
                country: userInfo.country,
                city: userInfo.city
            });

            return new Promise((resolve, reject) => {

                console.log("CREATING USER...");

                User.create(user, (err, user) => {
                    if (err) {

                        console.log("CAN NOT CREATE USER");
                        return reject(err);
                    }

                    console.log("USER CREATED!");
                    return resolve(user);
                });
            });
        },
        getUserById(id) {
            return new Promise((resolve, reject) => {
                console.log(`Searching for user by ${id}`);
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        console.log(`${id} was not found`);
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                console.log(`SEARCHING FOR USER ${username}`);

                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        console.log("ERROR WHEN CONNECTION TO THE SERVER");
                        return reject(err);
                    }

                    if (!user) {
                        console.log(`USER: ${username} WAS NOT FOUND`);
                        return reject(username);
                    }

                    console.log(`USER ${username} WAS FOUND`);
                    return resolve(user);
                });
            });
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
        getUserByCredentials(username, password) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, password }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
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
        },
        updateUserArrayProperty(username, updateData) {
            return new Promise((resolve, reject) => {

                User.findOneAndUpdate(username, { $push: updateData }, { upsert: true, 'new': true }, (err, model) => {
                    if (err) {
                        console.log(`ERROR WHEN UPDATE USER:${username}`);
                        return reject(err);
                    }

                    console.log(`USER ${username} UPDATED SUCCESSFULLY`);
                    return resolve(model);
                });
            });
        }
    };
};