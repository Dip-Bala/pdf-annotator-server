import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  filename: String,
  uuid: String,
  userId: String,
  path: String,
  uploadedAt: { type: Date, default: Date.now },
});

export const Pdf = mongoose.model("Pdf", pdfSchema);