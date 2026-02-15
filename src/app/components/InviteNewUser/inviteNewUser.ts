import { IHttpClient } from '@aurelia/fetch-client';
import { IRouter } from '@aurelia/router-lite';
import { resolve } from '@aurelia/kernel';
import { SignedIn } from '../../library/interfaces';

export class InviteNewUser {
    private http = resolve(IHttpClient);
    public loading: boolean = true;
    private router = resolve(IRouter);
    public signedIn: boolean = false;
    public signedInAs: string;

    constructor() {
        this.http.fetch('/Account/AmISignedIn', { method: 'get', credentials: 'same-origin' })
            .then(result => result.json() as Promise<SignedIn>)
            .then(data => {
                console.log(data);
                this.signedIn = data.signedIn;
                this.signedInAs = data.signedInAs;
            });
    }

}


