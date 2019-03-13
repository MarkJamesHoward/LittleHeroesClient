import { Aurelia, PLATFORM, inject } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { HttpClient } from "aurelia-fetch-client";
import {dev, DNS} from '../global';

interface SignedIn {
  signedIn: boolean;
  signedInAs: string;
}

@inject(HttpClient)
export class App {
  router: Router;
  public signedIn: boolean = false;
  public signedInAs: string;
  http: HttpClient;


  constructor(http: HttpClient) {
    this.http = http;

    if (dev) {
      this.signedIn = true;
    } else {
      // http
      //   .fetch(`${this.DNS}/Account/AmISignedIn`, {
      //     method: "get",
      //     credentials: "same-origin"
      //   })
      //   .then(result => result.json() as Promise<SignedIn>)
      //   .then(data => {
      //     console.log(data);
      //     this.signedIn = data.signedIn;
      //     this.signedInAs = data.signedInAs;
      //   });
      this.signedIn = true;
    }
  }
  Logout() {
    this.http
      .fetch("/Account/Logout", { method: "post", credentials: "same-origin" })
      .then(result => result)
      .then(data => {
        console.log(data);
        this.signedIn = false;
        this.signedInAs = "";
      });
  }

  Login() {
    window.location.href = "/Account/Login";
  }

  Register() {
    window.location.href = "/Account/Register";
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "LittleHeroes";
    config.options.pushState = true;
    config.options.hashChange = false;
    config.options.root = "/";
    config.map([
      {
        route: ["login"],
        name: "login",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../login/login"),
        nav: true,
        title: "Login"
      },
      {
        route: ["", "welcome"],
        name: "welcome",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../welcome/welcome"),
        nav: true,
        title: "Welcome"
      },
      {
        route: ["children"],
        name: "children",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../children/children"),
        nav: true,
        title: "Heroes"
      },
      {
        route: ["ManageHeroes"],
        name: "ManageHeroes",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../ManageHeroes/ManageHeroes"),
        nav: true,
        title: "Manage Heroes"
      },
      {
        route: ["ManageParents"],
        name: "ManageParents",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../ManageParents/ManageParents"),
        nav: true,
        title: "Manage Parents"
      },
      {
        route: "pet/:id",
        name: "pet",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../pet/pet"),
        nav: false,
        title: "Select Pet"
      },
      {
        route: ["notifications"],
        name: "notifications",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../notifications/notifications"),
        nav: true,
        title: "Receive Notifications"
      },
      {
        route: ["register"],
        name: "register",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../register/register"),
        nav: true,
        title: "Register"
      },
      {
        route: ["quickstart"],
        name: "quickstart",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../quickstart/quickstart"),
        nav: true,
        title: "QuickStart"
      },
      {
        route: ["achievements/:id"],
        name: "achievements",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../achievements/achievements"),
        nav: false,
        title: "Achievements"
      },
      {
        route: ["unlock/:level"],
        name: "unlock",
        settings: { icon: "" },
        moduleId: PLATFORM.moduleName("../unlock/unlock"),
        nav: false,
        title: "Unlock"
      }
    ]);

    this.router = router;
  }
}
