package com.springboot.contactsmanager.service;

import com.springboot.contactsmanager.data.ContactRepository;
import com.springboot.contactsmanager.pojo.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {
    @Autowired
    ContactRepository contactRepository;

    public ContactService(){}

    public Contact createContact(Contact contact){
        return contactRepository.save(contact);
    }

    public Contact updateContact(Contact contact){
        return contactRepository.save(contact);
    }

    public Contact findById(Long contactId) throws Exception {
        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new  Exception());
        return contact;
    }

    public void deleteById(Long contactId){
        contactRepository.deleteById(contactId);

    }

    public List<Contact> findAll(){
        return contactRepository.findAll();
    }
}
