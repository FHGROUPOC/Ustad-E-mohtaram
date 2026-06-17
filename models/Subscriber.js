import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", SubscriberSchema);
