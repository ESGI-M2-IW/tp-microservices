const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Route pour créer une nouvelle commande
router.post('/', async (req, res) => {
    const { clientId, plats, dateLivraisonEstimee } = req.body;
    try {
        // Créer la commande dans le modèle "orders"
        const nouvelleCommande = await prisma.orders.create({
            data: {
                clientId,
                createdAt: new Date(), // Assigner la date de création
                status: 'NEW', // Statut initial
                dateLivraisonEstimee,
                orders_plates: {
                    create: plats.map((plat) => ({
                        idPlate: plat.idPlate,
                        quantity: plat.quantity || 1, 
                    })),
                },
            },
        });
        res.status(201).json(nouvelleCommande);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la commande" });
    }
});

// Route pour obtenir une commande par son ID
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

// Route pour mettre à jour le statut d'une commande
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const commande = await prisma.orders.update({
            where: { id: parseInt(id) },
            data: { status },
        });
        res.json(commande);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du statut de la commande" });
    }
});

router.get('/', async (req, res) => {
    console.log("Tentative de récupération des commandes");
    try {
        const commandes = await prisma.orders.findMany();
        console.log("Commandes récupérées : ", commandes);
        res.json(commandes);
    } catch (error) {
        console.error("Erreurrrrrrrrrrrrr lors de la récupération des commandes: ", error); // Log l'erreur
        res.status(500).json({ error: "Erreueeeeeeeeeeeeeeeee lors de la récupération des commandes" });
    }
});



module.exports = router;
