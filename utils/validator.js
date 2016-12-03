"use strict";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,100}$/;

function validateName(name, minLength, maxLength) {
    let min = minLength || 3;
    let max = maxLength || 100;

    if (typeof name === "string") {
        if (name.length > min && name.length < max) {
            return true;
        }
    }

    return false;
}

function validatePassword(password) {
    if (typeof password === "string") {
        if (passwordRegex.test(password)) {
            return true;
        }
    }
    return false;
}


module.exports = {
    validateName,
    validatePassword
};