import { IRouter } from '@aurelia/router-lite';
import { resolve } from '@aurelia/kernel';
import { dev, DNS } from "../global";
import { uniqueNamesGenerator } from "unique-names-generator";

export class QuickStart {
  private router = resolve(IRouter);
  connecting: boolean = true;
  displayError: boolean = false;
  DelayInCreationOfAccount: boolean = false;

  attached() {
    let btn = document.querySelector("#LetsGo");
    if (btn) {
      //@ts-ignore
      btn.focus();
      console.log("button should now have focus");
    } else console.error("cannot find button");

    this.RegisterAsGuest();
  }

  Start() {
    //this.router.navigate("/children/1");
    this.router.load("welcome");
  }

  Home() {
    this.router.load("welcome");
  }

  // TODO:This needs to be completed
  RegisterAsGuest() {
    this.connecting = true;
    const shortName = uniqueNamesGenerator("-", true); // big-donkey

    let details = { email: shortName, password: "P@ssword1" };

    //After 2 seconds lets display the spinner
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
          console.log("added new user successfully!");
          //this.addedNewUserOk = true;
          this.connecting = false;
          this.displayError = false;
          //this.attemptedAddNewUser = false;
        }
      })
      .catch(e => {
        this.displayError = true;
        this.connecting = false;
        //this.attemptedAddNewUser = true;
        console.log("error adding new user");
      });
  }
}
