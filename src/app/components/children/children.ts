import { LitElement, html, property, customElement } from "lit-element";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners";
import * as Gestures from "@polymer/polymer/lib/utils/gestures";
import { tween, styler, easing } from "popmotion";

//@ts-ignore
import { interpolate } from "flubber";

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
  IAvailableRewards,
  IAchievements
} from "../../library/interfaces";
import "monster-creator";
import "./circle.scss";
import "./pulse.scss";
import { setTimeout } from "timers";
import { DNS, dev, SetBrowniePoints } from "../global";
import { runInThisContext } from "vm";

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
  private shakePoints: boolean = false;
  private showBonusSquare: boolean = false;
  private showBonusBall: boolean = false;
  private showBonusBall2: boolean = false;
  private bonusSquareClicked: boolean = false;
  private bonusBallClicked: boolean = false;
  private bonusBall2Clicked: boolean = false;
  private showBonusTimeIntro: boolean = false;
  private BonusCountdown: number = 5;
  private achievements: IAchievements[];

  Home() {
    console.log("home");
    this.router.navigate(`welcome`);
  }

  ViewPet(child: BrowniePoints) {
    console.log("display pet " + child.childName);
    SetBrowniePoints(this.browniePoints);
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

    let nameUpdate = this.saveChildName(child, childName);
    let rewardUpdate = this.SaveReward(child, childreward);

    await Promise.all([nameUpdate, rewardUpdate]);
  }

  async saveChildName(child: BrowniePoints, newName: string) {
    if (dev) {
      child.childName = newName;
      this.editingChildName = false;
      this.editing = false;
    } else {
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
          //this.ConfigureDisplay(data);
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
    }
    this.editingReward = false;
  }

  async SaveReward(child: BrowniePoints, rewardDescription: string) {
    if (dev) {
      child.reward = rewardDescription;
      this.editingReward = false;
      this.editing = false;
    } else {
      try {
        var result = await this.http.fetch(
          `${DNS}/api/Children/EditReward/${child.id}/${rewardDescription}`,
          { method: "put", credentials: "include" }
        );
        if (result.ok) {
          var data = await result.json();
          this.editingReward = false;
          this.editingChildName = false;
          this.editing = false;
          //this.ConfigureDisplay(data);
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
    //this.signedIn = true;
  }

  // public async CheckOnlineOrNot() {
  //   try {
  //     await this.InitialLoad();
  //     console.log("configure display now");
  //     this.ConfigureDisplay(this.browniePoints);
  //     this.offline = false;
  //     this.errorHadOccurred = false;
  //   } catch (err) {
  //     if (err == "TypeError: Failed to fetch") {
  //       console.log("Offline " + err);
  //       this.offline = true;
  //       this.loading = false;
  //     } else {
  //       console.log("Error while adding points " + err);
  //       this.errorHadOccurred = true;
  //       this.errorMessage = err;
  //       this.loading = false;
  //       this.offline = false;
  //     }
  //   }
  // }

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
      //console.log(myimport);
      this.browniePoints = myimport.data;
      this.achievements = myimport.achievements;
      this.currentCount = 3; //myimport.length;
      this.loading = false;
      SetBrowniePoints(this.browniePoints);
    } else {
      var res2 = await this.http.fetch(`${DNS}/api/Children/all`, {
        method: "get",
        credentials: "include"
      });

      if (res2.ok) {
        this.browniePoints = await res2.json();
        SetBrowniePoints(this.browniePoints);
        //console.log("set globalbrownie points");
        //console.log(this.browniePoints);

        this.currentCount = Object.keys(this.browniePoints).length;
      } else {
        this.DisplayError("Unable to retrieve children");
      }
    }
  }

  private async GetAchievementsList() {
    if (dev) {
      let myimport = await import("../devdata/childrendata");
      this.achievements = myimport.achievements;
    } else {
      let result = await this.http.fetch(`${DNS}/api/Achievements/`, {
        method: "get",
        credentials: "include"
      });
      let data = (await result.json()) as IAchievements[];
      this.achievements = data;
    }
  }

  async CheckForSuperSwat(child: BrowniePoints, amount: number) {
    if (!this.achievements) {
      await this.GetAchievementsList();
    }

    // Check for Super Swat completion - TODO
    if (child.pendingAdds >= 300) {
      let achievement = child.achievements.find(
        item => item.achievementID === 1
      );
      achievement.progress = 100;
      child.achievementsTotal = 1;
      console.log("Super Swat achievement earned!");
    }
  }

  public async CheckForMegaPoints(child: BrowniePoints) {
    if (!this.achievements) {
      await this.GetAchievementsList();
    }

    if (child.pendingAdds >= 50) {
      let mega = this.achievements.find(item => item.title === "Mega Points");
      let streak = child.achievements.find(item => item.ID === mega.ID);
      streak.progress = 100;
    }
  }

  public CloseRewards() {
    this.showingAvailableRewards = false;
  }

  public CloseLevelUp() {
    this.levelledUp = false;
  }

  public CloseError() {
    this.errorHadOccurred = false;
  }

  public CheckIfLevelCompleted(child: BrowniePoints) {
    if (child.points >= child.pointsNeeded) {
      this.levelledUp = true;
      ++child.level;
      let excess = child.points - child.pointsNeeded;

      //console.log("leveledup");

      if (dev) {
        child.points = excess;
        let reward: IAvailableRewards = {
          id: 1,
          reward: child.reward,
          used: false,
          beingConsumed: false,
          browniePointsID: child.id
        };
        child.availableRewards.push(reward);
      } else {
        this.http
          .fetch(`${DNS}/api/PointsData/LevelUp/${child.childName}`, {
            method: "Get",
            credentials: "include"
          })
          .then(result => result.json() as Promise<BrowniePoints[]>)
          .then(data => {
            for (var i = 0; i < data.length; i++) {
              if (data[i].id === child.id) {
                //console.log(`updating ${data[i].childName}`);
                child.points = excess;
                child.availableRewards = data[i].availableRewards;
              }
            }
          });
      }
    }
  }

  public DisplayWaitingIcon() {
    this.loading = true;
  }

  public HideWaitingIcon() {
    this.loading = false;
  }

  public ViewAvailableRewards() {
    this.showingAvailableRewards = !this.showingAvailableRewards;
  }

  public ViewAchievements(child: BrowniePoints) {
    this.router.navigate(`achievements/${child.id}`);
  }

  // private ConfigureDisplay(data: BrowniePoints[]) {
  //   //console.log(this.index);
  //   //this.browniePoints = data;
  //   //this.currentCount = Object.keys(this.browniePoints).length;
  //   // this.currentChildPresenting = this.browniePoints[this.index];
  //   // this.showingChild = this.currentChildPresenting.childName;
  //   // this.currentChildPresenting.presenting = true;
  //   // this.showChildData = true;
  //   this.HideWaitingIcon();
  // }

  Use(availableReward: IAvailableRewards, child) {
    //console.log("use");
    availableReward.beingConsumed = true;
    for (var i = 0; i < child.availableRewards.length; i++) {
     // console.log(`checking ${i}`);
      if (child.availableRewards[i].id === availableReward.id) {
        child.availableRewards.splice(i, 1);
       // console.log(`removed ${i}`);
      }

      if (child.availableRewards.length == 0) {
        this.showingAvailableRewards = false;
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

  public async AddBonusPointBall(child: BrowniePoints, amount: number) {
    this.bonusBallClicked = true;
    console.log("test");
    this.combineAdds(child, amount);
    this.showBonusBall = false;
  }
  public async AddBonusPointBall2(child: BrowniePoints, amount: number) {
    this.bonusBall2Clicked = true;
    console.log("bonus ball2 clicked");
    this.combineAdds(child, amount);
    this.showBonusBall2 = false;
  }
  public async AddBonusPointSquare(child: BrowniePoints, amount: number) {
    this.bonusSquareClicked = true;
    console.log("test");
    this.combineAdds(child, amount);
    this.showBonusSquare = false;
  }

  private ShakeyPoints() {
    console.log("do the shakey thing!");
    this.shakePoints = true;
    setTimeout(() => {
      this.shakePoints = false;
    }, 2000);
  }

  private showBonusTime(child: BrowniePoints) {
    if (
      !this.showBonusTimeIntro &&
      !(this.showBonusBall || this.showBonusSquare || this.showBonusBall2) &&
      child.pendingAdds >= 20 &&
      Math.floor(Math.random() * 100 + 1) > 98
    ) {
      this.showBonusTimeIntro = true;
      let countdown = setInterval(() => {
        console.log("decrement timer");
        this.BonusCountdown--;
        if (this.BonusCountdown === 0) {
          console.log("clearing timer");
          clearInterval(countdown);
          this.BonusCountdown = 5;
          this.showBonusTimeIntro = false;
        }
      }, 1000);

      if (
        !(this.showBonusBall || this.showBonusSquare || this.showBonusBall2)
      ) {
        console.log("show ball and square");
        this.showBonusBall = true;
        this.showBonusSquare = true;
        this.showBonusBall2 = true;

        setTimeout(() => {
          this.showBonusBall = false;
          this.showBonusSquare = false;
          this.showBonusBall2 = false;
        }, 11000);
      }
    }
  }

  public combineAdds(child: BrowniePoints, amount: number) {
    if (amount < 0 && child.points + amount < 0) {
      console.log("Would be less than zero!");
      return;
    }

    this.ShakeyPoints();
    this.showBonusTime(child);

    this.syncPending = true;

    child.points += amount;
    console.log("child points " + child.points);

    this.CheckIfLevelCompleted(child);
    this.CheckForMegaPoints(child);
    this.CheckForSuperSwat(child, amount);

    if (child.pendingAdds === 0) {
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
    if (dev) {
      return Promise.resolve();
    }

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
