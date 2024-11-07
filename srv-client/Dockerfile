# Utiliser l'image Python 3.10 (ou une autre version selon les besoins du projet)
FROM python:3.10-slim

# Définir le répertoire de travail à /app
WORKDIR /app

# Installer Node.js et npm
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    rm -rf /var/lib/apt/lists/*

# Copier les fichiers de configuration (requirements.txt) nécessaires pour installer les dépendances
COPY requirements.txt /app/

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code de l'application dans le conteneur
COPY . /app/

# Exposer le port 8000
EXPOSE 8000

# Définir la variable d'environnement pour les paramètres Django
ENV PY_ENV=dev

# Exécuter les migrations de la base de données et collecter les fichiers statiques
RUN python manage.py migrate
RUN python manage.py tailwind install
RUN python manage.py tailwind build

# Lancer le serveur Django sur le port 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
