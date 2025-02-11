const mongoose = require('mongoose');
const validator = require("validator");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    required: true
  },
  religion: {
    type: String,
    required: true,
    enum: ['Christianity', 'Islam', 'Judaism', 'Hinduism', 'Buddhism', 'Agnostic', 'Atheist', 'Other'],
  },
  preferredReligions: [{
    type: String,
    enum: ['Christianity', 'Islam', 'Judaism', 'Hinduism', 'Buddhism', 'Agnostic', 'Atheist', 'Other'],
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.model("User", userSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;
    await userModel.create(this.body);
  }
// Validate data from front
  validate() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email) && !this.body.firstName && !this.body.phone && this.body.referredReligions) {
      this.errors.push("Informação obrigatória errada ou não preenchida");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (
        typeof this.body[key] !== 'string' &&
        !Array.isArray(this.body[key]) &&
        !(key === 'age' && typeof this.body[key] === 'number') &&
        !(key === 'address' && typeof this.body[key] === 'object')
      ) {
        this.body[key] = '';
      }
    }

    this.body = {
      firstName: this.body.firstName,
      lastName: this.body.lastName,
      age: this.body.age,
      password: this.body.password,
      email: this.body.email,
      phone: this.body.phone,
      address: this.body.address,
      religion: this.body.religion,
      preferredReligions: this.body.preferredReligions,
    };
  }
}



module.exports = { User };
