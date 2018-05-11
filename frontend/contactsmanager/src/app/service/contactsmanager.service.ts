import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Contact } from '../pojo/Contact';

@Injectable()
export class ContactsManager {

    options: RequestOptions = new RequestOptions();
    baseUrl: string = "http://localhost:8080/api";
    contact: Contact;
    constructor(private _http: Http) { }

    //retrieve all the contacts existing in DB
    getAllContacts() {
        this.options.withCredentials = true;
        return this._http.get(this.baseUrl + '/contacts', this.options)
            .map((response: Response) => {
                //console.log(response);
                return response.json();
            });
    }

    addContact(firstName, lastName, contactNumber, email){
        this.options.withCredentials = true;
        this.contact = new Contact(firstName, lastName, contactNumber, email);
        console.log(this.contact.contactNumber);
        return this._http.post(this.baseUrl+'/contacts', this.contact, this.options)
        .map((response: Response) => {
            //console.log(response);
            return response.json();
        })
    }

    getContactById(id){
        this.options.withCredentials = true;
        return this._http.get(this.baseUrl+'/contacts/'+id, this.options)
        .map((response: Response) => {
            // console.log("inside get contact by id method");
            // console.log(response);
            return response.json();
        })
    }

    updateContact(contactId, contact){
        this.options.withCredentials = true;
        //console.log(contact.id);
        return this._http.put(this.baseUrl+'/contacts/'+ contactId, contact, this.options)
        .map((response: Response) => {            
            return response.json();
        })
    }

    deleteContact(contactId){
        this.options.withCredentials = true;
        //console.log(contact.id);
        return this._http.delete(this.baseUrl+'/contacts/'+ contactId,  this.options)
        .map((response: Response) => { 
            //console.log(response);           
            return response;
        })
    }


}