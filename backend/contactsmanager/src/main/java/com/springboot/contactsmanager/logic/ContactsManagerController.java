package com.springboot.contactsmanager.logic;

import com.springboot.contactsmanager.data.ContactRepository;
import com.springboot.contactsmanager.pojo.Contact;
import org.springframework.beans.factory.annotation.Autowired;
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
    @PutMapping("/contact/{id}")
    public Contact updateContact(@PathVariable(value="id")Long contactId, @Valid @RequestBody Contact contactDetails) throws Exception {
        //find if the contact exists
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new  Exception());

        contact.setEmail(contactDetails.getEmail());
        contact.setFirstName(contactDetails.getFirstName());
        contact.setLastName(contactDetails.getLastName());
        contact.setNumber(contactDetails.getNumber());

        Contact updatedContact = contactRepository.save(contact);
        return updatedContact;
    }
    //delete a contact
    

    //get a contact by id
    @GetMapping("/contacts/{id}")
    public Contact getContactById(@PathVariable(value="id") Long contactId) throws Exception {

        return contactRepository.findById(contactId)
                .orElseThrow(() -> new Exception());

    }
}
