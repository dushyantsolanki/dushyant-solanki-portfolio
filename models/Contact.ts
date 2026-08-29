import mongoose from "mongoose";

export interface IContact extends mongoose.Document {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  website?: string;
  createdAt: Date;
}

const ContactSchema = new mongoose.Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from recompiling the model upon hot reload
const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
