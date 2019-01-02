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
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
var ManageHeroes = /** @class */ (function () {
    function ManageHeroes(router, http) {
        var _this = this;
        this.addingChildActivated = false;
        this.loading = false;
        this.displayError = false;
        this.router = router;
        this.http = http;
        http.fetch('api/Children', { method: 'get', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            _this.registeredKids = data;
            console.log(data);
        });
    }
    ManageHeroes.prototype.RemoveChild = function (child) {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.dir(child);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.http.fetch("api/Children/" + child.id, { method: 'delete', credentials: 'same-origin' })];
                    case 2:
                        result = _a.sent();
                        if (!result.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, result.json()];
                    case 3:
                        data = _a.sent();
                        this.registeredKids = data;
                        console.log('child removed successfully');
                        return [3 /*break*/, 5];
                    case 4:
                        this.errorMessage = "Failed to add child " + result.status;
                        this.displayError = true;
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        this.errorMessage = "Failed to add child " + e_1;
                        this.displayError = true;
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ManageHeroes.prototype.ActivateAddChild = function () {
        this.addingChildActivated = true;
    };
    ManageHeroes.prototype.Cancel = function () {
        this.addingChildActivated = false;
    };
    ManageHeroes.prototype.CloseError = function () {
        this.displayError = false;
    };
    ManageHeroes.prototype.AddChild = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        console.log('adding new child ' + this.newChildName);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        if (!(this.newChildName.length < 3)) return [3 /*break*/, 2];
                        this.displayError = true;
                        this.errorMessage = 'Name must be greater than 3 characters';
                        this.loading = false;
                        return [3 /*break*/, 7];
                    case 2: return [4 /*yield*/, this.http.fetch("api/Children/" + this.newChildName, { method: 'post', credentials: 'same-origin' })];
                    case 3:
                        result = _a.sent();
                        if (!result.ok) return [3 /*break*/, 5];
                        return [4 /*yield*/, result.json()];
                    case 4:
                        data = _a.sent();
                        this.registeredKids = data;
                        console.log('new child added ' + data);
                        return [3 /*break*/, 6];
                    case 5:
                        this.errorMessage = "Failed to add child " + result.statusText;
                        this.displayError = true;
                        _a.label = 6;
                    case 6:
                        this.addingChildActivated = false;
                        this.loading = false;
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_2 = _a.sent();
                        this.errorMessage = "Failed to add child " + e_2;
                        this.displayError = true;
                        this.loading = false;
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ManageHeroes = __decorate([
        inject(Router, HttpClient),
        __metadata("design:paramtypes", [Router, HttpClient])
    ], ManageHeroes);
    return ManageHeroes;
}());
export { ManageHeroes };
//# sourceMappingURL=ManageHeroes.js.map