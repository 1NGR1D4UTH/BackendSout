const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./authMiddleware')
const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');
require('dotenv').config(); // Chargement des variables d'environnement
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


// Connexion à la base de données
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '771817',
  database: 'ingride',
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
// Route de commentaire (comment)
app.post('/comment', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const id = uuidv4();
  const created_at = new Date();

  try {
    const query = 'INSERT INTO comments (id, content, user_id, created_at) VALUES ($1, $2, $3, $4)'

    const values = [id, content, userId, created_at];

    const dbConnection = getDbConnection();
    await dbConnection.query(query, values);

    res.status(201).json({ message: 'Commentaire créé avec succès', id, content });
  } catch (error) {
    handleError(error, res);
  }
});

// Route pour ajouter un employé
// Dans votre endpoint /addEmploye
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
// Route protégée
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Route protégée accessible avec succès', user: req.user });
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});