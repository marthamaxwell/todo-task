import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`Invalid email address: ${value}`);
        }
      },
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: ["Male", "Female"],
    },

    auth: {
      token: {
        type: String,
      },
      otp: {
        code: {
          type: String,
        },
        expires_in: {
          type: Date,
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);
export default User;
