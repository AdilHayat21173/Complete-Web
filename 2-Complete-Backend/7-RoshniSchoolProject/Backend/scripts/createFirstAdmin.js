// scripts/createFirstAdmin.js
// Run once to create your first admin account (or promote an existing
// registered user to admin), since /auth/users/:id/role itself requires
// you to already be an admin.
//
// Usage:
//   node scripts/createFirstAdmin.js someone@example.com theirpassword "Full Name"

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../src/models/user.model");

async function run() {
  const email = process.argv[2];
  const password = process.argv[3];
  const username = process.argv[4] || "Admin";

  if (!email || !password) {
    console.log(
      "Usage: node scripts/createFirstAdmin.js <email> <password> [username]"
    );
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const existing = await UserModel.findOne({ email });
  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log(`Existing user ${email} promoted to admin.`);
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      username,
      email,
      password: hashedPassword,
      role: "admin",
    });
    console.log(`Admin user ${email} created.`);
  }

  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
