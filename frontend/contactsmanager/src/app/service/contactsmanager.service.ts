import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ContactsManager {

    options: RequestOptions = new RequestOptions();
    baseUrl: string = "http://localhost:8080/api";
    constructor(private _http: Http) { }

    //retrieve all the contacts existing in DB
    getAllContacts() {
        this.options.withCredentials = true;
        return this._http.get(this.baseUrl + '/contacts', this.options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

}