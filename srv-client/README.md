# Service Utilisateur

## Installation
1. Copié le .env.sample pour créer un .env et remplir avec vos données
2. Ouvrez un terminal et executer make
3. se rendre dans http://localhost:8000/admin :
   - Aller dans API Key Permission
   - Cliquer sur ajouter
   - Précisez un name et une date d'expiration
   - Enregistrez et récupérez votre clef dans l'encadré jaune. Attention, vous ne pourrez plus la récupérer après !

Si vous voulez relancer le serveur sans utiliser le make :
1. activer l'environnement : 
   - Unix : `source venv/bin/activate`
   - Windows : `.\venv\Scripts\activate`
2. lancer le serveur : `python3 manage.py runserver`