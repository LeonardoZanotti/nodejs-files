const express = require('express');
const routes = express.Router();
const DB = require('./teams');

routes.get('/teams', (req, res) => {
  return res.json(DB.teams);
});

routes.get('/teams/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.sendStatus(400);
  else {
    const id = parseInt(req.params.id);
    const character = DB.teams.find((c) => c.id == id);
    if (character != undefined) {
      return res.json(character);
    } else {
      return res.status(404).json({ msg: 'Personagem não encontrado.' });
    }
  }
});

routes.post('/newCharacter', (req, res) => {
  //const name = req.body.name;
  const { name, species, house, ancestry, wand, hogwartsStudent, hogwartsStaff } = req.body;
  if (name && species && house != undefined) {
    const id = DB.teams.length + 1; // pode usar uuid para criar numeros aleatorios, pequeno bug de id
    DB.teams.push({
      id,
      name,
      species,
      house,
      ancestry,
      wand,
      hogwartsStudent,
      hogwartsStaff,
    });
    return res.json({ msg: 'Personagem criado com sucesso.' });
  } else {
    return res.status(400).json({ msg: 'Dados obrigatórios não informados' });
  }
});

routes.delete('/teams/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.sendStatus(400);
  else {
    const id = parseInt(req.params.id);
    const index = DB.teams.findIndex((c) => c.id == id);
    if (index != -1) {
      character = DB.teams.splice(index, 1); //a partir da posição index tira 1
      return res.json({ msg: 'Personagem excluído com sucesso.', character });
    } else {
      return res.status(404).json({ msg: 'Personagem não encontrado.' });
    }
  }
});

routes.put('/character/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.sendStatus(400);
  else {
    const id = parseInt(req.params.id);
    const character = DB.teams.find((c) => c.id == id);
    if (character != undefined) {
      const { name, species, house, ancestry, wand, hogwartsStudent, hogwartsStaff } = req.body;
      if (name != undefined) character.name = name;
      if (species != undefined) character.species = species;
      if (house != undefined) character.house = house;
      if (ancestry != undefined) character.ancestry = ancestry;
      if (wand != undefined) character.wand = wand;
      if (hogwartsStudent != undefined) character.hogwartsStudent = hogwartsStudent;
      if (hogwartsStaff != undefined) character.hogwartsStaff = hogwartsStaff;
      return res.json(character);
    } else {
      return res.status(404).json({ msg: 'Personagem não encontrado' });
    }
  }
});

module.exports = routes;
