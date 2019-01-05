import { HttpClient } from "aurelia-fetch-client";
import { inject, child } from "aurelia-framework";
import { Router } from "aurelia-router";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-button";
import { CssAnimator } from "aurelia-animator-css";
import {
  SignedIn,
  BrowniePoints,
  IAvailableRewards
} from "../../library/interfaces";
import "monster-creator";
import "./circle.scss";
import "./pulse.scss";
import { setTimeout } from "timers";
import { DNS, dev } from "../debug";

@inject(HttpClient, Router)
export class Home {
  public editingAvatar: boolean = false;
  public currentCount: number = 0;
  public showingChild: string;
  public currentChildPresenting: BrowniePoints;
  public showChildData: boolean = false;
  public browniePoints: Array<BrowniePoints>;
  public currentReward: string;
  public http: HttpClient;
  public levelledUp: boolean = false;
  public loading: boolean = true;
  public router: Router;
  public signedIn: boolean = false;
  public signedInAs: string;
  public errorMessage: string;
  public errorHadOccurred: boolean = false;
  public showingAvailableRewards: boolean = false;
  public index: number;
  public editingReward: boolean = false;
  public editingChildName: boolean = false;
  public editing: boolean = false;
  public numberOfAvailableRewards: number = 0;
  public syncPending: boolean = false;
  public offline: boolean = false;
  public usingRewardInProgress: boolean = false;

  Home() {
    console.log("home");
    // this.router.navigate("/welcome");
    this.router.navigate(`welcome/childrenpage`);
  }

  ViewPet(child: BrowniePoints) {
    console.log("display pet " + child.childName);
    this.router.navigate(`pet/${child.id}`);
  }

  EditAvatar(child: BrowniePoints) {
    console.log("edit avatar");
    this.editingAvatar = true;
  }

  async selectAvatar(event: any, child: BrowniePoints) {
    let img = event.srcElement.src.split("/");
    img = img[img.length - 1];
    console.log(img);
    var result = await this.http.fetch(
      `${DNS}/api/Avatar/${child.childName}/${img}`,
      {
        method: "put",
        credentials: "include"
      }
    );
    var data = await result.json();
    child.avatar = img;
    this.editingAvatar = false;
  }

  EditReward() {
    this.editingReward = true;
  }

  editChildName() {
    this.editingChildName = true;
  }

  EditMode() {
    this.EditReward();
    this.editChildName();
    this.editing = true;
  }

  IfEnterKeySaveChanges(
    $event: any,
    child: BrowniePoints,
    childName: string,
    childreward: string
  ) {
    if ($event.key == "Enter") {
      this.SaveChanges(child, childName, childreward);
      console.log($event);
    }
    console.log($event);
    return true;
  }

  async SaveChanges(
    child: BrowniePoints,
    childName: string,
    childreward: string
  ) {
    console.log("save changes");
    this.editing = false;
    this.editingChildName = false;
    this.editingReward = false;

    await this.saveChildName(child, childName);
    await this.SaveReward(child, childreward);
  }

  async saveChildName(child: BrowniePoints, newName: string) {
    try {
      console.log("saveChildName");
      var result = await this.http.fetch(
        `${DNS}/api/Children/EditChildName/${child.id}/${newName}`,
        { method: "put", credentials: "include" }
      );
      if (result.ok) {
        var data = await result.json();
        this.editingChildName = false;
        this.editingReward = false;
        this.editing = false;
        this.ConfigureDisplay(data);
      } else {
        this.DisplayError(
          "Failed to update childName - notFound returned from server"
        );
      }
    } catch (err) {
      this.editingChildName = false;
      this.editingReward = false;
      this.editing = false;
      this.DisplayError(err);
    }
    this.editingReward = false;
  }

  async SaveReward(child: BrowniePoints, rewardDescription: string) {
    try {
      var result = await this.http.fetch(
        `${DNS}/api/Children/EditReward/${
          child.childName
        }/${rewardDescription}`,
        { method: "put", credentials: "include" }
      );
      if (result.ok) {
        var data = await result.json();
        this.editingReward = false;
        this.editingChildName = false;
        this.editing = false;
        this.ConfigureDisplay(data);
      } else {
        this.DisplayError(
          "Failed to update reward - notFound returned from server"
        );
      }
    } catch (err) {
      this.editingChildName = false;
      this.editingReward = false;
      this.editing = false;
      this.DisplayError(err);
    }
    this.editingReward = false;
  }

