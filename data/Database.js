import User from './User';
import Phone from './Phone';
import ShortId from 'shortid';

class Database {
  constructor() {
    console.log('[Database.js] Constructing database');

    const userId = ShortId.generate();
    this.user = new User(userId);

    /**
     * Mock some messages into our bottle
     */
    this.insertPhone('iPhone 6', 'https://goo.gl/ndJdW9');
    this.insertPhone('Galaxy S7', 'https://goo.gl/uanrHM');
  }

  /**
   * This function will be called by GraphQL.
   * It receives a text string, creates a new Message instance and insert it to
   * our Bottle.
   */
  insertPhone(text, image) {
    const phoneId = ShortId.generate();
    const phones = this.getPhones();

    const idIsUnique = this.checkUniqueId(phoneId, phones);

    if (!idIsUnique) {
      this.insertPhone(text);
      return false;
    }

    const phone = new Phone(phoneId, text, image);

    this.user.addPhone(phone);
    return phone;
  }

  /**
   * This function will be called by GraphQL.
   * It returns all messages of the Bottle.
   */
  getPhones() {
    const phones = this.user.getPhones();
    return phones;
  }

  checkUniqueId(newId, phones) {
    let isUnique = true;

    if (phones.length > 0) {
      phones.map(({ id }) => {
        if (id === newId) {
          isUnique = false;
        }
      }, newId);
    }

    return isUnique;
  }

  /**
   * This function will be called by GraphQL.
   * It returns a message by id.
   */
  getPhoneById(id) {
    const phones = this.user.getPhones();
    const selectedPhone = phones.filter(phone => phone.id == id);
    return selectedPhone;
  }

  /**
   * This function will be called by GraphQL.
   * It returns the whole Bottle.
   */
  getUser() {
    return this.user;
  }

  /**
   * This function will be called by GraphQL.
   * It removes a message based on messageId.
   */
  removePhoneById(id) {
    this.user.removePhoneById(id);
    const phones = this.getPhones();
    return phones;
  }
}

export default Database;
