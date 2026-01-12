// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Your Connection String
const MONGO_URI =
  "mongodb+srv://ashkumarchauhan3_db_user:NyaKh8lAI0nSudj1@tutorshub.yxmgl7i.mongodb.net/tutorshub?appName=TutorsHub";

// Define User Model (Must match server.js)
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  name: String,
});
const User = mongoose.model("User", UserSchema);

async function createAdmin() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB...");

  // CHANGE THESE DETAILS IF YOU WANT
  const username = "admin";
  const password = "admin123";
  const name = "Ashish Chauhan";

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const adminUser = new User({
      username: username,
      password: hashedPassword,
      role: "admin",
      name: name,
    });

    await adminUser.save();
    console.log("✅ Admin Created Successfully!");
    console.log(`👉 Login with Username: ${username} | Password: ${password}`);
  } catch (error) {
    console.log("❌ Error (User might already exist):", error.message);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
