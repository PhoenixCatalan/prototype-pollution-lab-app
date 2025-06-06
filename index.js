const express = require('express');
const bodyParser = require('body-parser');
const deepExtend = require('deep-extend');

const app = express();
app.use(bodyParser.json());

let users = {
  "john": { name: "John Doe", isAdmin: false }
};

app.post('/update-profile', (req, res) => {
  const username = req.body.username;
  const update = req.body.data;

  if (!users[username]) {
    users[username] = {};
  }

  var a = {}; 

  console.log("Before", users[username].isAdmin); 

  // 💥 Vulnérabilité ici
  deepExtend(users[username], update);
  console.log("After", users[username].isAdmin); 

  res.json({ message: "Profil mis à jour.", user: users[username] });
});

app.get('/check-admin', (req, res) => {
  const isAdmin = {}.isAdmin;
  res.send(`Admin status: ${isAdmin ? '✅' : '❌'}`);
});

app.listen(3000, () => {
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});
