/* globals module Promise */
"use strict";

/*  username: String,
    firstname: String,
    lastname:String,
    age: Number,
    country: String,
    city: String,
    tours:[{}] */


module.exports = function(models) {
    const { User } = models.models; 

    return {
        getAllUsers() {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING...");

                User.find((err, users) => {
                    if (err) {

                        console.log("ERROR WHEN GET ALL USERS");
                        return reject(err);
                    }

                    console.log("US ERS FOUND");
                    return resolve(users);
                });    
            });
        },
        createUser(username, firstname, lastname, age, country, city) {

            const user = {
                username,
                firstname,
                lastname,
                age,
                country,
                city,
                tours:[{}]
            };

            return new Promise((resolve, reject) => {

                console.log("CREATING USER");

                User.create(user, (err, user) => {
                    if(err) {

                        console.log("CAN NOT CREATE USER");
                        return reject(err);
                    }

                    console.log("USER CREATED");
                    return resolve(user);
                });
            });
        }
    };
};