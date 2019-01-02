var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
var RewardsList = /** @class */ (function () {
    function RewardsList(router, http) {
        var _this = this;
        this.browniePoints = [];
        this.addingRewardActivated = [];
        this.rewardTextBoxState = [];
        this.router = router;
        this.http = http;
        console.log('calling rewards get');
        this.http.fetch('api/Children', { method: 'get', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            _this.browniePoints = data;
            console.log('Got rewards for all children');
            for (var outer = 0; outer < Object.keys(data).length; outer++) {
                console.log('adding hide');
                _this.addingRewardActivated.splice(outer, 1, false);
            }
        });
    }
    RewardsList.prototype.ActivateAddRewards = function (index) {
        console.log(index);
        this.addingRewardActivated.splice(index, 1, true);
        //this.addingRewardActivated[index] = true;
        console.log(this.addingRewardActivated);
    };
    RewardsList.prototype.EditReward = function (reward) {
        console.log('reward text box index ' + reward);
        //Enable the associated text box for this reward
        reward.editing = true;
        console.log(reward.editing);
    };
    RewardsList.prototype.SaveReward = function (reward) {
        console.log('reward text box index ' + reward);
        //Enable the associated text box for this reward
        reward.editing = true;
        this.http.fetch("api/Rewards/" + reward.id + "/" + reward.reward, { method: 'put', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            console.log('reward removed ' + data);
        });
        console.log(reward.editing);
    };
    RewardsList.prototype.RemoveReward = function (reward) {
        console.log('removing reward ' + reward.id);
        this.http.fetch("api/Rewards/" + reward.id, { method: 'delete', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            console.log('reward removed ' + data);
        });
    };
    RewardsList.prototype.AddReward = function (child) {
        console.log("adding reward " + this.test + " id = " + child.id);
        this.http.fetch("api/Rewards/" + this.test + "/" + child.id, { method: 'post', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            console.log('reward added ' + data);
        });
    };
    RewardsList = __decorate([
        inject(Router, HttpClient),
        __metadata("design:paramtypes", [Router, HttpClient])
    ], RewardsList);
    return RewardsList;
}());
export { RewardsList };
//# sourceMappingURL=rewardslist.js.map