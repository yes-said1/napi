import mongoose from "mongoose";

const accessRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AccessRequest = mongoose.model("AccessRequest", accessRequestSchema);
export default AccessRequest;