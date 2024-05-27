// import mongoose from "mongoose";
// import validator from "validator";
// import bcrypt from "bcryptjs";
// import JWT from "jsonwebtoken";

// const userSchema=new mongoose.Schema({
//     firstname:{
//         type:String,
//         required:[true,"first name is required"]
//     },
//     lastname:{
//         type:String,
//         required:[true,"last name is required"]
//     },
//     lastname:{
//         type:String,
//         required:[true,"Email is required"],
//         unique:true,
//         validate:validator.isEmail
//     },
//     password:{
//         type:String,
//         required:[true,"password  is required"],
//         minlength:[6,"password must be atleast 6 character"],
//         select:true,
//     },
//     accountType: { type: String, default: "seeker" },
//     contact: { type: String },
//     location: { type: String },
//     profileUrl: { type: String },
//     cvUrl: { type: String },
//     jobTitle: { type: String },
//     about: { type: String },
//   },
//   { timestamps: true }
// );
// userSchema.pre("save", async function () {
//     if (!this.isModified) return;
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   });
//   //compare password
//     userSchema.methods.comparePassword = async function (userPassword) {
//     const isMatch = await bcrypt.compare(userPassword, this.password);
//     return isMatch;
//   };
//   //JSON WEBTOKEN
//   userSchema.methods.createJWT = function () {
//     return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "1d",
//     });
//   };
  
//   const Users = mongoose.model("Users", userSchema);
  
//   export default Users;
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"]
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  accountType: { type: String, default: "seeker" },
  contact: { type: String },
  location: { type: String },
  profileUrl: { type: String },
  cvUrl: { type: String },
  jobTitle: { type: String },
  about: { type: String },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Users = mongoose.model("Users", userSchema);

export default Users;

