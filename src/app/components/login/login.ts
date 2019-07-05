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
  private errorMsg1: string;
  private errorMsg2: string;
  private errorMsg3: string;
  private router: Router;
  private loginFailed: boolean;
  attemptingLogin: boolean = false;

  constructor(Router: Router) {
    this.router = Router;
    this.loginFailed = false;
    this.attemptingLogin = false;
  }

  TestChildren() {
    fetch(`${DNS}/api/children/all`, {
      method: "get",
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          console.log(`We are logged in`);
          console.log(response);
        } else {
          console.log("Not logged in - should see a 401 not auth on the get children call");
        }
      })
      .catch(e => {
        console.log("failed to login");
      });
  }

  Register() {
    this.router.navigate("register");
  }

  Home() {
    this.router.navigate("welcome");
  }

  attached() {}

  Login() {
    let username = document.querySelector("#Username");
    let password = document.querySelector("#Password");

    //@ts-ignore
    this.myusername = username.value;
    //@ts-ignore
    this.mypassword = password.value;

    // console.log(this.myusername)
    // console.log(this.mypassword)

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
          //this.router.navigate("/children/1");
          this.router.navigate("/welcome");
          //this.TestChildren();
          this.loginFailed = false;
        } else {
          this.errorMsg1 = response.status.toString();
          throw response;
        }
      })
      .catch(e => {
        console.log("failed to login - no connection");
        this.loginFailed = true;
        this.attemptingLogin = false;
        this.errorMsg2 = e.message;
        e.text().then(error => {
          this.errorMsg3 = error;
        });
        setTimeout(() => {
          this.loginFailed = false;
        }, 3000);
      });
  }
}
