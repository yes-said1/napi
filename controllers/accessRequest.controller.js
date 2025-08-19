import AccessRequest from "../models/AccessRequest.model.js";
// Submit access request
export const createRequest = async (req, res) => {
  try {
    const { name, email, reason } = req.body;

    if (!name || !email || !reason) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const newRequest = new AccessRequest({ name, email, reason });
    await newRequest.save();

    res.status(201).json({ success: true, requestId: newRequest._id });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Check request status
export const checkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await AccessRequest.findById(id);

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.json({ success: true, approved: request.approved });
  } catch (error) {
    console.error("Error checking status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// (Optional: Admin approves request)
export const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await AccessRequest.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.json({ success: true, message: "Request approved", request });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Get all access requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await AccessRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
