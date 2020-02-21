import {
  BrowniePoints,
  ISuperSwat,
  IAchievementsPlusSuperSwatDays
} from "../../library/interfaces";
import { IAchievements, IMyAchievements } from "../../library/interfaces";
import "@polymer/paper-progress/paper-progress.js";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { HttpClient } from "aurelia-fetch-client";
import {
  DNS,
  dev,
  GetBrowniePoints,
  SetBrowniePoints,
  GetAccessToken,
  token,
  ConfigureClient,
  isAuthenticated
} from "../global";
import { data } from "../devdata/childrendata";
import "@polymer/paper-button";
import * as moment from "moment";

@inject(Router, HttpClient)
export class Achievements {
  achievements: Array<IAchievementsPlusSuperSwatDays>;
  router: Router;
  http: HttpClient;
  browniePoints: Array<BrowniePoints>;
  child: BrowniePoints;
  TotalAchievementCount: number;
  scrollPos: number = 0;
  errorHadOccurred: boolean;
  errorMessage: string;
  DisplayDaysSoFar: string = "";

  IsDateSet(date: string): boolean {
    if (date === null) {
      return false;
    }

    let now = moment(date);
    if (moment(date).isBefore("2010-01-01")) {
      return false;
    } else return true;
  }

  GetDayName(date: string): string {
    let dt = moment(date);
    return dt.format("dddd");
  }

  async CheckForSuperSwat(child: BrowniePoints) {
    let data2: ISuperSwat;
    let days: string = "";

    console.log("making call to get super swat days so far achieved");
    try {
      let result2 = await this.http.fetch(
        `${DNS}/api/Achievements/GetSuperSwatAddDaySuccess/${child.id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (result2.ok) {
        data2 = (await result2.json()) as ISuperSwat;
        console.log(data2);
      } else {
        this.errorHadOccurred = true;
        this.errorMessage = "Failed to retrieve SuperSwat progress from server";
      }
    } catch (e) {
      this.errorHadOccurred = true;
      this.errorMessage = e;
      return;
    }

    if (this.IsDateSet(data2.day1Date)) {
      days += this.GetDayName(data2.day1Date);
    }

    if (this.IsDateSet(data2.day2Date)) {
      days += ", " + this.GetDayName(data2.day2Date);
    }

    if (this.IsDateSet(data2.day3Date)) {
      days += ", " + this.GetDayName(data2.day3Date);
    }

    if (this.IsDateSet(data2.day4Date)) {
      days += ", " + this.GetDayName(data2.day4Date);
    }

    return days;
  }

  Back() {
    this.router.navigate(`/children/0/${this.scrollPos}`);
  }

  async activate(params: any) {
    this.scrollPos = params.scrollPos;

    console.log(`loading achievements for ${params.id}`);
    if (dev) {
      this.browniePoints = data;
      SetBrowniePoints(this.browniePoints);
    }
    this.browniePoints = GetBrowniePoints();

    if (!this.browniePoints) {
      let result = await this.http.fetch(`${DNS}/api/Children/all`, {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (result.ok) {
        this.browniePoints = await result.json();
        SetBrowniePoints(this.browniePoints);
      } else {
        console.log("Unable to retrieve children");
      }
    }

    this.child = this.browniePoints.find(item => item.id == params.id);

    if (this.achievements) {
      this.UpdateScreen();
    }
    console.log(`child achievements ${this.child.achievementsTotal}`);
  }

  UpdateScreen() {
    this.child.achievementsTotal = 0;

    if (this.child.myAchievements) {
      for (let i = 0; i < this.achievements.length; i++) {
        let achieve = this.child.myAchievements.find(
          //@ts-ignore
          item => item.achievementsID === this.achievements[i].id
        );
        if (achieve) {
          console.log(this.achievements[i].title);
          if (this.achievements[i].title === "Super Swat") {
            console.log("setting progress for super swat");
            this.CheckForSuperSwat(this.child).then(res => {
              this.achievements[i].days = res;
            });
          } else {
            console.log("setting progress " + achieve.progress);
          }
          this.achievements[i].progress = achieve.progress;

          if (this.achievements[i].progress === 100) {
            this.child.achievementsTotal++;
          }
        }
      }
    }
  }

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;

    ConfigureClient().then(() => {
      console.log("configured client");
      if (isAuthenticated) {
        GetAccessToken().then(() => {
          console.log("received access token");
          if (dev) {
            import("../devdata/childrendata").then(devdata => {
              //@ts-ignore
              this.achievements = devdata.achievements;
              this.TotalAchievementCount = 0;
              if (this.achievements) {
                this.TotalAchievementCount = this.achievements.length || 0;
              }

              console.log("using dev test data for achievements");
            });
          } else {
            console.log("making API call");
            this.http
              .fetch(`${DNS}/api/Achievements/`, {
                method: "get",
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .then(result => result.json() as Promise<IAchievements[]>)
              .then(data => {
                console.log("Got achievements list" + data);
                console.log(data);
                //@ts-ignore
                this.achievements = data;

                this.TotalAchievementCount = 0;
                if (this.achievements) {
                  this.TotalAchievementCount = this.achievements.length || 0;
                }

                if (this.child) {
                  this.UpdateScreen();
                }
              });
          }
        });
      }
    });
  }
}
