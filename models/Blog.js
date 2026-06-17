import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    img: String,
    postedby: String, // Name of the writer
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // LINK TO AUTHOR
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // LINK TO SHOP OWNER
    slug: { type: String, unique: true },
    category: String,
    imgalt: String,
    description: String,
    metaDescription: {
      type: String,
      default: "",
    },
    blog_detail: [], // Stores your additional fields (images, youtube, etc)
    tags: [String],
    comments: [
      {
        img: String,
        name: String,
        email: String,
        message: String,
        status: { type: String, default: "Active" },
        replies: [
          {
            img: String,
            name: String,
            email: String,
            message: String,
            status: { type: String, default: "Active" },
            postedAt: { type: Date, default: Date.now },
          },
        ],
        postedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
    type: String,
    enum: ["pending", "scheduled", "active"],
    default: "pending",
  },
    scheduledAt: {
      type: Date,
      default: null,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// We check mongoose.models.blogs first to prevent re-defining the model on every hot reload
const Blog = mongoose.models.blogs || mongoose.model("blogs", BlogSchema);

export default Blog;