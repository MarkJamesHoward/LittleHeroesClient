import "@polymer/paper-button";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { DNS, dev } from "../global";

@inject(Router)
export class login {
  private myusername: string;
  private mypassword: string;
  private router: Router;
  private loginFailed: boolean;
  attemptingLogin: boolean = false;

  constructor(Router: Router) {
    this.router = Router;
    this.loginFailed = false;
    this.attemptingLogin = false;
  }

  Register() {
    this.router.navigate("register");
  }

  Home() {
    this.router.navigate("welcome");
  }


  Login() {
    // console.log(`username: ${this.myusername}`)
    // console.log(`password: ${this.mypassword}`)
    let details = { email: this.myusername, password: this.mypassword };

    this.attemptingLogin = true;

    fetch(`${DNS}/api/auth/login`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      credentials: "include",
      body: JSON.stringify(details)
    })
      .then(response => {
        if (response.ok) {
          this.attemptingLogin = false;
          console.log(`login succeeded! - should have a cookie now:`);
          console.log(response);
          //Now let's navigate to the view of hereos
          this.router.navigate("children");
          this.loginFailed = false;
        } else {
          this.loginFailed = true;
          this.attemptingLogin = false;
          setTimeout(() => {
            this.loginFailed = false;
          }, 3000)
          console.log("response was not ok");
        }
      })
      .catch(e => {
        console.log("failed to login - no connection");
        this.loginFailed = true;
        this.attemptingLogin = false;
        setTimeout(() => {
          this.loginFailed = false;
        }, 3000)
      });
  }
}
