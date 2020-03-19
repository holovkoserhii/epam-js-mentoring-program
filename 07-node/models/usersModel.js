const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const {
  // secretJWT,
  // TOKEN_VALID_MINS,
  INCORRECT_USER_CREDENTIALS_ERROR_MESSAGE
} = require("../utils/variables");

const userSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: false,
    minlength: 6
  },
  createdAt: {
    type: Number,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      },
      expiresIn: {
        type: Number,
        requires: true
      }
    }
  ],
  noteIds: [
    {
      noteId: {
        type: String
      }
    }
  ]
});

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.secretJWT, {
    expiresIn: `${process.env.TOKEN_VALID_MINS}m`
  });
  this.tokens = [...this.tokens, { token }];
  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async ({ login, password }) => {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error(INCORRECT_USER_CREDENTIALS_ERROR_MESSAGE);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error(INCORRECT_USER_CREDENTIALS_ERROR_MESSAGE);
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
