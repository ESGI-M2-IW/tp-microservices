# U-BER-GER
Micro-service "Cuisine"
=======================

## Installation et démarrage

```bash
npm install

# Lancement en mode développement
npm run dev

# Lancement en mode déploiement
npm run build
npm run start
```

Se rendre sur http://localhost:3100/api

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

## Utilisation de l'API

Rendez-vous sur la page http://localhost:3100/api/doc

## Objets gérés par le microservice

- Menu *plates*
  - GET /api/plates
  - POST /api/plates
  - GET /api/plates/:id
  - PATCH /api/plates/:id
  - DELETE /api/plates/:id
- Plats commandés *orders_plates*
  - GET /api/orders/:idOrder
  - GET /api/orders/:idOrder/plates
  - GET /api/orders/:idOrder/plates/:idPlates
  - PATCH /api/orders/:idOrder/plates/:idPlates
  - DELETE /api/orders/:idOrder/plates/:idPlates
- Status des plats commandés *order-plate-statuses*
  - GET /api/order-plate-statuses