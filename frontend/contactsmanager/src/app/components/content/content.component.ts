import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactsManager } from '../../service/contactsmanager.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @ViewChild('f') addContact: NgForm;
  constructor(private contactsManagerService: ContactsManager) { }
  _id: string;
  errorFlag: boolean;
  errorMsg: string;
  successFlag: boolean;
  successMsg: string;
  exists: boolean = false;


  ngOnInit() {
  }

  addForm() {
    let firstName, lastName, contactNumber, email, contactId;
    firstName = this.addContact.value.firstName;
    lastName = this.addContact.value.lastName;
    contactNumber = this.addContact.value.contactNumber;
    email = this.addContact.value.email;
    contactId = this.addContact.value._id;

    //get all contacts
    this.contactsManagerService.getAllContacts().subscribe((response) => {
      if (Array.of(response)[0].length == 0) {
        this.contactsManagerService.addContact(firstName, lastName, contactNumber, email)
          .subscribe((response) => {
            this.successFlag = true;
            this.successMsg = "Contact saved successfully.";
            setTimeout(() => {
              this.successFlag = false;
              this.successMsg = "";
              //this.getPromoCodes(); //update the array with the newly added code
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
              setTimeout(() => {
                this.successFlag = false;
                this.successMsg = "";
                // this.getPromoCodes(); //update the array with the newly added code
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
  }

  //get all the contacts
  getAllContacts(){}
}
