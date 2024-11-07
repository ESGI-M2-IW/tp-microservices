# Étape 1 : Installation des dépendances et génération du client Prisma
FROM node:22-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration des dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production (sans devDependencies)
RUN npm ci

# Copier le dossier Prisma et générer le client Prisma
COPY prisma ./prisma
RUN npx prisma generate

# Copier les fichiers sources, y compris le dossier src
COPY . .

# Étape 2 : Image finale pour exécuter l'application
FROM node:22-alpine AS runner

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires de l'étape précédente
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

# Exposer le port de l'application
EXPOSE 3000

# Démarrer l'application
#CMD ["npm", "start"]
CMD ["npm", "start"]
