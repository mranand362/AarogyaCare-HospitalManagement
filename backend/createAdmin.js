import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import dns from "node:dns";
import User from "./models/User.js";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const email = "admin@aarogyacare.com";

    // 🔥 Always remove old admin to avoid confusion
    await User.deleteOne({ email });

    // Create hashed password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "admin",
      isActive: true,
      phone: "9999999999",
      address: "Admin Office",
    });

    console.log("✅ Admin created successfully!");
    console.log("📧 Email:", admin.email);
    console.log("🔑 Password: Admin@123");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdmin();