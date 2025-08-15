import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Admin - Only allow ONE superadmin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if ANY admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({ message: "Superadmin already exists. Registration is closed." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
  return res.status(400).json({
    message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
  });
}

    // Save admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "superadmin", // optional: mark the role explicitly
    });

    await newAdmin.save();
    res.status(201).json({ message: "Superadmin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
