// server.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let users = []; // memória simples

app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { email, senha } = req.body;
  users.push({ email, senha });
  res.json({ msg: "Usuário cadastrado!" });
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const user = users.find(u => u.email === email && u.senha === senha);
  if (user) {
    res.json({ msg: "Login bem-sucedido!" });
  } else {
    res.status(400).json({ msg: "Credenciais inválidas" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    