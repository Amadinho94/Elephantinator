# Server side

## Dépendances coté serveur
- **nodemon** : Redémarre automatiquement le serveur lors des modifications.
- **mongoose** : Outil de modélisation des données pour MongoDB.
- **express** : Framework web pour Node.js, simplifiant la création d'API.
- **cors** : Middleware permettant de gérer les requêtes HTTP cross-origin.
- **jsonwebtoken** : Implémente la création et la validation de JSON Web Tokens (JWT).
- **multer** : Gère les fichiers téléchargés dans les applications Node.js.
- **bcrypt** : Bibliothèque de hachage de mot de passe sécurisée.
- **dotenv** : Charge les variables d'environnement à partir d'un fichier .env.


## Installation
1. Ouvrir votre terminal et accéder au dossier **server**
```
cd your_path/server
```

2. Installer les dépendances
```
npm i
```

3. Créer un fichier **.env** dans le dossier **server**
- Déclarer des variables d'environnement qui stockent les informations sensibles
```
MONGO_URI = lien vers votre base de donnée
PORT = définissez votre port d'écoute (par défaut à 9000)
BASE_URL = url de votre serveur
CLIENT_URL = url de votre front
JWT_SECRET = définissez un secret pour le JSONWEBTOKEN
JWT_EXPIRATION = définissez la durée de vie des tokens
```

4. Démarrer le serveur avec **nodemon**
```
npm start
```

## Routes API
- Chemin d'accès : /api

### Routes users
- Chemin d'accès : /users

| HTTP method | Endpoint | Action | Authorization |
| ----------- | -------- | ------ | ------------- |
|    GET      | /getall  | récupérer tout les utilisateurs | admin |
| GET | /getone/:id | récupérer un seul utilisateur | logged user |
| GET | /check | authentification, vérification de validité du token | logged user |
| POST | /register | création de compte d'un visiteur | tout le monde |
| POST | /login | connection sur compte utilisateur | tout le monde |
| PUT | /updatestatus/:id | modifier le role d'un utilisateur | admin |
| PUT | /resetpassword/:id | modifier mot de passe utilisateur | logged user |
| PUT | /updateprofil | modifier un utilisateur | logged user |
| DELETE | /deleteone/:id | supprimer un utilisateur | admin |


## Routes folders
- Chemin d'accès : /folders

| HTTP method | Endpoint | Action | Authorization |
| ----------- | -------- | ------ | ------------- |
| GET | /getall/:userId | récupérer tout les dossiers d'un utilisateur | logged user |
| GET | /getone/:folderId | récupérer un seul dossier | logged user |
| POST | /create/:userId | créer un dossier | logged user |
| PUT | /update/:id | modifier un dossier | logged user |
| DELETE | /delete/:id | supprimer un dossier | logged user |


## Routes flashcards
- Chemin d'accès : /flashcards

| HTTP method | Endpoint | Action | Authorization |
| ----------- | -------- | ------ | ------------- |
| GET | /getall/:folderId | récupérer toutes les flashcards d'un dossier | logged user |
| GET | /getone/:flashcardId | récupérer une seule flashcard | logged user |
| POST | /create/:folderId | créer une flashcard | logged user |
| PUT | /update/:id | modifier une flashcard | logged user |
| DELETE | /delete/:id | supprimer une flashcard | logged user |


## Routes results
- Chemin d'accès : /results

| HTTP method | Endpoint | Action | Authorization |
| ----------- | -------- | ------ | ------------- |
| GET | /getalluserresults/:userId | récupérer tout les résultats de révision d'un utilisateur | logged user |
| GET | /getoneresult/:resultId | récupérer un seul résultat de révision | logged user |
| GET | /getallfolderresults/:folderId | récupérer tout les résultats de révision d'un dossier | logged user |
| GET | /getrecentresults/:userId | récupérer les 5 derniers résultats de révision d'un utilisateur | logged user |
| POST | /create/:folderId | génerer un résultat | logged user |
| DELETE | /deleteallfolderresults/:folderId | supprimer tout les résultats d'un dossier | logged user |
| DELETE | /deleteallresults/:userId | supprimer tout les résultats | logged user |
| DELETE | /deleteoneresult/:resultId | supprimer un seul résultat de révision | logged user |


## Routes articles
- Chemin d'accès : /articles

| HTTP method | Endpoint | Action | Authorization |
| ----------- | -------- | ------ | ------------- |
| GET | /getallarticle | récupérer tout les articles | everyone |
| GET | /getonearticle/:id | récupérer un seul article | everyone |
| POST | /newarticle | créer un article | admin |
| PUT | /editarticle/:id | modifier un article | admin |
| DELETE | /deleteonearticle/:id | supprimer un article | admin |


## Routes contacts
- Chemin d'accès : /contacts

| HTTP method | Endpoint | Action | Authorization |
| ----------- | -------- | ------ | ------------- |
| GET | /getall | récupérer tout les contacts | admin |
| GET | /getone/:id | récupérer un seul contact | admin |
| POST | /new | créer un contact | everyone |
| PUT | /update/:id | modifier le status d'un contact | admin |
| DELETE | /delete/:id | supprimer un contact | admin |


## Routes tutorials

## Routes newsletters

## Routes articlescomments

## Routes folderscomments