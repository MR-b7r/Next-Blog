import mongoose, { Document, Schema } from "mongoose";

// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   profilePicture: string;
//   isAdmin: boolean;
// }
const userSchema: Schema = new mongoose.Schema({
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
});

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);
export default User;
