import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { SignedIn } from '../../library/interfaces';

@inject(HttpClient, Router)
export class InviteNewUser {
    public http: HttpClient;
    public loading: boolean = true;
    public router: Router;
    public signedIn: boolean = false;
    public signedInAs: string;

    constructor(http: HttpClient, router: Router) {
        this.http = http;
        this.router = router;
        http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })
            .then(result => result.json() as Promise<SignedIn>)
            .then(data => {
                console.log(data);
                this.signedIn = data.signedIn;
                this.signedInAs = data.signedInAs;
            });
    }
    
}


