var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PLATFORM, inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
var App = /** @class */ (function () {
    function App(http) {
        var _this = this;
        this.signedIn = false;
        this.http = http;
        http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })
            .then(function (result) { return result.json(); })
            .then(function (data) {
            console.log(data);
            _this.signedIn = data.signedIn;
            _this.signedInAs = data.signedInAs;
        });
    }
    App.prototype.Logout = function () {
        var _this = this;
        this.http.fetch('/Account/Logout', { method: 'post', credentials: 'same-origin' })
            .then(function (result) { return result; })
            .then(function (data) {
            console.log(data);
            _this.signedIn = false;
            _this.signedInAs = '';
        });
    };
    App.prototype.Login = function () {
        window.location.href = "/Account/Login";
    };
    App.prototype.Register = function () {
        window.location.href = "/Account/Register";
    };
    App.prototype.configureRouter = function (config, router) {
        config.title = 'LittleHeroes';
        config.options.pushState = true;
        config.options.hashChange = false;
        config.options.root = '/';
        config.map([
            {
                route: ['', 'welcome'],
                name: 'welcome',
                settings: { icon: '' },
                moduleId: PLATFORM.moduleName('../welcome/welcome'),
                nav: true,
                title: 'Welcome'
            },
            {
                route: ['children'],
                name: 'children',
                settings: { icon: '' },
                moduleId: PLATFORM.moduleName('../children/children'),
                nav: true,
                title: 'Heroes'
            },
            {
                route: ['ManageHeroes'],
                name: 'ManageHeroes',
                settings: { icon: '' },
                moduleId: PLATFORM.moduleName('../ManageHeroes/ManageHeroes'),
                nav: true,
                title: 'Manage Heroes'
            },
            {
                route: ['ManageParents'],
                name: 'ManageParents',
                settings: { icon: '' },
                moduleId: PLATFORM.moduleName('../ManageParents/ManageParents'),
                nav: true,
                title: 'Manage Parents'
            },
            {
                route: ['avatar'],
                name: 'avatar',
                settings: { icon: '' },
                moduleId: PLATFORM.moduleName('../avatar/avatar'),
                nav: true,
                title: 'Select Avatar'
            },
            {
                route: ['notifications'],
                name: 'notifications',
                settings: { icon: '' },
                moduleId: PLATFORM.moduleName('../notifications/notifications'),
                nav: true,
                title: 'Receive Notifications'
            }
        ]);
        this.router = router;
    };
    App = __decorate([
        inject(HttpClient),
        __metadata("design:paramtypes", [HttpClient])
    ], App);
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map