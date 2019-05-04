import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { dev, DNS } from '../global'
import { uniqueNamesGenerator } from 'unique-names-generator';
import "@polymer/paper-button";

@inject(Router)
export class QuickStart {
  router: Router;


  activate() {
    this.RegisterAsGuest();
  }

  constructor(router: Router) {
    this.router = router;
  }

  Start() {
    this.router.navigate("/children/1");
  }

  Home() {
    this.router.navigate("welcome");
  }

  // TODO:This needs to be completed
  RegisterAsGuest() {

    const shortName = uniqueNamesGenerator('-', true); // big-donkey

    let details = { email: shortName, password: 'password' };

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
          //this.attemptedAddNewUser = false;
        }
      })
      .catch(e => {
        //this.attemptedAddNewUser = true;
        console.log("error adding new user");
      });
  }
}
