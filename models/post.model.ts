import mongoose, { Schema, Model } from "mongoose";

export interface IPost extends Document {
  id: string;
  userId: string;
  content: string;
  title: string;
  image?: string;
  category?: string;
  slug: string;
  username: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const PostSchema: Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",
    },
    category: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const Post = mongoose.models?.Post || mongoose.model<Post>("Post", postSchema);
const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
