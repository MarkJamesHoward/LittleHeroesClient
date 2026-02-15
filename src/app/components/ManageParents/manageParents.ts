import { resolve } from '@aurelia/kernel';
import { IHttpClient } from '@aurelia/fetch-client';
import { Parent, BrowniePoints } from '../../library/interfaces';


export class ManageParents {
    private http = resolve(IHttpClient);
    parent: Parent;
    registeredKids: Array<BrowniePoints>;
    addingChildActivated: boolean = false;
    public groupMembers: Array<Parent>;
    public loading: boolean = true;
    public newUserInviteEmailAddress: string;
    InviteSentSuccessfully: boolean = false;
    InviteFailed: boolean = false;
    public inviteNewParentActive: boolean = false;
    displayError: boolean = false;
    errorMessage: string;

    InitiateNewParent() {
        this.inviteNewParentActive = true;
    }


    public Cancel() {
        this.inviteNewParentActive = false;
    }

    async SendInvite() {

        try {
            var result = await this.http.fetch(`/Manage/SendInvite/${this.newUserInviteEmailAddress}`,
                {
                    method: 'post',
                    credentials: 'same-origin'
                });
            if (result.ok) {
                var data = result.json();
                this.InviteSentSuccessfully = true;
            }
            else {
                this.InviteFailed = true;
                this.errorMessage = "Failed to add child " + result.statusText;
                this.displayError = true;
            }
        }
        catch (e) {
            this.errorMessage = "Failed to add child " + e;
            this.displayError = true;
        }
    }

    public async GetGroupDetails() {

        try {
            var result = await this.http.fetch('api/Group', { method: 'get', credentials: 'same-origin' })
            if (result.ok) {
                var data = await result.json()
                console.log(data);
                this.groupMembers = data;
                this.loading = false;
            }
            else {
                this.loading = false;
                this.errorMessage = result.statusText;
                this.displayError = true;
            }
        }
        catch (e) {
            this.loading = false;
            this.errorMessage = e;
            this.displayError = true;
        }
    }

    public async RemoveGroupMember(member: Parent) {
        console.log(member);
        var result = await this.http.fetch(`api/Group/RemoveGroupMember/${member.ID}`, { method: 'delete', credentials: 'same-origin' })
        var data = await result.json()
        //console.log(data);
        this.groupMembers = data;

        this.loading = false;
    }

    constructor() {
        //http.fetch('api/Setup/', { method: 'get', credentials: 'same-origin' })
        //    .then(result => result.json() as Promise<Parent>)
        //    .then(data => {
        //        this.parent = data;
        //        console.log(data);
        //    });

        this.GetGroupDetails();
    }


}
