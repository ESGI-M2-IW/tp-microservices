Lancement du serveur:

1. npm install
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


Routes: 

//Listing des routes
