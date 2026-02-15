import { IHttpClient } from '@aurelia/fetch-client';
import { IRouter } from '@aurelia/router-lite';
import { resolve } from '@aurelia/kernel';
import { DNS, dev } from "../global";

export class Register {
  DelayInCreationOfAccount: boolean;
  private router = resolve(IRouter);
  addedNewUserOk: boolean = false;
  attemptedAddNewUser: boolean = false;
  connecting: boolean = false;
  error: boolean = false;
  errorMsg: string = '';
  private http = resolve(IHttpClient);
  myusername: string;
  mypassword: string;

  Home() {
    this.router.load("welcome");
  }

  AllGood() {
    setTimeout(() => {
      this.addedNewUserOk = true;
      this.attemptedAddNewUser = false;
      this.connecting = false;

      setTimeout(() => {
      this.router.load("/welcome");
      }, 3000);

    }, 2000);
  }

  Register() {

    let user = document.querySelector('#username');
    //@ts-ignore
    this.myusername = user.value;

    let pass = document.querySelector('#password')
    //@ts-ignore
    this.mypassword = pass.value;

    let details = { email: this.myusername, password: this.mypassword };
    this.attemptedAddNewUser = false;

    console.log(DNS);

    this.connecting = true;

    setTimeout(() => {
      this.DelayInCreationOfAccount = true;
    }, 2000);

    fetch(`${DNS}/api/auth/register`, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      credentials: "include",
      body: JSON.stringify(details)
    })
      .then(response => {
        if (response.ok) {
          this.AllGood();
        } else {
          this.connecting = false;
          this.error = true;
          this.attemptedAddNewUser = true;
          response.text().then((data) => {
            this.errorMsg = data;
          });
        }
      })
      .catch(e => {
        this.attemptedAddNewUser = true;
        this.error = true;
        this.connecting = false;
        this.errorMsg = e.message;
        setTimeout(() => {
          this.error = false;
        }, 3000);
        console.log("error adding new user");
      });
  }
}
