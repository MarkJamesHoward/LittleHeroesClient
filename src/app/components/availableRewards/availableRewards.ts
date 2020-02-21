import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import {
  SignedIn,
  BrowniePoints,
  IAvailableRewards
} from "../../library/interfaces";
import { GetAccessToken, token, ConfigureClient } from "../global.ts";
import { isAuthenticated } from "../global";

@inject(Router)
export class AvailableRewards {
  public currentCount: number = 0;
  public showingChild: string;
  public currentChildPresenting: BrowniePoints;
  public showChildData: boolean = false;
  public browniePoints: Array<BrowniePoints>;
  public currentReward: string;
  public loading: boolean = true;
  public router: Router;
  public signedIn: boolean = false;
  public signedInAs: string;

  public activate(params: any, routeData: any) {
    console.log(routeData.name);

    //Pick this child as the active display
  }

  selectChild(child: BrowniePoints) {
    if (this.currentChildPresenting) {
      this.currentChildPresenting.presenting = false;
    }
    this.currentChildPresenting = child;
    this.showingChild = child.childName;
    this.currentChildPresenting.presenting = true;
    this.showChildData = true;
  }

  BackToBrowse(child: string) {
    this.router.navigate(child);
  }

  public DetermineReward() {
    if (this.currentChildPresenting.reward != undefined) {
      this.currentReward = this.currentChildPresenting.reward;
    } else {
      this.currentReward = "Time to add a reward for this level!";
    }
  }

  constructor(Router: Router) {
    this.router = Router;

    ConfigureClient().then(() => {
      console.log("completed Auth0 configure client");
      if (isAuthenticated) {
        GetAccessToken().then(() => {
          console.log("received access token");

          fetch("api/Children/", {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(result => result.json() as Promise<BrowniePoints[]>)
            .then(data => {
              this.browniePoints = data;
              this.currentCount = Object.keys(this.browniePoints).length;
              console.log(data);
              this.loading = false;
            });
        });
      }
    });
  }
}