  // selectChild(child: BrowniePoints) {
  //   if (this.currentChildPresenting) {
  //     this.currentChildPresenting.presenting = false;
  //   }
  //   this.currentChildPresenting = child;
  //   this.showingChild = child.childName;
  //   this.currentChildPresenting.presenting = true;
  //   this.showChildData = true;
  //   for (var i = 0; i < Object.keys(this.browniePoints).length; i++) {
  //     if (
  //       this.browniePoints[i].childName == this.currentChildPresenting.childName
  //     ) {
  //       this.index = i;
  //       break;
  //     }
  //   }
  // }

  // MoveLeft(index: number) {
  //   console.log(index);
  //   console.log(this.browniePoints[index - 1]);
  //   if (index - 1 >= 0) {
  //     if (this.currentChildPresenting) {
  //       this.currentChildPresenting.removeForAnimation = true;
  //       setTimeout(() => {
  //         this.currentChildPresenting.presenting = false;
  //       }, 1000);
  //     }
  //     setTimeout(() => {
  //       this.currentChildPresenting = this.browniePoints[index - 1];
  //       this.showingChild = this.browniePoints[index - 1].childName;
  //       this.currentChildPresenting.presenting = true;
  //       this.currentChildPresenting.removeForAnimation = false;
  //       this.showChildData = true;
  //       this.index = index - 1;
  //     }, 1000);
  //   } else console.log("out of range left");
  // }

  // MoveRight(index: number) {
  //   console.log(this.browniePoints[index + 1]);
  //   if (index + 1 < Object.keys(this.browniePoints).length) {
  //     if (this.currentChildPresenting) {
  //       this.currentChildPresenting.removeForAnimation = true;
  //       setTimeout(() => {
  //         this.currentChildPresenting.presenting = false;
  //       }, 1000);
  //     }

  //     setTimeout(() => {
  //       this.currentChildPresenting = this.browniePoints[index + 1];
  //       this.showingChild = this.browniePoints[index + 1].childName;
  //       this.currentChildPresenting.presenting = true;
  //       this.currentChildPresenting.removeForAnimation = false;
  //       this.showChildData = true;
  //       this.index = index + 1;
  //     }, 1000);
  //   } else console.log("out of range right");
  // }

  // BackToBrowse(child: string) {
  //   this.router.navigate(child);
  // }

  constructor(http: any, Router: Router) {
    this.http = http;
    this.router = Router;

    this.InitialLoad()
      .then(() => {
        console.log("finished constructor");
        this.loading = false;
      })
      .catch(err => {
        if (err == "TypeError: Failed to fetch") {
          console.log("Offline " + err);
          this.offline = true;
          this.loading = false;
        } else {
          console.log("Some error " + err);
          this.errorHadOccurred = true;
          this.errorMessage = err;
          this.loading = false;
          this.offline = false;
        }
      });
  }

  public async AmISignedIn() {
    // var result = await this.http.fetch(`${DNS}/Account/AmISignedIn`, {
    //   method: "get",
    //   credentials: "same-origin"
    // });
    // if (result.ok) {
    //   var data = await result.json();
    //   this.signedIn = data.signedIn;
    //   this.signedInAs = data.signedInAs;
    // }
    this.signedIn = true;
  }

  public async CheckOnlineOrNot() {
    try {
      await this.InitialLoad();
      console.log("configure display now");
      this.ConfigureDisplay(this.browniePoints);
      this.offline = false;
      this.errorHadOccurred = false;
    } catch (err) {
      if (err == "TypeError: Failed to fetch") {
        console.log("Offline " + err);
        this.offline = true;
        this.loading = false;
      } else {
        console.log("Error while adding points " + err);
        this.errorHadOccurred = true;
        this.errorMessage = err;
        this.loading = false;
        this.offline = false;
      }
    }
  }

  public async InitialLoad() {
    let res1;

    if (!dev) {
      // res1 = await this.http.fetch(`${DNS}/Account/AmISignedIn`, {
      //   method: "get",
      //   credentials: "same-origin"
      // });
      // data = await res1.json();
    }

    // if (dev || res1.ok) {
    //   console.log("sign in info " + data);
    //   //this.signedIn = dev || data.signedIn;
    //   //this.signedInAs = dev || data.signedInAs;
    // } else {
    //   console.log(
    //     "The [AmIlogged] in call failed - just assume not logged in here!"
    //   );
    //   this.DisplayError("Failed to check the login status");
    // }

    if (dev) {
      let myimport = await import("../devdata/childrendata");
      console.log(myimport);
      this.browniePoints = myimport.data;
      this.currentCount = 3; //myimport.length;
    } else {
      var res2 = await this.http.fetch(`${DNS}/api/Children/all`, {
        method: "get",
        credentials: "include"
      });

      if (res2.ok) {
        this.browniePoints = await res2.json();
        this.currentCount = Object.keys(this.browniePoints).length;
      } else {
        this.DisplayError("Unable to retrieve children");
      }
    }
  }

