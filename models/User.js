import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    slug: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "AUTHOR", "MANAGER"],
      default: "AUTHOR",
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    socials: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    designation: { type: String, default: "" },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
