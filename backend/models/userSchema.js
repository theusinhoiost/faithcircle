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
    enum: ['Cristianismo', 'Islamismo', 'Judaísmo', 'Hinduísmo', 'Budismo', 'Agnóstico', 'Ateu', 'Outra'],
  },
  preferredReligions: [{
    type: String,
    enum: ['Cristianismo', 'Islamismo', 'Judaísmo', 'Hinduísmo', 'Budismo', 'Agnóstico', 'Ateu', 'Outra'],
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

  validate() {
    this.cleanUp();

    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.errors.push("Email inválido");
    }
    if (!this.body.firstName) {
      this.errors.push("Nome é obrigatório");
    }
    if (!this.body.phone) {
      this.errors.push("Telefone é obrigatório");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string' && !Array.isArray(this.body[key]) && !(key === 'age' && typeof this.body[key] === 'number')) {
        this.body[key] = '';
      }
    }

    this.body = {
      firstName: this.body.firstName,
      lastName: this.body.lastName,
      age: this.body.age,
      email: this.body.email,
      phone: this.body.phone,
      address: this.body.address,
      religion: this.body.religion,
      preferredReligions: this.body.preferredReligions,
    };
  }
}

module.exports = { User};
