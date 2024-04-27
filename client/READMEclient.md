# Client side

## Dépendances coté client
- **axios** : Pour les requêtes HTTP.
- **react-router-dom** : Pour la gestion des routes dans React.
- **lucide-react** : Pour accéder à une bibliothèque d'icon SVG.
- **react-toastify** : Pour afficher des notifications toast personnalisables à l'utilisateur.


## Installation
1. Ouvrir votre terminal et accéder au dossier **client**
```
cd your_path/client
```

2. Installer les dépendances
```
npm i
```

3. Créer un fichier **.env** dans le dossier **client**
- Déclarer une variable d'environnement qui stocke l'url de votre serveur
Pour accéder aux images stockés dans le serveur
```
VITE_API_URL = http://votreserveur
```

4. Executer l'application en mode développement (démarrer le serveur)
```
npm run dev
```