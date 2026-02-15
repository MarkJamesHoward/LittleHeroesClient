import { resolve } from '@aurelia/kernel';
import { IHttpClient } from '@aurelia/fetch-client';
import { Parent, BrowniePoints } from '../../library/interfaces'

export class Avatar {
    private http = resolve(IHttpClient);
    children: BrowniePoints;

    async selectAvatar(event: any, childName: string) {
        let img = event.srcElement.src.split('/');
        img = img[img.length - 1];
        //console.log(img)
        var result = await this.http.fetch(`api/Avatar/${childName}/${img}`, { method: 'put', credentials: 'same-origin' })
        var data = await result.json();
        this.children = data;
    }

    async GetChildren() {
        var result = await this.http.fetch('api/Children', { method: 'get', credentials: 'same-origin' });
        var data = await result.json();
        this.children = data;
    }

    constructor() {
        this.GetChildren();
    }
}
