const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

const orders_status = {
    NEW: 'NEW',
    CONFIRMED: 'CONFIRMED',
    IN_PREPARATION: 'IN_PREPARATION',
    TO_DELIVER: 'TO_DELIVER',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
};

// Route pour exposer l'énum des statuts de commande
router.get('/status', (req, res) => {
    console.log("Route /status appelée");
    res.json(orders_status);  // Retourne tous les statuts possibles
});

// Route pour créer une nouvelle commande
router.post('/', async (req, res) => {
    const { clientId, plates, dateLivraisonEstimee } = req.body;  // Changer 'plats' en 'plates'

    try {
        // Vérifier que la liste de 'plates' n'est pas vide
        if (!plates || plates.length === 0) {
            return res.status(400).json({ error: "La liste de plats est requise" });
        }

        // Créer la commande dans le modèle "orders"
        const nouvelleCommande = await prisma.orders.create({
            data: {
                clientId,
                createdAt: new Date(),
                status: 'NEW', // Statut initial
                dateLivraisonEstimee,
                orders_plates: {
                    create: plates.map((plate) => ({
                        idPlate: plate.idPlate,    // Utilisation de 'idPlate' venant de 'plates'
                        quantity: plate.quantity || 1,  // Utilisation de 'quantity' venant de 'plates'
                    })),
                },
            },
        });

        res.status(201).json(nouvelleCommande);  // Retourne la nouvelle commande créée
    } catch (error) {
        console.error(error);  // Affiche l'erreur dans la console
        res.status(500).json({ error: "Erreur lors de la création de la commande" });  // Retourne l'erreur
    }
});

// Route pour mettre à jour le statut de la commande
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Récupère le nouveau statut

    // Vérifie si le statut est valide en comparant avec l'énum des statuts possibles
    if (!Object.values(orders_status).includes(status)) {
        return res.status(400).json({ error: "Statut invalide" });
    }

    try {
        const commande = await prisma.orders.findUnique({
            where: { id: parseInt(id) },
        });

        if (!commande) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }

        // Met à jour le statut de la commande avec le nouveau statut
        const commandeMiseAJour = await prisma.orders.update({
            where: { id: parseInt(id) },
            data: { status }, // Mise à jour du statut
        });

        res.json({ message: "Statut de la commande mis à jour", commande: commandeMiseAJour });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du statut de la commande : ", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du statut de la commande" });
    }
});

// Route pour récupérer les commandes d'un utilisateur
router.get('/user/:clientId', async (req, res) => {
    const { clientId } = req.params; // Récupère le clientId depuis les paramètres de l'URL
    try {
        const commandes = await prisma.orders.findMany({
            where: { clientId: parseInt(clientId) }, // Filtre les commandes par clientId
            include: {
                orders_plates: true,
                deliveries: true,
            },
        });
        
        if (!commandes || commandes.length === 0) {
            return res.status(404).json({ error: "Aucune commande trouvée pour cet utilisateur" });
        }
        
        res.json(commandes); // Retourne les commandes de l'utilisateur
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes de l'utilisateur : ", error);
        res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
    }
});


// Route pour récupérer une commande par son ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const commande = await prisma.orders.findUnique({
            where: { id: parseInt(id) },
            include: {
                orders_plates: true,
                deliveries: true,
            },
        });
        if (!commande) return res.status(404).json({ error: "Commande non trouvée" });
        res.json(commande);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la commande" });
    }
});

// Route pour récupérer la liste des commandes
router.get('/', async (req, res) => {
    try {
        const commandes = await prisma.orders.findMany();
        res.json(commandes);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes: ", error);
        res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
    }
});

// Route pour supprimer une commande par son ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const commandeASupprimer = await prisma.orders.findUnique({
            where: { id: parseInt(id) }
        });

        if (!commandeASupprimer) {
            return res.status(404).json({ error: "Commande non trouvée" });
        }

        // Supprimer la commande
        await prisma.orders.delete({
            where: { id: parseInt(id) }
        });

        // Répondre avec code 204 (No Content) après la suppression
        res.status(204).send();
    } catch (error) {
        console.error("Erreur lors de la suppression de la commande : ", error);
        res.status(500).json({ error: "Erreur lors de la suppression de la commande" });
    }
});

module.exports = router;
