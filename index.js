const express = require('express');

//initialisation de app
const app = express();

// Démarrage du serveur
const port = process.env.PORT || 3000;


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authMiddleware')
const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');
require('dotenv').config(); // Chargement des variables d'environnement

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});



// Connexion à la base de données
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '2609',
  database: 'MonProjet',
  port: 5432
});

// Fonction pour obtenir la connexion à la base de données
const getDbConnection = () => pool;

// Middleware pour gérer les erreurs
const handleError = (error, res) => {
  console.error('Erreur :', error);
  res.status(500).json({ message: 'Erreur interne du serveur' });
};

// Route d'enregistrement (signup)
app.post('/signup', async (req, res) => {
  const { username, surname, date_naissance, sexe, contact, email, localisation, type_u, password } = req.body;
  const id = uuidv4();
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = 'INSERT INTO utilisateur (id,nom,prénom,date_naissance,sexe,téléphone,email,localisation,type_utilisateur,password, create_at, update_at) VALUES ($1, $2, $3,$4, $5, $6,$7, $8, $9, $10) RETURNING id';
  const values = [id, username, surname, date_naissance, sexe, contact, email, localisation, type_u, hashedPassword, create_at, update_at];
  try {
    const dbConnection = getDbConnection();
    const { rows } = await dbConnection.query(query, values);
    const createdUserId = rows[0].id;

    res.status(201).json({ message: 'Utilisateur créé avec succès', createdUserId });
  } catch (error) {
    handleError(error, res);
  }

});

// Route de connexion (login)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM utilisateur WHERE email = $1';
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 1) {
      const user = rows[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ userId: user.id }, '77181753');
        const userId = user.id;

        // Stockage de l'ID de l'utilisateur dans le localStorage
        res.json({ token, userId });
        console.log(user.id);
      } else {
        res.status(401).json({ message: 'Mot de passe incorrect' });
      }
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    handleError(error, res);
  }
});

// Route protégée
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Route protégée accessible avec succès', user: req.user });
});

// Route pour ajouter un employé
app.post('/addEmploye', async (req, res) => {
  const { id_admin, username, surname, date_naissance, sexe, contact, email, localisation, type_u, password, create_by } = req.body;
  const id = uuidv4();
  const saltRounds = 13;
  const create_at = new Date();
  const update_at = new Date();
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = 'INSERT INTO employe (id, id_admin, nom, prénom, date_naissance, sexe, téléphone, email, localisation, type_utilisateur, password, create_at, update_at, create_by) VALUES ($1, $2, $3,$4, $5, $6,$7, $8, $9, $10, $11, $12, $13, $14) RETURNING id';
  const values = [id, id_admin, username, surname, date_naissance,sexe, contact, email, localisation, type_u, hashedPassword, create_at, update_at, create_by];
  try {
    const dbConnection = getDbConnection();
    const { rows } = await dbConnection.query(query, values);
    const createdUserId = rows[0].id;

    res.status(201).json({ message: 'Employé ajouté avec succès' });
  } catch (error) {
    handleError(error, res);
  }
});

app.post('/addClient', async (req, res) => {
  const { nom, prenom, date_naissance, lieu_naissance, telephone, email, sexe, localisation, mot_de_passe, create_by } = req.body;
  const id = uuidv4();
  const saltRounds = 11;
  const create_at = new Date();
  const update_at = new Date();
  const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);
  
  // Vérification du format de date
  if (!/^(\d{4})-(\d{2})-(\d{2})$/.test(date_naissance)) {
    return res.status(400).json({ message: 'Format de date invalide pour date_naissance' });
  }

  const dateNaissance = new Date(date_naissance);
  if (isNaN(dateNaissance.getTime())) {
    return res.status(400).json({ message: 'Date de naissance invalide' });
  }

  const query = 'INSERT INTO client (id, nom, prenom, date_naissance, lieu_naissance, telephone, email, sexe, localisation, mot_de_passe, create_at, update_at, create_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id';
  const values = [id, nom, prenom, dateNaissance, lieu_naissance, telephone, email, sexe, localisation, hashedPassword, create_at, update_at, create_by];

  try {
    const dbConnection = getDbConnection();
    const { rows } = await dbConnection.query(query, values);
    res.status(201).json({ message: 'Employé ajouté avec succès' });
  } catch (error) {
    handleError(error, res);
  }
});
// Route pour ajouter une commande
app.post('/addCommand', async (req, res) => {
  const { id_client, montant, montant_versé, montant_restant, i_modèle, nom_modèle, date, statut, type_tissu, create_by } = req.body;
  const id = uuidv4();
  const saltRounds = 11;
  const create_at = new Date();
  const update_at = new Date();
  
  const query = 'INSERT INTO commande (id, id_client, montant, montant_versé, montant_restant, i_modèle, nom_modèle, date, statut, type_tissu, create_at, create_by, update_at) VALUES ($1, $2, $3,$4, $5, $6,$7, $8, $9, $10, $11, $12, $13) RETURNING id';
  const values = [id, id_client,montant, montant_versé, montant_restant, i_modèle, nom_modèle, date, statut, type_tissu, create_at, create_by, update_at];
  try {
    const dbConnection = getDbConnection();
    const { rows } = await dbConnection.query(query, values);
    const createdUserId = rows[0].id;

    res.status(201).json({ message: 'Commande ajouté avec succès' });
  } catch (error) {
    handleError(error, res);
  }
});

//Route pour récuperer informations d'un employé 
app.get('/user', async (req, res) => {
  try {
      const query = 'SELECT id, id_admin, nom, prénom, date_naissance, sexe, téléphone, email, localisation, type_utilisateur, password, create_at, update_at, create_by FROM employe';
      const result = await pool.query(query);
      const type_fs = result.rows;
      res.status(200).json(type_fs);
  } catch (error) {
      console.error('Erreur lors de la récupération des type  :', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
})
