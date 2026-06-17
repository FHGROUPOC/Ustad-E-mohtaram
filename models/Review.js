import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Represents the Barber
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Represents the Shop/Admin
      required: true,
    },
    reviewerImage: { type: String },
    reviewerName: { type: String, required: true },
    reviewerEmail: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Approved", // Set to Approved by default if you don't want to manually verify every single one
    },
    // --- ADD THESE FOR REPLIES ---
    reply: {
      type: String,
      default: "",
    },
    repliedAt: {
      type: Date,
    },
    // -----------------------------
  },
  { timestamps: true },
);

// This ensures that if the model is already compiled, it uses that one,
// otherwise it creates a new one.
export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
