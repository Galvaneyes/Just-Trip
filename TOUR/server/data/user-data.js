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
        getAllUsers() {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING...");

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
        createUser(username, firstname, lastname, age, country, city) {

            const userInfo = {
                username,
                firstname,
                lastname,
                age,
                country,
                city,
                userOfferTours:[{}],
                userBoughtTours:[{}]
            };

            return new Promise((resolve, reject) => {

                console.log("CREATING USER...");

                User.create(userInfo, (err, user) => {
                    if(err) {

                        console.log("CAN NOT CREATE USER");
                        return reject(err);
                    }

                    console.log("USER CREATED!");
                    return resolve(user);
                });
            });
        }
    };
};