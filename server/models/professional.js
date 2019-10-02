import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProfessionalSchema = new Schema({
  id: ObjectId,
  fullName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  NationalIdNIN: {
    type: String,
    required: true
  },
  Profession: {
    type: String,
    required: true
  },
  AgencyName: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  retypePassword: {
    type: String,
    required: true
  }
});

const Profession = mongoose.model("Professional", ProfessionalSchema);

export { Profession };
