const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');

// Protected routes (admin only) - must come first
router.get('/', auth, contactController.getAllContacts);
router.get('/:id', auth, contactController.getContactById);
router.patch('/:id/read', auth, contactController.markAsRead);
router.patch('/:id/replied', auth, contactController.markAsReplied);
router.delete('/:id', auth, contactController.deleteContact);

// Public route - anyone can send a message
router.post('/', contactController.createContact);

module.exports = router;