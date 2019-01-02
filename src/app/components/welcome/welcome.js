var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
var Welcome = /** @class */ (function () {
    function Welcome(http, router) {
        var _this = this;
        this.loading = true;
        this.signedIn = false;
        this.offline = false;
        this.errorHadOccurred = false;
        this.http = http;
        this.router = router;
        this.AmISignedIn()
            .then(function () {
            if (_this.signedIn) {
                _this.startup();
            }
            console.log('finished constructor');
            _this.loading = false;
        })
            .catch(function (err) {
            if (err == 'TypeError: Failed to fetch') {
                console.log('Offline ' + err);
                _this.offline = true;
                _this.loading = false;
            }
            else {
                console.log('Some error ' + err);
                _this.errorHadOccurred = true;
                _this.errorMessage = err;
                _this.loading = false;
            }
        });
    }
    Welcome.prototype.AmISignedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })];
                    case 1:
                        result = _a.sent();
                        if (!(result.ok == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, result.json()];
                    case 2:
                        data = _a.sent();
                        this.signedIn = data.signedIn;
                        this.signedInAs = data.signedInAs;
                        _a.label = 3;
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.GetParentDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.fetch('api/Parents/GetParentDetails', { method: 'get', credentials: 'same-origin' })];
                    case 1:
                        result = _a.sent();
                        if (!(result.status == 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, result.json()];
                    case 2:
                        data = _a.sent();
                        this.parent = data;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.GetGroupDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.fetch('api/Group', { method: 'get', credentials: 'same-origin' })];
                    case 1:
                        result = _a.sent();
                        if (!(result.status == 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, result.json()];
                    case 2:
                        data = _a.sent();
                        this.groupMembers = data;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.CheckOnlineOrNot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.AmISignedIn()];
                    case 1:
                        _a.sent();
                        this.offline = false;
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.offline = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.startup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, await1, await2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([this.GetParentDetails(), this.GetGroupDetails()])];
                    case 1:
                        _a = _b.sent(), await1 = _a[0], await2 = _a[1];
                        this.loading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    Welcome.prototype.CloseError = function () {
        this.errorHadOccurred = false;
    };
    Welcome.prototype.DisplayError = function (msg) {
        this.errorMessage = msg;
        this.errorHadOccurred = true;
        console.log(msg);
    };
    Welcome.prototype.ViewHeroTastic = function () {
        this.router.navigate('children');
    };
    Welcome.prototype.Signup = function () {
        try {
            console.log('navigate to login');
            window.location.href = "/Account/Login";
        }
        catch (err) {
            if (err == 'TypeError: Failed to fetch') {
                console.log('Offline ' + err);
                this.offline = true;
                this.loading = false;
            }
            else {
                console.log('Some error ' + err);
                this.errorHadOccurred = true;
                this.errorMessage = err;
                this.loading = false;
            }
        }
    };
    Welcome = __decorate([
        inject(HttpClient, Router),
        __metadata("design:paramtypes", [HttpClient, Router])
    ], Welcome);
    return Welcome;
}());
export { Welcome };
//# sourceMappingURL=welcome.js.map