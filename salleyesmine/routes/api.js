const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ➕ Ajouter un client
router.post('/client', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📋 Récupérer tous les clients
router.get('/clients', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// 🔍 Récupérer un client par ID
router.get('/client/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✏️ Mettre à jour un client par ID
router.put('/client/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // retourne le document mis à jour
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ❌ Supprimer un client par ID
router.delete('/client/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.json({ message: 'Client supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
