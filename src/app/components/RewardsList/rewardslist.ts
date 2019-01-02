import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

export interface Parent {
    ID: number,
    email: string,
    firstName: string,
    surname: string
}

export interface Rewards {
    id: number;
    level: number;
    reward: string;
    editing: boolean;
}

export interface BrowniePoints {
    id: number;
    childName: string;
    points: number;
    level: number;
    pointsNeeded: number;
    rewards: Array<Rewards>;
    presenting: boolean;
}

@inject(Router, HttpClient)
export class RewardsList {
    router: Router;
    http: HttpClient;
    browniePoints: Array<BrowniePoints> = [];
    rewards: Rewards;
    addingRewardActivated: Array<boolean> = [];
    rewardTextBoxState: Array<string> = [];
    test: string;

    constructor(router: Router, http: HttpClient) {
        this.router = router;
        this.http = http;

        console.log('calling rewards get')
        this.http.fetch('api/Children', { method: 'get', credentials: 'same-origin' })
            .then(result => result.json() as Promise<BrowniePoints[]>)
            .then(data => {
                this.browniePoints = data;
                console.log('Got rewards for all children');
                for (var outer = 0; outer < Object.keys(data).length; outer++) {
                    console.log('adding hide')
                    this.addingRewardActivated.splice(outer, 1, false);
                }
            });
    }

    ActivateAddRewards(index: number) {
        console.log(index)
        this.addingRewardActivated.splice(index, 1, true);
        //this.addingRewardActivated[index] = true;
        console.log(this.addingRewardActivated)
    }

    EditReward(reward: Rewards)
    {
        console.log('reward text box index ' + reward);
        //Enable the associated text box for this reward
        reward.editing = true;
        console.log(reward.editing)
    }

    SaveReward(reward: Rewards) {
        console.log('reward text box index ' + reward);
        //Enable the associated text box for this reward
        reward.editing = true;

        this.http.fetch(`api/Rewards/${reward.id}/${reward.reward}`, { method: 'put', credentials: 'same-origin' })
            .then(result => result.json() as Promise<Rewards>)
            .then(data => {
                console.log('reward removed ' + data);
            });

        console.log(reward.editing)
    }


    RemoveReward(reward: Rewards) {
        console.log('removing reward ' + reward.id)
        this.http.fetch(`api/Rewards/${reward.id}`, { method: 'delete', credentials: 'same-origin' })
            .then(result => result.json() as Promise<Rewards>)
            .then(data => {
                console.log('reward removed ' + data);
            });
    }

    AddReward(child: BrowniePoints) {
        console.log(`adding reward ${this.test} id = ${child.id}`);
        this.http.fetch(`api/Rewards/${this.test}/${child.id}`, { method: 'post', credentials: 'same-origin' })
            .then(result => result.json() as Promise<Rewards>)
            .then(data => {
                console.log('reward added ' + data);
            });
    }

   
}
