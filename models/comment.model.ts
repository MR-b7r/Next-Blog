import mongoose, { Document, Model, Schema } from "mongoose";

export interface IComment extends Document {
  id: string;
  comment: string;
  postId: string;
  userId: string;
  likes: string[];
  numberOfLikes: number;
}

const CommentSchema: Schema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// const Comment =
//   mongoose.models?.Comment || mongoose.model<Comment>("Comment", commentSchema);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
