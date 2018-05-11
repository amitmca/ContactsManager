package com.springboot.contactsmanager.logic;

import com.springboot.contactsmanager.data.ContactRepository;
import com.springboot.contactsmanager.pojo.Contact;
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
    ContactRepository contactRepository;

    //Get ALL contacts
    //@RequestMapping(value="/contacts", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @GetMapping("/contacts")
    public List<Contact> getContacts(){
        return contactRepository.findAll();
    }

    //create a new contact
    @PostMapping("/contacts")
    public Contact createContact(@Valid @RequestBody Contact contact){
        return contactRepository.save(contact);
    }

    //update an existing contact
    @PutMapping("/contacts/{id}")
    public Contact updateContact(@PathVariable(value="id")Long contactId, @Valid @RequestBody Contact contactDetails) throws Exception {
        //find if the contact exists
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new  Exception());

        contact.setEmail(contactDetails.getEmail());
        contact.setFirstName(contactDetails.getFirstName());
        contact.setLastName(contactDetails.getLastName());
        contact.setContactNumber(contactDetails.getContactNumber());

        Contact updatedContact = contactRepository.save(contact);
        return updatedContact;
    }
    //delete a contact
    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable(value="id")Long contactId) throws Exception { //take specific id of the contact that needs to be deleted
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new  Exception()); //check if the contact exists or not
        contactRepository.deleteById(contactId); //delete the contact from database
        return  ResponseEntity.ok().build();
    }

    //get a contact by id
    @GetMapping("/contacts/{id}")
    public Contact getContactById(@PathVariable(value="id") Long contactId) throws Exception {

        return contactRepository.findById(contactId)
                .orElseThrow(() -> new Exception());

    }
}
