class User {
  constructor(id) {
    console.log(`[User.js] Constructing a new User with id: ${id}`);
    this.id = id;
    this.phones = [];
  }

  /**
   * This function will be called by Database.js.
   * It inserts a Message into our Bottle.
   */
  addPhone(phone) {
    console.log('[User.js] Adding Phone into User...');
    this.phones.push(phone);
  }

  /**
   * This function will be called by Database.js.
   * It returns the messages of the Bottle.
   */
  getPhones() {
    return this.phones;
  }

  /**
   * This function will be called by Database.js.
   * It removes a message based on messageId.
   */
  removePhoneById(id) {
    console.log(`[User.js] Removing Phone(ID: ${id}) from User...`);
    this.phones = this.phones.filter(phone => phone.id !== id);
  }
}

export default User;
