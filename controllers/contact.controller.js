import Contact from "../models/contact.model.js";

// Save a new contact message
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, Email, and Message are required" });
    }

    // Save message
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all messages
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts); // return array instead of { contacts }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single message by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ contact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete message by ID
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
