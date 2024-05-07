import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  name:{ type: String},
  course: { type: String},
  date: { type: String },
  refID: { type: String },
  link: { type: String},
});

export const Certificate = mongoose.model("Certificate", certificateSchema);
