import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  isAdmin?: boolean;
}
const UserSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// const User = mongoose.models.User || mongoose.model<User>("User", UserSchema);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
