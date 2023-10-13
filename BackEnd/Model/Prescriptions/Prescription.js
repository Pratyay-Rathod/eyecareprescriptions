const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  customerInfo:{
    phoneNo: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 12,
      match: /^[7-9]\d{9}$/,
    },
    customerName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    gstNumber: {
      type: String,
      match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    },
    companyName: {
      type: String,
    },
    line1:{
      type:String,
    },
    line2:{
      type:String,
    },
    customerNotes:{
      type:String,
    }
  },
  paitentInfo: {
    paitentName: {
      type: String,

    },
    paitentPhoneNo: {
      type: String,
 
      match: /^[7-9]\d{9}$/,
    },
    paitentEmail: {
      type: String,
      email: true,
    },
    paitentsBirthDate: {
      type: Date,
    },
    paitentsAge:{
      type:Number,
    },
    gender: {
      type: String,
    },
  },
  prescriptionInfo: {
    cosmeticOption: {
      type: String,
    },
    doctorName: {
      type: String,
    },
    prescriptionTime: {
      type: String,
    },
    LensType: {
      type: String,
    },
  },
  LenseNumbers: {
    DistanceVision: {
      right: {
        RSPH: { type: String },
        RCYL: { type: String },
        RAXIS: { type: String },
        RPD: { type: String },
        RVA: { type: String },
      },
      left: {
        LSPH: { type: String },
        LCYL: { type: String },
        LAXIS: { type: String },
        LPD: { type: String },
        LVA: { type: String },
      },
    },
    NearVision: {
      right: {
        RSPH: { type: String },
        RCYL: { type: String },
        RAXIS: { type: String },
        RPD: { type: String },
        RVA: { type: String },
      },
      left: {
        LSPH: { type: String },
        LCYL: { type: String },
        LAXIS: { type: String },
        LPD: { type: String },
        LVA: { type: String },
      },
    },
    Addition: {
      right: {
        RSPH: { type: String },
      },
      left: {
        LSPH: { type: String },
      },
    },
    IPD: {
      right: {
        RSPH: { type: String },
      },
    },
  },
  LenseUseType: [
    {
      type: String,
    },
  ],
  prescriptionNotes:{
    type:String,
  }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
