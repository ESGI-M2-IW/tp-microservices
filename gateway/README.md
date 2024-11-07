
# API Gateway

Cette API Gateway utilise Express.js et Axios pour interagir avec différents microservices, en regroupant les services de gestion des utilisateurs, de cuisine, de livraisons et de commandes. Elle agit en tant que proxy entre le client et ces services.

## Prérequis

- Node.js (version 14+)
- npm (ou yarn)

## Installation

1. Installez les dépendances :

   ```bash
   npm install
   ```

2. Créez un fichier `.env` à la racine du projet pour configurer les variables d'environnement. Un fichier `.env.example` est disponible

## Utilisation

1. Pour démarrer le serveur API Gateway :

   ```bash
   npm start
   ```

2. L'API Gateway sera accessible par défaut sur le port `3300`.

## Endpoints

La Gateway redirige les requêtes vers les services associés en fonction des routes suivantes :

- **/users** : Redirige vers le microservice de gestion des utilisateurs (`HOST_USERS`).
- **/cuisine** : Redirige vers le microservice de cuisine (`HOST_CUISINE`).
- **/deliveries** : Redirige vers le microservice de livraisons (`HOST_DELIVERIES`).
- **/orders** : Redirige vers le microservice de commandes (`HOST_ORDERS`).

### Exemple de requêtes

```http
GET http://localhost:3300/users
POST http://localhost:3300/cuisine
PUT http://localhost:3300/deliveries
DELETE http://localhost:3300/orders
```

Les sous terminaisons sont détaillées dans les docs des micro-services

