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
import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
var notifications = /** @class */ (function () {
    function notifications(httpClient) {
        this.isSubscribed = false;
        this.serviceWorker = false;
        this.friendlyName = "My Device";
        if ('serviceWorker' in navigator) {
            this.serviceWorker = true;
        }
        this.http = httpClient;
        //this.checkSubscription();
        this.http.configure(function (config) {
            config
                .useStandardConfiguration()
                .withDefaults({
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        });
        this.checkSubscription();
    }
    notifications.prototype.urlB64ToUint8Array = function (base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };
    notifications.prototype.subscribe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var applicationServerPublicKey, reg1, applicationServerKey, subscribeResult, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!('serviceWorker' in navigator)) return [3 /*break*/, 4];
                        applicationServerPublicKey = 'BPuzIwehJRwG6w26oLqlW9PPKWAom9W6y5BRQJTaehH7LecpzIwIIk5Ru1Emt_P92BORv60yOkJdxCxcXixWrJE';
                        //prvate key n5CHbqANwFkxUlfWMppg90UBF9v7hDEx9ICY8NXDqns
                        console.log('Service Worker is supported');
                        return [4 /*yield*/, navigator.serviceWorker.ready];
                    case 1:
                        reg1 = _a.sent();
                        console.log('My service worker ' + reg1);
                        applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);
                        return [4 /*yield*/, reg1.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: applicationServerKey
                            })];
                    case 2:
                        subscribeResult = _a.sent();
                        this.subscriptionJSONified = JSON.stringify(subscribeResult);
                        console.log('subscribe result ' + JSON.stringify(subscribeResult));
                        return [4 /*yield*/, this.http.fetch("/api/push/" + this.friendlyName, { method: 'post', credentials: 'same-origin', body: json(subscribeResult) })];
                    case 3:
                        result = _a.sent();
                        console.log(result);
                        this.checkSubscription();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    notifications.prototype.checkSubscription = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serviceWorkerRegistration, pushSubscription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('called checksubscription');
                        return [4 /*yield*/, navigator.serviceWorker.ready];
                    case 1:
                        serviceWorkerRegistration = _a.sent();
                        console.log('service worker ready promise');
                        return [4 /*yield*/, serviceWorkerRegistration.pushManager.getSubscription()];
                    case 2:
                        pushSubscription = _a.sent();
                        this.subscription = pushSubscription;
                        if (!!pushSubscription) {
                            //Send subscription to application server
                            //sendSub(pushSubscription);
                            console.log('you are subscribed');
                            this.isSubscribed = true;
                            //Manage interface
                            //pushStatus = true;
                            //document.getElementById("pushStatus").checked = true;
                            //document.getElementById("pushStatusMsg").innerHTML = '<span>You are subscribed!</span>';
                        }
                        else {
                            this.isSubscribed = false;
                            console.log('you are not subscribed');
                            //Manage interface
                            //pushStatus = false;
                            //document.getElementById("pushStatus").checked = false;
                            //document.getElementById("pushStatusMsg").innerHTML = '<span>You are not subscribed!</span>';
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    notifications.prototype.unsubscribe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var event;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.subscription.unsubscribe()];
                    case 1:
                        event = _a.sent();
                        this.isSubscribed = false;
                        console.log('Unsubscribed!', event);
                        return [2 /*return*/];
                }
            });
        });
    };
    notifications = __decorate([
        inject(HttpClient),
        __metadata("design:paramtypes", [HttpClient])
    ], notifications);
    return notifications;
}());
export { notifications };
//# sourceMappingURL=notifications.js.map