  public CloseLevelUp() {
    this.levelledUp = false;
  }

  public CloseError() {
    this.errorHadOccurred = false;
  }

  public CheckIfLevelCompleted(child) {
    if (child.points >= child.pointsNeeded) {
      this.levelledUp = true;
      let excess = child.points - child.pointsNeeded;

      console.log("leveledup");

      this.http
        .fetch(`${DNS}/api/PointsData/LevelUp/${child.childName}`, {
          method: "Get",
          credentials: "include"
        })
        .then(result => result.json() as Promise<BrowniePoints[]>)
        .then(data => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].id === child.id) {
              console.log(`updating ${data[i].childName}`);
              child.points = excess;
              child.availableRewards = data[i].availableRewards;
            }
          }
        });
    }
  }

  public DisplayWaitingIcon() {
    this.loading = true;
  }

  public HideWaitingIcon() {
    this.loading = false;
  }

  public ViewAvailableRewards() {
    console.log("show rewards");
    this.showingAvailableRewards = true;
  }

  private ConfigureDisplay(data: BrowniePoints[]) {
    //console.log(this.index);
    this.browniePoints = data;
    //this.currentCount = Object.keys(this.browniePoints).length;
    // this.currentChildPresenting = this.browniePoints[this.index];
    // this.showingChild = this.currentChildPresenting.childName;
    // this.currentChildPresenting.presenting = true;
    // this.showChildData = true;
    this.HideWaitingIcon();
  }

  Use(availableReward: IAvailableRewards, child) {
    console.log("use");
    availableReward.beingConsumed = true;
    for (var i = 0; i < child.availableRewards.length; i++) {
      console.log(`checking ${i}`);
      if (child.availableRewards[i].id === availableReward.id) {
        child.availableRewards.splice(i, 1);
        console.log(`removed ${i}`);
      }
    }
    this.http
      .fetch(
        `${DNS}/api/AvailableRewards/SetRewardToUsed/${availableReward.id}`,
        {
          method: "put",
          credentials: "include"
        }
      )
      .then(result => result.json() as Promise<BrowniePoints[]>)
      .then(data => {
        console.log(data);
      });
  }

  public ViewPoints() {
    this.showingAvailableRewards = false;
  }

  public async incrementCounter(child: BrowniePoints) {
    this.combineAdds(child, 1);
  }

  public async DeductCounter(child: BrowniePoints) {
    this.combineAdds(child, -1);
  }

  public async incrementCounterExtra(child: BrowniePoints) {
    this.combineAdds(child, 10);
  }

  public combineAdds(child: BrowniePoints, amount: number) {
    if (amount < 0 && child.points + amount < 0) {
      console.log("Would be less than zero!");
      return;
    }

    this.syncPending = true;

    child.points += amount;
    console.log("child points " + child.points);

    this.CheckIfLevelCompleted(child);

    if (child.pendingAdds == 0) {
      console.log("starting timer");
      setTimeout(() => {
        console.log(
          "making call to server to update with points " + child.pendingAdds
        );
        // perform the add now
        this.incrementCounterInternal(child, child.pendingAdds);
        child.pendingAdds = 0;
        this.syncPending = false;
      }, 5000);
    }

    console.log("child pending " + child.pendingAdds);
    child.pendingAdds += amount;
  }

  public async incrementCounterInternal(child: BrowniePoints, amount: number) {
    try {
      //this.DisplayWaitingIcon();

      //// If the phone has Background Sync then let's use that
      //var swReg = await navigator.serviceWorker.ready
      //let UpdateScoreData = { child: child.childName, amount: amount, event: 'ScoreUpdate' }
      //let UpdateScoreDataString = JSON.stringify(UpdateScoreData)

      //swReg.sync.register(UpdateScoreDataString);

      var result = await this.http.fetch(
        `${DNS}/api/PointsData/AddBrowniePointExtra/${
          child.childName
        }/${amount}`,
        { method: "Get", credentials: "include" }
      );
      if (result.ok) {
        //this.ConfigureDisplay(data);
      } else {
        this.DisplayError("Error adding points! " + result.status);
      }
    } catch (err) {
      this.HideWaitingIcon();
      child.points -= amount;

      if (err == "TypeError: Failed to fetch") {
        console.log("Offline " + err);
        this.offline = true;
        this.loading = false;
      } else {
        console.log("Error while adding points " + err);
        this.errorHadOccurred = true;
        this.errorMessage = err;
        this.loading = false;
      }
    }
  }

  public DisplayError(msg: string) {
    this.HideWaitingIcon();
    this.errorMessage = msg;
    this.errorHadOccurred = true;
    console.log(msg);
  }
}
