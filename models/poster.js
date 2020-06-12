const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const posterSchema = new Schema({
  governorate: {
    type: String,
    enum: ['Arish', 'Ismalia', 'portsaid', 'seueze',],
    required: true
  },
  category: {
    type: String,
    enum: ['Services', 'job', 'Furniture', 'property', 'journeys'],
    required: true,

  },
  title: {
    type: String,
    required: true
  },

  photos: [{
    type: String,
    required: true
  }],
  // photos: Array,
  description: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true,
  },

  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    // required: true
  }
})

module.exports = mongoose.model('Posters', posterSchema, 'Posters');