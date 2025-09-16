import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
}, { timestamps: true });

const pdfSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  uploadedAt: { type: Date, default: Date.now },
});

const highlightSchema = new Schema({
  pdfId: {
    type: Schema.Types.ObjectId,
    ref: "Pdf",
    required: true,
  },
  uuid: {
    type: String, // unique ID for the highlight itself
    required: true,
    unique: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  position: {
    // bounding box (x, y, width, height) 
    x: Number,
    y: Number,
    width: Number,
    height: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export const User = model("User", userSchema);
export const Pdf = model("Pdf", pdfSchema);
export const Highlight = model("Highlight", highlightSchema);
