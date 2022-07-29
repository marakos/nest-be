"use strict";
exports.__esModule = true;
exports.CreateUserDto = void 0;
var openapi = require("@nestjs/swagger");
var CreateUserDto = /** @class */ (function () {
    function CreateUserDto() {
    }
    CreateUserDto._OPENAPI_METADATA_FACTORY = function () {
        return { email: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, password: { required: true, type: function () { return String; } } };
    };
    return CreateUserDto;
}());
exports.CreateUserDto = CreateUserDto;
exports["default"] = CreateUserDto;
