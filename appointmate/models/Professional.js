const { ObjectId } = mongoose.Schema;
import mongoose from "mongoose";

const professionalSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    prefix: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    profIn: {
      type: String,
      required: true,
    },
    specialIn: {
      type: String,
      required: true,
    },
    // age: {
    //   type: Number,
    //   required: true,
    // },
    officeAddress: {
      type: String,
      required: true,
    },
    expYears: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    workspace: [],

    about:{
      type:String,
    },
    education:{
      type:String,
    },
    title:{
      type:String,
    },
    fromTime:{

    },
    toTime:{

    },
    license:{

    }
  },
  {
    timestamps: true,
  }
);

const Professional = mongoose.models.Professional || mongoose.model("Professional", professionalSchema)

export default Professional