"use strict";
var Message = (function () {
    function Message(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
    return Message;
}());
exports.Message = Message;
