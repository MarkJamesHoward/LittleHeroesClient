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
var Home = /** @class */ (function () {
    function Home(http, Router) {
        var _this = this;
        this.currentCount = 0;
        this.showChildData = false;
        this.levelledUp = false;
        this.loading = true;
        this.signedIn = false;
        this.errorHadOccurred = false;
        this.showingAvailableRewards = false;
        this.editingReward = false;
        this.editingChildName = false;
        this.editing = false;
        this.numberOfAvailableRewards = 0;
        this.syncPending = false;
        this.offline = false;
        this.usingRewardInProgress = false;
        this.http = http;
        this.router = Router;
        //var myElement: any = document.querySelector('.HammerZone');
        //console.log(myElement)
        //var myOptions = {};
        ////var hammertime = new Hammer(myElement, myOptions);
        ////hammertime.on('pan', function (ev) {
        ////    console.log('pan');
        ////});
        ////hammertime.on('swipeleft', function (ev) {
        ////    console.log('swipe left')
        ////});
        this.InitialLoad()
            .then(function () {
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
                _this.offline = false;
            }
        });
    }
    Home.prototype.EditReward = function () {
        this.editingReward = true;
    };
    Home.prototype.editChildName = function () {
        this.editingChildName = true;
    };
    Home.prototype.EditMode = function () {
        this.EditReward();
        this.editChildName();
        this.editing = true;
    };
    Home.prototype.IfEnterKeySaveChanges = function ($event, childid, childName, childreward) {
        if ($event.key == 'Enter') {
            this.SaveChanges(childid, childName, childreward);
            console.log($event);
        }
        console.log($event);
        return true;
    };
    Home.prototype.SaveChanges = function (childid, childName, childreward) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('save changes');
                        this.editing = false;
                        this.editingChildName = false;
                        this.editingReward = false;
                        return [4 /*yield*/, this.saveChildName(childid, childName)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.SaveReward(childid, childreward)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.saveChildName = function (childId, newName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log('saveChildName');
                        return [4 /*yield*/, this.http.fetch("api/Children/EditChildName/" + childId + "/" + newName, { method: 'put', credentials: 'same-origin' })];
                    case 1:
                        result = _a.sent();
                        if (!result.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, result.json()];
                    case 2:
                        data = _a.sent();
                        this.editingChildName = false;
                        this.editingReward = false;
                        this.editing = false;
                        this.ConfigureDisplay(data);
                        return [3 /*break*/, 4];
                    case 3:
                        this.DisplayError('Failed to update childName - notFound returned from server');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        this.editingChildName = false;
                        this.editingReward = false;
                        this.editing = false;
                        this.DisplayError(err_1);
                        return [3 /*break*/, 6];
                    case 6:
                        this.editingReward = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.SaveReward = function (childId, rewardDescription) {
        return __awaiter(this, void 0, void 0, function () {
            var result, data, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.http.fetch("api/Children/EditReward/" + childId + "/" + rewardDescription, { method: 'put', credentials: 'same-origin' })];
                    case 1:
                        result = _a.sent();
                        if (!result.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, result.json()];
                    case 2:
                        data = _a.sent();
                        this.editingReward = false;
                        this.editingChildName = false;
                        this.editing = false;
                        this.ConfigureDisplay(data);
                        return [3 /*break*/, 4];
                    case 3:
                        this.DisplayError('Failed to update reward - notFound returned from server');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        this.editingChildName = false;
                        this.editingReward = false;
                        this.editing = false;
                        this.DisplayError(err_2);
                        return [3 /*break*/, 6];
                    case 6:
                        this.editingReward = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.selectChild = function (child) {
        if (this.currentChildPresenting) {
            this.currentChildPresenting.presenting = false;
        }
        this.currentChildPresenting = child;
        this.showingChild = child.childName;
        this.currentChildPresenting.presenting = true;
        this.showChildData = true;
        for (var i = 0; i < Object.keys(this.browniePoints).length; i++) {
            if (this.browniePoints[i].childName == this.currentChildPresenting.childName) {
                this.index = i;
                break;
            }
        }
    };
    Home.prototype.MoveLeft = function (index) {
        console.log(index);
        console.log(this.browniePoints[index - 1]);
        if (index - 1 >= 0) {
            if (this.currentChildPresenting) {
                this.currentChildPresenting.presenting = false;
            }
            this.currentChildPresenting = this.browniePoints[index - 1];
            this.showingChild = this.browniePoints[index - 1].childName;
            this.currentChildPresenting.presenting = true;
            this.showChildData = true;
            this.index = index - 1;
        }
        else
            console.log('out of range left');
    };
    Home.prototype.MoveRight = function (index) {
        console.log(this.browniePoints[index + 1]);
        if (index + 1 < Object.keys(this.browniePoints).length) {
            if (this.currentChildPresenting) {
                this.currentChildPresenting.presenting = false;
            }
            this.currentChildPresenting = this.browniePoints[index + 1];
            this.showingChild = this.browniePoints[index + 1].childName;
            this.currentChildPresenting.presenting = true;
            this.showChildData = true;
            this.index = index + 1;
        }
        else
            console.log('out of range right');
    };
    Home.prototype.BackToBrowse = function (child) {
        this.router.navigate(child);
    };
    Home.prototype.handleSwipe = function ($event) {
        if ($event.direction === 'left') {
            console.log('swipe left');
        }
        else if ($event.direction === 'right') {
            console.log('swipe right');
        }
        console.log('hammer time');
        // here you have $event.hammerEvent holding the original event from HammerJS.
    };
    Home.prototype.AmISignedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })];
                    case 1:
                        result = _a.sent();
                        if (!result.ok) return [3 /*break*/, 3];
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
    Home.prototype.CheckOnlineOrNot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.InitialLoad()];
                    case 1:
                        _a.sent();
                        console.log('configure display now');
                        this.ConfigureDisplay(this.browniePoints);
                        this.offline = false;
                        this.errorHadOccurred = false;
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        if (err_3 == 'TypeError: Failed to fetch') {
                            console.log('Offline ' + err_3);
                            this.offline = true;
                            this.loading = false;
                        }
                        else {
                            console.log('Error while adding points ' + err_3);
                            this.errorHadOccurred = true;
                            this.errorMessage = err_3;
                            this.loading = false;
                            this.offline = false;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.InitialLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res1, data, res2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })];
                    case 1:
                        res1 = _b.sent();
                        if (!res1.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, res1.json()];
                    case 2:
                        data = _b.sent();
                        console.log('sign in info ' + data);
                        this.signedIn = data.signedIn;
                        this.signedInAs = data.signedInAs;
                        return [3 /*break*/, 4];
                    case 3:
                        console.log('The [AmIlogged] in call failed - just assume not logged in here!');
                        this.DisplayError('Failed to check the login status');
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.http.fetch('api/Children/', { method: 'get', credentials: 'same-origin' })];
                    case 5:
                        res2 = _b.sent();
                        if (!res2.ok) return [3 /*break*/, 7];
                        _a = this;
                        return [4 /*yield*/, res2.json()];
                    case 6:
                        _a.browniePoints = _b.sent();
                        this.currentCount = Object.keys(this.browniePoints).length;
                        return [3 /*break*/, 8];
                    case 7:
                        this.DisplayError('Unable to retrieve children');
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.CloseLevelUp = function () {
        this.levelledUp = false;
    };
    Home.prototype.CloseError = function () {
        this.errorHadOccurred = false;
    };
    Home.prototype.CheckIfLevelCompleted = function () {
        var _this = this;
        if (this.currentChildPresenting.points >= this.currentChildPresenting.pointsNeeded) {
            this.levelledUp = true;
            var excess_1 = this.currentChildPresenting.points - this.currentChildPresenting.pointsNeeded;
            console.log('leveledup');
            this.http.fetch("api/PointsData/LevelUp/" + this.currentChildPresenting.childName, { method: "Get", credentials: 'same-origin' })
                .then(function (result) { return result.json(); })
                .then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === _this.currentChildPresenting.id) {
                        console.log("updating " + data[i].childName);
                        _this.currentChildPresenting.points = excess_1;
                        _this.currentChildPresenting.availableRewards = data[i].availableRewards;
                    }
                }
            });
        }
    };
    Home.prototype.DisplayWaitingIcon = function () {
        this.loading = true;
    };
    Home.prototype.HideWaitingIcon = function () {
        this.loading = false;
    };
    Home.prototype.ViewAvailableRewards = function () {
        console.log('show rewards');
        this.showingAvailableRewards = true;
    };
    Home.prototype.ConfigureDisplay = function (data) {
        console.log(this.index);
        this.browniePoints = data;
        this.currentCount = Object.keys(this.browniePoints).length;
        this.currentChildPresenting = this.browniePoints[this.index];
        this.showingChild = this.currentChildPresenting.childName;
        this.currentChildPresenting.presenting = true;
        this.showChildData = true;
        this.HideWaitingIcon();
    };
    Home.prototype.Use = function (availableReward) {
        console.log('use');
        availableReward.beingConsumed = true;
        for (var i = 0; i < this.currentChildPresenting.availableRewards.length; i++) {
            console.log("checking " + i);
            if (this.currentChildPresenting.availableRewards[i].id === availableReward.id) {
                this.currentChildPresenting.availableRewards.splice(i, 1);
                console.log("removed " + i);
            }
        }
        this.http.fetch("api/AvailableRewards/SetRewardToUsed/" + availableReward.id, { method: 'put', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            console.log(data);
        });
    };
    Home.prototype.ViewPoints = function () {
        this.showingAvailableRewards = false;
    };
    Home.prototype.incrementCounter = function (child) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.combineAdds(child, 1);
                return [2 /*return*/];
            });
        });
    };
    Home.prototype.DeductCounter = function (child) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.combineAdds(child, -1);
                return [2 /*return*/];
            });
        });
    };
    Home.prototype.incrementCounterExtra = function (child) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.combineAdds(child, 10);
                return [2 /*return*/];
            });
        });
    };
    Home.prototype.combineAdds = function (child, amount) {
        var _this = this;
        if (amount < 0 && ((child.points + amount) < 0)) {
            console.log('Would be less than zero!');
            return;
        }
        this.syncPending = true;
        child.points += amount;
        console.log('child points ' + child.points);
        this.CheckIfLevelCompleted();
        if (child.pendingAdds == 0) {
            console.log('starting timer');
            setTimeout(function () {
                console.log('making call to server to update with points ' + child.pendingAdds);
                // perform the add now
                _this.incrementCounterInternal(child, child.pendingAdds);
                child.pendingAdds = 0;
                _this.syncPending = false;
            }, 5000);
        }
        console.log('child pending ' + child.pendingAdds);
        child.pendingAdds += amount;
    };
    Home.prototype.incrementCounterInternal = function (child, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.http.fetch("api/PointsData/AddBrowniePointExtra/" + child.childName + "/" + amount, { method: "Get", credentials: 'same-origin' })];
                    case 1:
                        result = _a.sent();
                        if (result.ok) {
                            //this.ConfigureDisplay(data);
                        }
                        else {
                            this.DisplayError('Error adding points! ' + result.status);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        this.HideWaitingIcon();
                        child.points -= amount;
                        if (err_4 == 'TypeError: Failed to fetch') {
                            console.log('Offline ' + err_4);
                            this.offline = true;
                            this.loading = false;
                        }
                        else {
                            console.log('Error while adding points ' + err_4);
                            this.errorHadOccurred = true;
                            this.errorMessage = err_4;
                            this.loading = false;
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    Home.prototype.DisplayError = function (msg) {
        this.HideWaitingIcon();
        this.errorMessage = msg;
        this.errorHadOccurred = true;
        console.log(msg);
    };
    Home = __decorate([
        inject(HttpClient, Router),
        __metadata("design:paramtypes", [Object, Router])
    ], Home);
    return Home;
}());
export { Home };
//# sourceMappingURL=children.js.map