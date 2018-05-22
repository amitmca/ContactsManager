package com.springboot.contactsmanager.logic;

import com.springboot.contactsmanager.data.ContactRepository;
import com.springboot.contactsmanager.pojo.Contact;
import com.springboot.contactsmanager.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ContactsManagerController {

    @Autowired
    ContactService contactService;

    //Get ALL contacts
    //@RequestMapping(value="/contacts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @GetMapping("/contacts")
    public List<Contact> getContacts(){
        return contactService.findAll();
    }

    //create a new contact
    @PostMapping("/contacts")
    public Contact createContact(@Valid @RequestBody Contact contact){
        return contactService.createContact(contact);
    }

    //update an existing contact
    @PutMapping("/contacts/{id}")
    public Contact updateContact(@PathVariable(value="id")Long contactId, @Valid @RequestBody Contact contactDetails) throws Exception {
        //find if the contact exists
        Contact contact = contactService.findById(contactId);
        if(contact!=null){
            contact.setId(contactId);
            contact.setEmail(contactDetails.getEmail());
            contact.setFirstName(contactDetails.getFirstName());
            contact.setLastName(contactDetails.getLastName());
            contact.setContactNumber(contactDetails.getContactNumber());
            Contact updatedContact = contactService.updateContact(contact);
            return updatedContact;
        }
        return null;

    }
    //delete a contact
    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable(value="id")Long contactId) throws Exception { //take specific id of the contact that needs to be deleted
        Contact contact = contactService.findById(contactId); //check if the contact exists or not
        if(contact!= null){
            contactService.deleteById(contactId); //delete the contact from database
        }
        return  ResponseEntity.ok().build();
    }

    //get a contact by id
    @GetMapping("/contacts/{id}")
    public Contact getContactById(@PathVariable(value="id") Long contactId) throws Exception {

        return contactService.findById(contactId);

    }
}
