import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactsManager } from '../../service/contactsmanager.service';
import { Contact } from '../../pojo/Contact';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @ViewChild('f') addContact: NgForm;
  constructor(private contactsManagerService: ContactsManager) { }
  id: string;
  errorFlag: boolean;
  errorMsg: string;
  successFlag: boolean;
  successMsg: string;
  exists: boolean = false;
  contacts = [];
  c:Contact;
  ngOnInit() {
    this.getAllContacts();
  }


  addForm() {
    let firstName, lastName, contactNumber, email, contactId;
    firstName = this.addContact.value.firstName;
    lastName = this.addContact.value.lastName;
    contactNumber = this.addContact.value.contactNumber;
    email = this.addContact.value.email;
    contactId = this.addContact.value.id;
    console.log(contactId);
    //get all contacts
    if(!contactId){
    this.contactsManagerService.getAllContacts().subscribe((response) => {
      if (Array.of(response)[0].length == 0) {
        this.contactsManagerService.addContact(firstName, lastName, contactNumber, email)
          .subscribe((response) => {
            this.successFlag = true;
            this.successMsg = "Contact saved successfully.";
            this.getAllContacts();
            setTimeout(() => {
              this.successFlag = false;
              this.successMsg = "";
               //update the array with the newly added code
            }, 2500);
          })
        this.addContact.reset();
      } else {
        //data exists in db check if this particular contact exists or not
        var flag = false;
        for (var i = 0; i < Array.of(response)[0].length; i++) {
          if (Array.of(response)[0][i].contactNumber.indexOf(contactNumber) == -1) {
            flag = true;
          } else {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.contactsManagerService.addContact(firstName, lastName, contactNumber, email)
            .subscribe((response) => {
              this.successFlag = true;
              this.successMsg = "Contact saved successfully.";
              this.getAllContacts(); //update the array with the newly added code
              setTimeout(() => {
                this.successFlag = false;
                this.successMsg = "";
                
              }, 2500);
            })

          this.addContact.reset();
        } else {
          this.exists = true;
          this.errorMsg = "Contact with this number already Exists.";
          setTimeout(() => {
            this.exists = false;
            this.errorMsg = "";
          }, 2500);
          this.addContact.reset();
        }
      }
    })
  }else{
    //update the existing contact
    this.update(firstName, lastName, contactNumber, email, contactId);
  }
  }

  //get all the contacts
  getAllContacts(){
    this.contacts.length = 0;
    this.contactsManagerService.getAllContacts()
    .subscribe((response) => {
      if (Array.of(response)[0].length > 0) {
        for (var i = 0; i < Array.of(response)[0].length; i++) {
          this
            .contacts
            .push(Array.of(response)[0][i]);
        }
        this.errorFlag = false;
        this.errorMsg = "";
      } else {
        this.errorFlag = true;
        this.errorMsg = "No contacts available";
      }
    })
    
  }

  //update a contact
  update(firstName, lastName, contactNumber, email, contactId){
    this.c = new Contact(firstName, lastName, contactNumber, email);
    this.contactsManagerService.updateContact(contactId, this.c)
    .subscribe((response) => {
      if (response) {
        this.successFlag = true;
        this.successMsg = "Successfully updated the details.";
        this.getAllContacts(); //update the array with the newly added code
        setTimeout(() => {
          this.successFlag = false;
          this.successMsg = "";          
        }, 2500);
        this.addContact.reset();
      }
    });    
  }
  updateContact(contact) {    
    this.addContact.setValue(contact);
  }

  deleteContact(contactId){
    this.contactsManagerService.deleteContact(contactId)
    .subscribe((response) => {
      if (response) {
        this.successFlag = true;
        this.successMsg = "Successfully deleted the contact.";
        this.getAllContacts(); //update the array with the newly added code
        setTimeout(() => {
          this.successFlag = false;
          this.successMsg = "";          
        }, 2500);
        this.addContact.reset();
      }
    })
  }
  
}
