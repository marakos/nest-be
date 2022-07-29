"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var common_1 = require("@nestjs/common");
var LogsMiddleware = /** @class */ (function () {
    function LogsMiddleware() {
        this.logger = new common_1.Logger('HTTP');
    }
    LogsMiddleware.prototype.use = function (request, response, next) {
        var _this = this;
        response.on('finish', function () {
            var method = request.method, originalUrl = request.originalUrl;
            var statusCode = response.statusCode, statusMessage = response.statusMessage;
            var message = "".concat(method, " ").concat(originalUrl, " ").concat(statusCode, " ").concat(statusMessage);
            if (statusCode >= 500) {
                return _this.logger.error(message);
            }
            if (statusCode >= 400) {
                return _this.logger.warn(message);
            }
            return _this.logger.log(message);
        });
        next();
    };
    LogsMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], LogsMiddleware);
    return LogsMiddleware;
}());
exports["default"] = LogsMiddleware;
