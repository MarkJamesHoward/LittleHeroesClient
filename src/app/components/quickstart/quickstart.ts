import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { dev, DNS } from "../global";
import { uniqueNamesGenerator } from "unique-names-generator";
import "@polymer/paper-button";

@inject(Router)
export class QuickStart {
  router: Router;
  connecting: boolean = true;
  displayError: boolean = false;
  DelayInCreationOfAccount: boolean = false;

  attached() {
    let btn =  document.querySelector("#LetsGo")
    if(btn) {
    //@ts-ignore
     btn.focus();
     console.log('button should now have focus')
    }
     else
     console.error('cannot find button');

     this.RegisterAsGuest();
  }

  constructor(router: Router) {
    this.router = router;
  }

  Start() {
    //this.router.navigate("/children/1");
    this.router.navigate("/welcome");
  }

  Home() {
    this.router.navigate("welcome");
  }

  // TODO:This needs to be completed
  RegisterAsGuest() {
    this.connecting = true;
    const shortName = uniqueNamesGenerator("-", true); // big-donkey

    let details = { email: shortName, password: "password" };

    //After 2 seconds lets display the spinner
    setTimeout(() => {
      this.DelayInCreationOfAccount = true;
    }, 2000)

    fetch(`${DNS}/api/auth/registerguest/${shortName}`, {
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
