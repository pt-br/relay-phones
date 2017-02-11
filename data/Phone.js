class Phone {
  constructor(id, model, image) {
    console.log(`[Phone.js] Constructing a new Phone with id: ${id}`);
    this.id = id; // Used for globalIdField on GraphQL
    this.model = model;
    this.image = image;
  }
}

export default Phone;
