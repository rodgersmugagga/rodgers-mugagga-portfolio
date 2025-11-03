const Contact = require('../models/Contact');

// Create new contact message
exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      contact
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: 'Error sending message',
      error: error.message 
    });
  }
};

// Get all contacts (admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort('-createdAt')
      .lean();
    
    res.json({
      success: true,
      contacts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching contacts',
      error: error.message 
    });
  }
};

// Get single contact by ID (admin only)
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }
    
    res.json({
      success: true,
      contact
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching contact',
      error: error.message 
    });
  }
};

// Mark contact as read (admin only)
exports.markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Contact marked as read',
      contact
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating contact',
      error: error.message 
    });
  }
};

// Mark contact as replied (admin only)
exports.markAsReplied = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { replied: true },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Contact marked as replied',
      contact
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating contact',
      error: error.message 
    });
  }
};

// Delete contact (admin only)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Contact not found' 
      });
    }
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting contact',
      error: error.message 
    });
  }
};

