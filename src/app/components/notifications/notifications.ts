import { IRouter } from '@aurelia/router-lite';
import { IHttpClient } from '@aurelia/fetch-client';
import { json } from '@aurelia/fetch-client';
import { resolve } from '@aurelia/kernel';
import { DNS, dev } from "../global";

export class Notifications {
  message: string;
  serviceWorker: boolean;
  reg: any;
  subscription: any;
  subscriptionJSONified: string;
  isSubscribed = false;
  private http = resolve(IHttpClient);
  applicationServerKey: string;
  friendlyName: string;
  private router = resolve(IRouter);

  constructor() {
    this.serviceWorker = false;
    this.friendlyName = "My Device";

    if ("serviceWorker" in navigator) {
      this.serviceWorker = true;
    }

    //this.checkSubscription();
    this.http.configure(config => {
      config.useStandardConfiguration().withDefaults({
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      });
    });

    this.checkSubscription();
  }

  urlB64ToUint8Array(base64String: any) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  async subscribe() {
    if ("serviceWorker" in navigator) {
      const applicationServerPublicKey =
        "BPuzIwehJRwG6w26oLqlW9PPKWAom9W6y5BRQJTaehH7LecpzIwIIk5Ru1Emt_P92BORv60yOkJdxCxcXixWrJE";
      //prvate key (held in the Azure trigger only!)

      console.log("Service Worker is supported");
      //let reg1 = await navigator.serviceWorker.register('./service-worker-webpack.js');
      let reg1 = await (<any>navigator).serviceWorker.ready;

      console.log("My service worker " + reg1);

      const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);

      let subscribeResult = await reg1.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      });

      this.subscriptionJSONified = JSON.stringify(subscribeResult);
      console.log("subscribe result " + JSON.stringify(subscribeResult));

      let result = await this.http.fetch(`${DNS}/api/push/${this.friendlyName}`, {
        method: "post",
        credentials: "include",
        body: json(subscribeResult)
      });

      console.log(result);

      this.checkSubscription();
    }
  }

  Home() {
    this.router.load("welcome");
  }

  async checkSubscription() {
    console.log("called checksubscription");

    let serviceWorkerRegistration = await (<any>navigator).serviceWorker.ready;

    console.log("service worker ready promise");
    let pushSubscription = await serviceWorkerRegistration.pushManager.getSubscription();

    this.subscription = pushSubscription;

    if (!!pushSubscription) {
      //Send subscription to application server
      //sendSub(pushSubscription);
      console.log("you are subscribed");
      this.isSubscribed = true;
      //Manage interface
      //pushStatus = true;
      //document.getElementById("pushStatus").checked = true;
      //document.getElementById("pushStatusMsg").innerHTML = '<span>You are subscribed!</span>';
    } else {
      this.isSubscribed = false;
      console.log("you are not subscribed");
      //Manage interface
      //pushStatus = false;
      //document.getElementById("pushStatus").checked = false;
      //document.getElementById("pushStatusMsg").innerHTML = '<span>You are not subscribed!</span>';
    }
  }

  async unsubscribe() {
    let event = await this.subscription.unsubscribe();
    this.isSubscribed = false;
    console.log("Unsubscribed!", event);
  }
}
