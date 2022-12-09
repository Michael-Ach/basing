import { LightningElement, wire } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';

import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const COLUMNS  = [
    { label: 'First Name', fieldName: FIRST_NAME.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LAST_NAME.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: CONTACT_EMAIL.fieldApiName, type: 'email' }
];

export default class ContactList extends LightningElement {
    columns = COLUMNS;
    errors;
    @wire(getContacts)
    contacts;

    get errors() {
        console.log('this.contacts.error: ', this.contacts.error);
        return (this.contacts.error) ? reduceErrors(this.contacts.error) : [];
    }
}