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
var InviteNewUser = /** @class */ (function () {
    function InviteNewUser(http, router) {
        var _this = this;
        this.loading = true;
        this.signedIn = false;
        this.http = http;
        this.router = router;
        http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            console.log(data);
            _this.signedIn = data.signedIn;
            _this.signedInAs = data.signedInAs;
        });
    }
    InviteNewUser = __decorate([
        inject(HttpClient, Router),
        __metadata("design:paramtypes", [HttpClient, Router])
    ], InviteNewUser);
    return InviteNewUser;
}());
export { InviteNewUser };
//# sourceMappingURL=inviteNewUser.js.map