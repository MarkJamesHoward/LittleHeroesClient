import "@polymer/paper-button"
import '@polymer/paper-input/paper-input.js';
import "@polymer/paper-icon-button"
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-checkbox/paper-checkbox.js"

export class login{
  public dev: boolean = false;
  private username: string;
  private password: string;
  private DNS: string = "https://dojopoints.azurewebsites.net";
  //private DNS: string = "http://localhost:53067";

  Login() {
    let details = { email: 'mark@mjhoward.co.uk', password: 'TennisMauser1@'};
    console.log(details)
    fetch(`${this.DNS}/api/auth/login`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include',
      body: JSON.stringify(details)})
    .then(response => {
      if (response.ok) {
        console.log(`login succeeded! - should have a cookie now:`)
        console.log(response)
      }
      else {
        console.log('response was not ok')
      }
    })
    .catch(e => {
      console.log('failed to login')
    });
  }
}