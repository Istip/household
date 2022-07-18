const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    image: {
      type: String,
      default:
        'https://www.rombo.tools/wp/wp-content/uploads/2021/05/tawoman_flakesmakeup_1440_trans025_uplight-3_square.png',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
