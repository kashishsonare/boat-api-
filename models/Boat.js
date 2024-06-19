const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalTimeSchema = new Schema({
    hours: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: false });

const dayweekTimeSchema = new Schema({
  day:{
    type:String,
    required:true
      },
  time:{
    type:Number,
    required:true
  },
  to:{
    type:Number,
    required:true
  }    
},{ _id: false});

const boatSchema = new Schema({
    boatName: {
        type: String,
        required: true
    },
    boatId: {
        type: String,
        required: true,
        unique: true
    },
    boatCategory: {
        type: String,
        required: true
    },
    boatLocation: {
        type: String,
        required: true
    },
    boatDescription: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    averageSpeed: {
        type: Number,
        required: true
    },
    topspeed: {
        type: Number,
        required: true
    },
    torque: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    totalseats: {
        type: Number,
        required: true
    },
    cabin: {
        type: String,
        required: true
    },
    weightCapacity: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rentalTimeHours: [rentalTimeSchema],
    pricePerHour: {
        type: Number,
        required: true
    },
    dayweekTime: [dayweekTimeSchema],
}, { timestamps: true });

const Boat = mongoose.model('Boat', boatSchema);

module.exports = Boat;





