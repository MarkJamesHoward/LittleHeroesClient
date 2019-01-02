var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
var AvailableRewards = /** @class */ (function () {
    //Use(availableReward: IAvailableRewards) {
    //    console.log(availableReward)
    //    console.log(availableReward.id)
    //    this.http.fetch(`api/AvailableRewards/SetRewardToUsed/${availableReward.id}`, { method: 'put', credentials: 'same-origin' })
    //        .then(result => result.json() as Promise<BrowniePoints[]>)
    //        .then(data => {
    //            this.browniePoints = data;
    //            this.currentCount = Object.keys(this.browniePoints).length;
    //            console.log(data);
    //            this.loading = false;
    //        });
    //}
    function AvailableRewards(http, Router) {
        var _this = this;
        this.currentCount = 0;
        this.showChildData = false;
        this.loading = true;
        this.signedIn = false;
        this.http = http;
        this.router = Router;
        http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            console.log('sign in info ' + data);
            _this.signedIn = data.signedIn;
            _this.signedInAs = data.signedInAs;
        });
        http.fetch('api/Children/', { method: 'get', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            _this.browniePoints = data;
            _this.currentCount = Object.keys(_this.browniePoints).length;
            console.log(data);
            _this.loading = false;
        });
    }
    AvailableRewards.prototype.activate = function (params, routeData) {
        console.log(routeData.name);
        //Pick this child as the active display
    };
    AvailableRewards.prototype.selectChild = function (child) {
        if (this.currentChildPresenting) {
            this.currentChildPresenting.presenting = false;
        }
        this.currentChildPresenting = child;
        this.showingChild = child.childName;
        this.currentChildPresenting.presenting = true;
        this.showChildData = true;
    };
    //MoveLeft(index: number) {
    //    console.log(index)
    //    console.log(this.browniePoints[index - 1]);
    //    if (index - 1 >= 0) {
    //        if (this.currentChildPresenting) {
    //            this.currentChildPresenting.presenting = false;
    //        }
    //        this.currentChildPresenting = this.browniePoints[index - 1];
    //        this.showingChild = this.browniePoints[index - 1].childName;
    //        this.currentChildPresenting.presenting = true;
    //        this.showChildData = true;
    //        this.DetermineReward();
    //        //this.currentReward = this.currentChildPresenting.rewards[this.currentChildPresenting.level - 1].reward;
    //    }
    //    else
    //        console.log('out of range left')
    //}
    //MoveRight(index:number) {
    //console.log(this.browniePoints[index + 1]);
    //if (index + 1 < Object.keys(this.browniePoints).length) {
    //    if (this.currentChildPresenting) {
    //        this.currentChildPresenting.presenting = false;
    //    }
    //    this.currentChildPresenting = this.browniePoints[index + 1];
    //    this.showingChild = this.browniePoints[index + 1].childName;
    //    this.currentChildPresenting.presenting = true;
    //    this.showChildData = true;
    //    this.DetermineReward();
    //    //this.currentReward = this.currentChildPresenting.rewards[this.currentChildPresenting.level - 1].reward;
    //}
    //else
    //    console.log('out of range right')
    //}
    AvailableRewards.prototype.BackToBrowse = function (child) {
        this.router.navigate(child);
    };
    AvailableRewards.prototype.DetermineReward = function () {
        if (this.currentChildPresenting.reward != undefined) {
            this.currentReward = this.currentChildPresenting.reward;
        }
        else {
            this.currentReward = 'Time to add a reward for this level!';
        }
    };
    AvailableRewards = __decorate([
        inject(HttpClient, Router),
        __metadata("design:paramtypes", [HttpClient, Router])
    ], AvailableRewards);
    return AvailableRewards;
}());
export { AvailableRewards };
//# sourceMappingURL=availableRewards.js.map