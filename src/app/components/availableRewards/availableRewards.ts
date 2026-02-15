import { resolve } from '@aurelia/kernel';
import { IRouter } from '@aurelia/router-lite';
import {
  SignedIn,
  BrowniePoints,
  IAvailableRewards
} from "../../library/interfaces";
import { GetAccessToken, token, ConfigureClient } from "../global.ts";
import { isAuthenticated } from "../global";

export class AvailableRewards {
  public currentCount: number = 0;
  public showingChild: string;
  public currentChildPresenting: BrowniePoints;
  public showChildData: boolean = false;
  public browniePoints: Array<BrowniePoints>;
  public currentReward: string;
  public isLoading: boolean = true;
  private router = resolve(IRouter);
  public signedIn: boolean = false;
  public signedInAs: string;

  public loading(params: any, routeData: any) {
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
    this.router.load(child);
  }

  public DetermineReward() {
    if (this.currentChildPresenting.reward != undefined) {
      this.currentReward = this.currentChildPresenting.reward;
    } else {
      this.currentReward = "Time to add a reward for this level!";
    }
  }

  constructor() {
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
              this.isLoading = false;
            });
        });
      }
    });
  }
}
