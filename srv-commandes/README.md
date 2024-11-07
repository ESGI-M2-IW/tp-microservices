## Installation et lancement du serveur:

1. se mettre à la racine du microservice 
2. `npm install`
3. lancer la commande: `node src/index.js`
4. se rendre dans http://localhost:3200

## Connexion à la base de donnée

```bash
# modifier la variable DATABASE_URL dans le fichier .env
DATABASE_URL=DATABASE_URL="mysql://user:mdp@host:port/bdd-name"

# Modifier dans le fichier /prisma/schema.prisma le type de bdd
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

# Création des tables dans la base de donnée
prisma db push
```

## Routes disponibles

# POST /api/orders -> création d'une nouvelle commande pour un client.
Le corps de la requête doit être un objet JSON contenant les informations suivantes :

    clientId : Identifiant du client (obligatoire)
    plates : Liste des plats à ajouter à la commande (obligatoire). Chaque plat doit avoir un idPlate et une quantity.

Exemple de body :
{
    "clientId": 1,
    "plates": [
        {
            "idPlate": 1,
            "quantity": 5
        },
        {
            "idPlate": 2,
            "quantity": 2
        }
    ]
}

# GET /api/orders/user/:clientId -> récupération de toutes les commandes d'un utilisateur, identifiées par son clientId.
# GET /api/orders/:id -> récupération une commande spécifique en utilisant son id.
# GET /api/orders -> récupération de toutes les commandes présentes dans la base de données.
# DELETE /api/orders/:id -> suppression d'une commande
# PATCH /api/orders/:id/canceled -> annulation d'une commande (changement du statut)
