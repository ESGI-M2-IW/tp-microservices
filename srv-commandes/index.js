const express = require('express');const { PrismaClient } = require('@prisma/client');
const commandeRoutes = require('./routes/commandes.js');

// Initialisation
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Route de bienvenue à la racine
app.get('/', (req, res) => {
    res.send("Bienvenue dans le service de gestion des commandes !");
});

// Utiliser les routes de commande
app.use('/api/orders', commandeRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Service de commande en cours d'exécution sur le port ${PORT}`);
});
