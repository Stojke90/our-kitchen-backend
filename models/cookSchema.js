import mongoose from "mongoose";

const cookSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  cook_name: String,
  email: String,
  password: String,
  image: String,
  role: { type: Number, default: 0 },
  birth: String,
  date: { type: Date, default: new Date() },
});

const Cook = mongoose.model("cooks", cookSchema);

export default Cook;
