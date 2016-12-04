"use strict";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,100}$/;

function validateString(str, minLength, maxLength) {
    let min = minLength || 3;
    let max = maxLength || 100;

    if (typeof str === "string") {
        if (str.length > min && str.length < max) {
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

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
    });
}


module.exports = {
    validateString,
    validatePassword,
    escapeHtml
};