import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { SignedIn, BrowniePoints, IAvailableRewards } from '../../library/interfaces';


@inject(HttpClient, Router)
export class AvailableRewards {
    public currentCount: number = 0;
    public showingChild: string;
    public currentChildPresenting: BrowniePoints;
    public showChildData: boolean = false;
    public browniePoints: Array<BrowniePoints>;
    public currentReward: string;
    public http: HttpClient;
    public loading: boolean = true;
    public router: Router;
    public signedIn: boolean = false;
    public signedInAs: string;


    public activate(params: any, routeData: any) {
        console.log(routeData.name)

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

    //MoveLeft(index: number) {
    //    console.log(index)
    //    console.log(this.browniePoints[index - 1]);
    //    if (index - 1 >= 0) {
    //        if (this.currentChildPresenting) {
    //            this.currentChildPresenting.presenting = false;
    //        }
    //        this.currentChildPresenting = this.browniePoints[index - 1];
    //        this.showingChild = this.browniePoints[index - 1].childName;
    //        this.currentChildPresenting.presenting = true;
    //        this.showChildData = true;
    //        this.DetermineReward();
    //        //this.currentReward = this.currentChildPresenting.rewards[this.currentChildPresenting.level - 1].reward;
    //    }
    //    else
    //        console.log('out of range left')
    //}
    

    //MoveRight(index:number) {
    //console.log(this.browniePoints[index + 1]);
    //if (index + 1 < Object.keys(this.browniePoints).length) {
    //    if (this.currentChildPresenting) {
    //        this.currentChildPresenting.presenting = false;
    //    }
    //    this.currentChildPresenting = this.browniePoints[index + 1];
    //    this.showingChild = this.browniePoints[index + 1].childName;
    //    this.currentChildPresenting.presenting = true;
    //    this.showChildData = true;
    //    this.DetermineReward();
    //    //this.currentReward = this.currentChildPresenting.rewards[this.currentChildPresenting.level - 1].reward;
    //}
    //else
    //    console.log('out of range right')
    //}

    BackToBrowse(child: string) {
        this.router.navigate(child);
    }

    public DetermineReward() {
        if (this.currentChildPresenting.reward != undefined) {
            this.currentReward = this.currentChildPresenting.reward;
        }
        else {
            this.currentReward = 'Time to add a reward for this level!';
        }
    }
   
    //Use(availableReward: IAvailableRewards) {
    //    console.log(availableReward)
    //    console.log(availableReward.id)
    //    this.http.fetch(`api/AvailableRewards/SetRewardToUsed/${availableReward.id}`, { method: 'put', credentials: 'same-origin' })
    //        .then(result => result.json() as Promise<BrowniePoints[]>)
    //        .then(data => {
    //            this.browniePoints = data;
    //            this.currentCount = Object.keys(this.browniePoints).length;
    //            console.log(data);
    //            this.loading = false;
    //        });
    //}


    constructor(http: HttpClient, Router: Router) {
        this.http = http;
        this.router = Router;

        http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })
            .then(result => result.json() as Promise<SignedIn>)
            .then(data => {
                console.log('sign in info ' + data);
                this.signedIn = data.signedIn;
                this.signedInAs = data.signedInAs;
            });


        http.fetch('api/Children/', { method: 'get', credentials: 'same-origin' })
            .then(result => result.json() as Promise<BrowniePoints[]>)
            .then(data => {
                this.browniePoints = data;
                this.currentCount = Object.keys(this.browniePoints).length;
                console.log(data);
                this.loading = false;
            });
    }





}


