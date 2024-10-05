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
  password: 'maffmaff',
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

// Route d'enregistrement (users)
app.post('/users', async (req, res) => {
  const {  nom, prenom, sexe, phoneNumberU, mail, localisation, password } = req.body;
  const id = uuidv4();
  const saltRounds = 9;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const avatar = req.body.avatar || null;
  const dateCreate = new Date();
  const dateUpdate = new Date();
  const isdelete = false;
 

  const query = 'INSERT INTO users (id, nom, prenom, phoneNumberU, mail, password, sexe, localisation, avatar, dateCreate, dateUpdate, isdelete) VALUES ($1, $2, $3,$4, $5, $6,$7, $8, $9, $10, $11,$12) RETURNING id';
  const values = [id, nom, prenom, phoneNumberU, mail, hashedPassword, sexe, localisation,  avatar, dateCreate, dateUpdate, isdelete];
  try {
    const dbConnection = getDbConnection();
    const { rows } = await dbConnection.query(query, values);
    const createdUserId = rows[0].id;

    res.status(201).json({ message: 'Inscription réussie!', createdUserId });
  } catch (error) {
    console.error(error);
    handleError(error, res);
  }

});

// Route de connexion (login)
app.post('/login', async (req, res) => {
  const { mail, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE mail = $1';
    const { rows } = await pool.query(query, [mail]);

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

// Route pour ajouter un employé
app.post('/addEmploye', async (req, res) => {
  const { id_admin, username, surname, date_naissance, lieu_naissance, sexe, contact, email, localisation, type_u, password, create_by } = req.body;
  const id = uuidv4();
  const saltRounds = 13;
  const create_at = new Date();
  const update_at = new Date();
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const query = 'INSERT INTO employe (id, id_admin, nom, prénom, date_naissance, lieu_naissance, sexe, téléphone, email, localisation, type_utilisateur, password, create_at, update_at, create_by) VALUES ($1, $2, $3,$4, $5, $6,$7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id';
  const values = [id, id_admin, username, surname, date_naissance, lieu_naissance, sexe, contact, email, localisation, type_u, hashedPassword, create_at, update_at, create_by];
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
    res.status(201).json({ message: 'Client ajouté avec succès' });
  } catch (error) {
    handleError(error, res);
  }
});
// Route pour ajouter une commande
app.post('/addCommand', async (req, res) => {
  const { id_client, montant, montant_verse, montant_restant, nom_modele, date, statut, type_tissu, create_by } = req.body;
  const id = uuidv4();
  //const saltRound = 11;
  const create_at = new Date();
  const update_at = new Date();
 // const hashedPassword = await bcrypt.hash(mot_de_passe, saltRounds);
  
  const query = 'INSERT INTO commande (id, id_client, montant, montant_verse, montant_restant, nom_modele, date, statut, type_tissu, create_at, update_at, create_by) VALUES ($1, $2, $3,$4, $5, $6,$7, $8, $9, $10, $11, $12) RETURNING id';
  const values = [id, id_client,montant, montant_verse, montant_restant, nom_modele, date, statut, type_tissu, create_at, update_at, create_by];
  try {
    const dbConnection = getDbConnection();
    const { rows } = await dbConnection.query(query, values);
    const createdUserId = rows[0].id;

    res.status(201).json({ message: 'Commande ajoutée avec succès' });
  } catch (error) {
    handleError(error, res);
  }
});

//Route pour récuperer informations d'un employé 
app.get('/user', async (req, res) => {
  try {
      const query = 'SELECT id, id_admin, nom, prénom, date_naissance, lieu_naissance, sexe, téléphone, email, localisation, type_utilisateur, password, create_at, update_at, create_by FROM employe';
      const result = await pool.query(query);
      const type_fs = result.rows;
      res.status(200).json(type_fs);
  } catch (error) {
      console.error('Erreur lors de la récupération des type  :', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
});

// Modifier un employé
app.put('/users/:email', async (req, res) => {
  const { email } = req.params;
  const { nom, prénom, date_naissance, lieu_naissance, sexe, téléphone, localisation, type_utilisateur } = req.body;

  try {
      const result = await pool.query(
          'UPDATE employe SET nom = $1, prénom = $2, date_naissance = $3, lieu_naissance = $4,  sexe = $5, téléphone = $6, localisation = $7, type_utilisateur = $8 WHERE email = $9 RETURNING *',
          [nom, prénom, date_naissance, lieu_naissance, sexe, téléphone, localisation, type_utilisateur, email]
      );

      if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Employé(e) non trouvé' });
      }

      res.json(result.rows[0]);
  } catch (error) {
      console.error('Erreur lors de la modification de l\'employé(e):', error);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Supprimer un employé
app.delete('/users/:email', async (req, res) => {
  const { email } = req.params;

  try {
      const result = await pool.query('DELETE FROM employe WHERE email = $1', [email]);
      if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Employé(e) non trouvé' });
      }

      res.status(204).send(); // Pas de contenu
  } catch (error) {
      console.error('Erreur lors de la suppression de l\'employé(e):', error);
      res.status(500).json({ error: 'Erreur serveur' });
  }
});


//Route pour ajouter les mesures
app.post('/saveMeasurements', async (req, res) => {
  const { id_client, measurements, create_by } = req.body;
  const id = uuidv4();
  // Vérifiez que id_client et les mesures sont envoyés
  if (!id_client || !measurements || !Array.isArray(measurements)) {
      return res.status(400).json({ message: 'Données manquantes.' });
  }
  const create_at = new Date();
  const update_at = new Date();
  
    const query = `INSERT INTO mesure (id, id_client, epaule, dos, poitrine, hauteur_sein, tour_sein, carrure_dos, carrure_avant, ventre, taille, l_taille, l_totale, bassin, l_manche, l_poignet, col, nbre_poche, fesses, cuisse, longueur, fond, braquette, pied,
          create_at, update_at, create_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)RETURNING id`;
    
  try {
      const dbConnection = getDbConnection();

      // Créez un tableau des valeurs à insérer
      const valuesToInsert = [
          id,
          id_client,
          measurements[0]?.value || null, // Epaule
          measurements[1]?.value || null, // Dos
          measurements[2]?.value || null, // Poitrine
          measurements[3]?.value || null, // Hauteur sein
          measurements[4]?.value || null, // Tour sein
          measurements[5]?.value || null, // Carrure dos
          measurements[6]?.value || null, // Carrure avant
          measurements[7]?.value || null, // Ventre
          measurements[8]?.value || null, // Taille
          measurements[9]?.value || null, // L.taille
          measurements[10]?.value || null, // L.totale
          measurements[11]?.value || null, // Bassin
          measurements[12]?.value || null, // L.manche
          measurements[13]?.value || null, // L.poignet
          measurements[14]?.value || null, // Col
          measurements[15]?.value || null, // Nombre de poche
          measurements[16]?.value || null, // Fesses
          measurements[17]?.value || null, // Cuisse
          measurements[18]?.value || null, // Longueur
          measurements[19]?.value || null, // Fond
          measurements[20]?.value || null, // Braquette
          measurements[21]?.value || null, // Pied
          create_at,
          update_at,
          create_by
      ];

      await dbConnection.query(query, valuesToInsert);
      res.status(201).json({ message: 'Mesures enregistrées avec succès' });
  } catch (error) {
      handleError(error, res);
  }
});




// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
// Route protégée
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Route protégée accessible avec succès', user: req.user });
});

