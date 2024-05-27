import mongoose, { Schema } from "mongoose";
const appSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
      },
      phone: {
        type: Number,
        required: [true, " phone is required"],
      },
    email:{
        type:String,
        required:[true,"email is required"],
    },
    education: {
        type: String,
        required: [true, "education Name is required"],
      },
      skill: {
        type: String,
        required: [true, "skill is required"],
      },
      experiance: {
        type: Number,
        required: [true, "experiance is required"],
      },
      coverLetter: {
        type: String,
        required: [true, "coverLetter is required"],
      },
      applyDate: { type: Date, default: Date.now }
})
const Application = mongoose.model("Application",appSchema);
export default Application;